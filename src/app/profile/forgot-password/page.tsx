"use client";
import { useState } from "react";
import { forgotPasswordSchema } from "@/schema/profile.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { forgotPassword } from "@/services/userService";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: async (vals) => {
      await forgotPassword(vals);
      setSent(true);
    },
  });

  return (
    <div className="min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-x1 shadow-lg">
        {sent ? (
          <p>Cek email Anda untuk link reset password.</p>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <h2 className="text-2x1 font-semibold text-center">
              Lupa Password
            </h2>
            <div>
              <label>Email</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg"
            >
              Kirim Link Reset
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
