"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/schema/profile.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { resetPassword } from "@/services/userService";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const resetToken = token as string;
  const router = useRouter();
  const [done, setDone] = useState(false);

  const formik = useFormik({
    initialValues: { newPassword: "" },
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    onSubmit: async (vals) => {
      try {
        await resetPassword(resetToken, vals);
        setDone(true);
      } catch {
        alert("Reset gagal");
      }
    },
  });

  if (done) {
    router.push("/login");
    return <p>Reset berhasil, silahkan login...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-x1 shadow-lg space-y-4"
      >
        <h2 className="text-2x1 font-semibold text-center">Reset Password</h2>
        <div>
          <label>Password Baru</label>
          <input
            type="password"
            {...formik.getFieldProps("newPassword")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
