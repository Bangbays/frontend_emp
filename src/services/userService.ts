import axios from "axios";
import {
  UserProfile,
  IChangePassword,
  IForgotPassword,
  IResetPassword,
} from "@/types/profile";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:9000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers!["Authorization"] = `Bearer ${token}`;
  return config;
});

export const fetchProfile = () => api.get<UserProfile>("/profile");
export const updateProfile = (form: FormData) =>
  api.put<UserProfile>("/profile", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const changePassword = (payload: IChangePassword) =>
  api.put("/profile/change-password", payload);
export const forgotPassword = (payload: IForgotPassword) =>
  api.post("/auth/forgot-password", payload);
export const resetPassword = (token: string, payload: IResetPassword) =>
  api.post(`/auth/reset-password/${token}`, payload);
