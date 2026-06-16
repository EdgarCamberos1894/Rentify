import { useContext, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import { AlertContext } from "../../context";
import { authResetPassword } from "../../service/auth/authService";
import InputText from "../../components/FormInputs/InputText";
import {
  passwordRequirementsText,
  passwordRules,
} from "../../utils/passwordValidation";

export function ResetPasswordPage() {
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const { control, getValues, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    if (!token) {
      showAlert("error", "El enlace de recuperacion no incluye un token valido");
      return;
    }

    setIsSubmitting(true);
    const response = await authResetPassword(token, data.password);
    setIsSubmitting(false);

    if (response?.isSuccess) {
      showAlert("success", "Contrasena actualizada correctamente");
      navigate("/login");
    } else {
      showAlert("error", response?.message || "No se pudo actualizar la contrasena");
    }
  };

  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Container
        sx={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          paddingY: { xs: 4, sm: 6 },
        }}
      >
        <Paper
          sx={{
            margin: "0 auto",
            padding: 4,
            borderRadius: 2,
            boxShadow: 10,
            width: "100%",
            maxWidth: "460px",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: { xs: 2, sm: 3 } }}>
            Restablecer contrasena
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {passwordRequirementsText}
          </Typography>

          {!token ? (
            <>
              <Typography color="error">
                El enlace de recuperacion no incluye un token valido.
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                sx={{ marginTop: 3 }}
              >
                Ir a iniciar sesion
              </Button>
            </>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <FormControl>
                <InputText
                  name="password"
                  type="password"
                  label="Nueva contrasena"
                  control={control}
                  rules={passwordRules}
                />
              </FormControl>
              <FormControl>
                <InputText
                  name="confirmPassword"
                  type="password"
                  label="Confirmar contrasena"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value === getValues("password") ||
                      "Las contrasenas no coinciden",
                  }}
                />
              </FormControl>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Actualizando..." : "Actualizar contrasena"}
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default ResetPasswordPage;
