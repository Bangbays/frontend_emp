import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "Nama depan wajib diisi"),
  lastName: z.string().min(1, "Nama belakang wajib diisi"),
  bio: z.string().max(255, "Maksimal 255 karakter").optional(),
  avatar: z
    .any()
    .optional()
    .refine(
      (file: File) => !file || file.size <= 5 * 1024 * 1024,
      "Ukuran maksimal 5MB"
    )
    .refine((file: File) => !file || file.type === "image/jpg", "hanya JPG"),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Password lama wajib diisi"),
  newPassword: z.string().min(6, "Password baru minimal 6 karakter"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Formati email tidak valid"),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password minimal 6 karakter"),
});
