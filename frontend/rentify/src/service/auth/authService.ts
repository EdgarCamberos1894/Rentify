import axios, { isAxiosError } from "axios";
import { getCookie } from "../cookies/cookiesService";

export const backend = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const authHeaders = () => {
  const userCookie = getCookie("user");
  const token = userCookie?.token || "";
  return { Authorization: `Bearer ${token}` };
};

export const authLogin = async (email: string, password: string) => {
  try {
    const response = await backend.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
  }
};

interface RegisterPayload {
  username?: string;
  name?: string;
  lastname?: string;
  email: string;
  password: string;
  roleId: number;
}

export const authRegister = async (payload: RegisterPayload) => {
  try {
    const response = await backend.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
  }
};

export const getRoles = async () => {
  try {
    const response = await backend.get("/role");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
  }
};

export const authLogout = async () => {
  try {
    const response = await backend.post(
      "/auth/logout",
      {},
      { headers: authHeaders() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
  }
};

export const authRecoveryPassword = async (email: string) => {
  try {
    const response = await backend.post("/auth/recovery-password", { email });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
  }
};

export const getUserAuth = async () => {
  try {
    const response = await backend.get(`/user-profile`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};
