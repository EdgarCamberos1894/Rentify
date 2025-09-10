package com.nocountry.rentify.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig {

  @Value("${web.cors.allowed-origins}")
  private String corsAllowedOrigins;

  @Bean
  public WebMvcConfigurer corsCustomConfig(){

    String[] origins = Arrays.stream(corsAllowedOrigins.split(",")).map(String::trim).toArray(String[]::new);

    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(origins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
      }
    };
  }
}
