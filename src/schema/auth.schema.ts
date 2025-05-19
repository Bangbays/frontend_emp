import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Nama depan wajib diisi"),
    lastName: z.string().min(1, "Nama belakang wajib diisi"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Konfirmasi password wajib diisi"),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi tidak sama",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Formati email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const forgotSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password minimal 6 karakter"),
    confirmNewPassword: z.string().min(6, "Konfirmasi password wajib diisi"),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    message: "Password tidak cocok",
    path: ["confirmNewPassword"],
  });
