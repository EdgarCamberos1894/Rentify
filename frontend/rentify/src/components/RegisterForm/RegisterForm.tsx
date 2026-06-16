import { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AlertContext } from "../../context";
import { authRegister, getRoles } from "../../service/auth/authService";
import InputSelect from "../FormInputs/InputSelect";
import InputText from "../FormInputs/InputText";

interface Role {
  id: number;
  name: string;
}

function RegisterForm() {
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, resetField } = useForm<FieldValues>({
    defaultValues: {
      roleId: "",
      username: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const roleId = useWatch({ control, name: "roleId" });

  const selectedRole = useMemo(
    () => roles.find((role) => role.id === Number(roleId)),
    [roleId, roles]
  );

  useEffect(() => {
    const loadRoles = async () => {
      const response = await getRoles();

      if (response?.isSuccess) {
        setRoles(response.data);
      } else {
        showAlert("error", response?.message || "No se pudieron cargar los roles");
      }
    };

    loadRoles();
  }, [showAlert]);

  useEffect(() => {
    if (selectedRole?.name === "USER") {
      resetField("username");
    }

    if (selectedRole?.name === "INMOBILIARIA") {
      resetField("name");
      resetField("lastname");
    }
  }, [resetField, selectedRole]);

  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);

    const payload = {
      email: data.email,
      password: data.password,
      roleId: Number(data.roleId),
      username: selectedRole?.name === "INMOBILIARIA" ? data.username : undefined,
      name: selectedRole?.name === "USER" ? data.name : undefined,
      lastname: selectedRole?.name === "USER" ? data.lastname : undefined,
    };

    const response = await authRegister(payload);
    setIsSubmitting(false);

    if (response?.isSuccess) {
      showAlert(
        "success",
        "Registro exitoso. Revisa tu correo para verificar tu cuenta."
      );
      navigate("/login");
    } else {
      showAlert("error", response?.message || "Ha ocurrido un error al registrarte");
    }
  };

  return (
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
        <Typography variant="h4" sx={{ marginBottom: { xs: 3, sm: 4 } }}>
          Registrarse
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <FormControl>
            <InputSelect
              name="roleId"
              label="Tipo de cuenta"
              control={control}
              options={roles.map((role) => ({
                label: role.name === "INMOBILIARIA" ? "Inmobiliaria" : "Usuario",
                value: role.id,
              }))}
              rules={{
                required: { value: true, message: "Este campo es requerido" },
              }}
            />
          </FormControl>

          {selectedRole?.name === "INMOBILIARIA" && (
            <FormControl>
              <InputText
                name="username"
                label="Nombre de la inmobiliaria"
                control={control}
              />
            </FormControl>
          )}

          {selectedRole?.name === "USER" && (
            <>
              <FormControl>
                <InputText name="name" label="Nombre" control={control} />
              </FormControl>
              <FormControl>
                <InputText name="lastname" label="Apellido" control={control} />
              </FormControl>
            </>
          )}

          <FormControl>
            <InputText
              name="email"
              type="email"
              label="Correo electronico"
              control={control}
            />
          </FormControl>
          <FormControl>
            <InputText
              name="password"
              type="password"
              label="Contrasena"
              control={control}
            />
          </FormControl>

          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Crear cuenta"}
          </Button>
          <Typography textAlign="center" variant="body2">
            Ya tienes una cuenta?{" "}
            <Link component={RouterLink} to="/login" sx={{ cursor: "pointer" }}>
              Inicia sesion
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterForm;
