import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { AlertContext } from "../../context";
import { authVerifyEmail } from "../../service/auth/authService";

export function VerifyEmailPage() {
  const { showAlert } = useContext(AlertContext);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verificando tu correo...");
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (hasVerified.current) return;
      hasVerified.current = true;

      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("El enlace de verificacion no incluye un token valido.");
        return;
      }

      const response = await authVerifyEmail(token);

      if (response?.isSuccess) {
        setStatus("success");
        setMessage("Tu correo fue verificado correctamente.");
        showAlert("success", "Correo verificado correctamente");
      } else {
        setStatus("error");
        setMessage(response?.message || "No se pudo verificar el correo.");
      }
    };

    verifyEmail();
  }, [searchParams, showAlert]);

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
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Verificacion de correo
          </Typography>
          <Typography color={status === "error" ? "error" : "text.primary"}>
            {message}
          </Typography>
          {status !== "loading" && (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{ marginTop: 3 }}
            >
              Ir a iniciar sesion
            </Button>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default VerifyEmailPage;
