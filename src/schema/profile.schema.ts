import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "Nama depan wajib diisi"),
  lastName: z.string().min(1, "Nama belakang wajib diisi"),
  bio: z.string().max(255, "Maksimal 255 karakter").optional(),
  avatar: z
    .any()
    .refine(
      (file) =>
        !file || (file.type === "image/jpeg" && file.size <= 5 * 1024 * 1024)
    )
    .optional(),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Password lama wajib diisi"),
    newPassword: z.string().min(6, "Password baru minimal 6 karakter"),
    confirmNewPassword: z.string().min(6, "Konfirmasi password wajib diisi"),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    message: "Password baru tidak cocok",
    path: ["confirmNewPassword"],
  });
