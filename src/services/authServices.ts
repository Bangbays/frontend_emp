import axios from "axios";
import { IRegister, ILogin } from "@/types/auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:9000",
});

export function register(data: IRegister) {
  return api.post("/auth/register", data);
}

export function login(data: ILogin) {
  return api.post("/auth/login", data);
}

export function forgotPassword(email: string) {
  return api.post("/auth/forgot-password", { email });
}

export function resetPassword(token: string, newPassword: string) {
  return api.post(`/auth/reset-password/${token}`, { newPassword });
}
