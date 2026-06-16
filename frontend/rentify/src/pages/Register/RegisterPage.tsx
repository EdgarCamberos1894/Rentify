import { Box } from "@mui/material";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export function RegisterPage() {
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <RegisterForm />
    </Box>
  );
}

export default RegisterPage;
