package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.request.EmailReq;
import com.nocountry.rentify.exception.EmailSendException;
import com.nocountry.rentify.exception.UserNotVerifiedException;
import com.nocountry.rentify.model.entity.UserProfile;
import com.nocountry.rentify.model.enums.TokenPurpose;
import com.nocountry.rentify.security.jwt.JwtTokenProvider;
import com.nocountry.rentify.service.interfaces.EmailService;
import com.nocountry.rentify.service.interfaces.UserProfileService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private static final String RESEND_EMAILS_URL = "https://api.resend.com/emails";

    private final SpringTemplateEngine templateEngine;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserProfileService userProfileService;
    private final RestClient.Builder restClientBuilder;

    @Value("${resend.apiKey}")
    private String resendApiKey;

    @Value("${resend.email}")
    private String resendEmail;

    @Value("${resend.name}")
    private String resendName;

    @Value("${frontend.baseUrl}")
    private String baseUrl;

    @Value("${frontend.verifyEmailUrl}")
    private String verifyEmailUrl;

    @Override
    public void sendEmail(String to, String subject, Map<String, Object> templateModel, String templateName) {
        try {
            Context context = new Context();
            context.setVariables(templateModel);

            String htmlBody = templateEngine.process(templateName, context);

            Map<String, Object> requestBody = Map.of(
                    "from", resendName + " <" + resendEmail + ">",
                    "to", List.of(to),
                    "subject", subject,
                    "html", htmlBody
            );

            restClientBuilder.build()
                    .post()
                    .uri(RESEND_EMAILS_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .headers(headers -> headers.setBearerAuth(resendApiKey))
                    .body(requestBody)
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientException e) {
            throw new EmailSendException("Error sending email with Resend", e);
        }
    }

    @Override
    public void sendVerificationEmail(EmailReq request) {
        UserProfile profile = userProfileService.getByUserEmail(request.email());
        if (profile.getUser().isVerify()) {
            throw new UserNotVerifiedException("The user with email " + request.email() + " already has their account verified");
        }

        String token = jwtTokenProvider.generateTokenForPurpose(profile.getUser(), TokenPurpose.VERIFY_EMAIL);

        Map<String, Object> templateModel = new HashMap<>();
        templateModel.put("name", profile.getName());
        templateModel.put("verifyEmailUrl", baseUrl + verifyEmailUrl + "?token=" + token);

        sendEmail(profile.getUser().getEmail(),
                "Welcome! Confirm Your Email to Get Started",
                templateModel,
                "email-confirmation");

    }

}
