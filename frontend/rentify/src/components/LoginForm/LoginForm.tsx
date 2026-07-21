import { useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext, AlertContext } from "../../context";
import {
  authLogin,
  authResendVerificationEmail,
} from "../../service/auth/authService";
import ForgotPassword from "./ForgotPassword";
import InputText from "../FormInputs/InputText";

const demoCredentials = {
  email: "johndoe@example.com",
  password: "Demo123!",
};

function LoginForm() {
  const { userLogin } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [isResendingVerification, setIsResendingVerification] = useState(false);

  const { control, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data;
    const response = await authLogin(email, password);

    if (response?.isSuccess) {
      setUnverifiedEmail("");
      userLogin(response.data);
      showAlert("success", "Inicio de sesión exitoso");
      navigate("/");
    } else {
      const message = response?.message || "Ha ocurrido un error al iniciar sesion";
      const isUserNotVerified = message.toLowerCase().includes("not verified");

      setUnverifiedEmail(isUserNotVerified ? email : "");
      showAlert("error", message);
    }
  };

  const handleResendVerificationEmail = async () => {
    if (!unverifiedEmail) return;

    setIsResendingVerification(true);
    const response = await authResendVerificationEmail(unverifiedEmail);
    setIsResendingVerification(false);

    if (response?.isSuccess) {
      showAlert(
        "success",
        "Correo de verificacion reenviado. Revisa tu bandeja de entrada."
      );
    } else {
      showAlert(
        "error",
        response?.message || "No se pudo reenviar el correo de verificacion"
      );
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  return (
    <Container
      sx={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        paddingBottom: "8vh",
      }}
    >
      <Paper
        sx={{
          margin: "0 auto",
          padding: 4,
          borderRadius: 2,
          boxShadow: 10,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: { xs: 3, sm: 4 },
          }}
        >
          Iniciar Sesión
        </Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <FormControl>
            <InputText
              name="email"
              type="email"
              label="Correo electrónico"
              control={control}
            />
          </FormControl>
          <FormControl>
            <InputText
              name="password"
              type="password"
              label="Contraseña"
              control={control}
            />
          </FormControl>
          <Typography
            sx={{
              alignSelf: "end",
            }}
          >
            <Link onClick={handleDialogOpen} sx={{ cursor: "pointer" }}>
              ¿Olvidó su contraseña?
            </Link>
          </Typography>

          <Button variant="contained" type="submit">
            Iniciar Sesión
          </Button>
          {unverifiedEmail && (
            <Box
              sx={{
                border: 1,
                borderColor: "primary.light",
                borderRadius: 2,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Typography variant="body2">
                Tu cuenta todavia no esta verificada. Puedes reenviar el correo
                de verificacion a {unverifiedEmail}.
              </Typography>
              <Button
                variant="outlined"
                onClick={handleResendVerificationEmail}
                disabled={isResendingVerification}
              >
                {isResendingVerification
                  ? "Reenviando..."
                  : "Reenviar correo de verificacion"}
              </Button>
            </Box>
          )}
          <Typography
            textAlign={"center"}
            variant="body2"
          >
            ¿No tienes una cuenta?{" "}
            <Link
              sx={{ cursor: "pointer" }}
              component={RouterLink}
              to={"/register"}
            >
              Regístrate
            </Link>
          </Typography>
          <Box
            component="section"
            aria-labelledby="rentify-demo-title"
            sx={{
              borderTop: 1,
              borderColor: "divider",
              pt: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Typography id="rentify-demo-title" variant="subtitle2" fontWeight={700}>
              Acceso de demostración
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Propietario: {demoCredentials.email}
              <br />
              Contraseña: {demoCredentials.password}
            </Typography>
            <Button variant="outlined" type="button" onClick={() => reset(demoCredentials)}>
              Cargar credenciales de demostración
            </Button>
          </Box>
        </Box>
        <ForgotPassword open={openDialog} handleClose={handleDialogClose} />
      </Paper>
    </Container>
  );
}

export default LoginForm;
