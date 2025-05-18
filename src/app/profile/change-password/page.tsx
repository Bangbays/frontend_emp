"use client";
import { useState } from "react";
import { changePasswordSchema } from "@/schema/profile.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { changePassword } from "@/services/userService";

export default function ChangePasswordPage() {
  const [msg, setMsg] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "" },
    validationSchema: toFormikValidationSchema(changePasswordSchema),
    onSubmit: async (vals) => {
      try {
        await changePassword(vals);
        setMsg("Password berhasil diganti");
      } catch {
        setMsg("Gagal ganti password");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-x1 shadow-lg space-y-4"
      >
        <h2 className="text-2x1 font-semibold text-center">Ganti Password</h2>
        <div>
          <label>Password Lama</label>
          <input
            type="password"
            {...formik.getFieldProps("oldPassword")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <p className="text-red-500 text-sm">{formik.errors.oldPassword}</p>
          )}
        </div>
        <div>
          <label>Password Baru</label>
          <input
            type="password"
            {...formik.getFieldProps("newPassword")}
            className="w-full px-4 py-2 border rounedd-lg"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg"
        >
          Ganti Password
        </button>
        {msg && <p className="text-center mt-2">{msg}</p>}
      </form>
    </div>
  );
}
