"use client";
import { useState } from "react";
import { forgotSchema } from "@/schema/auth.schema";
import { forgotPassword } from "@/services/authServices";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: toFormikValidationSchema(forgotSchema),
    onSubmit: async (vals) => {
      try {
        await forgotPassword(vals.email);
        setSent(true);
        toast.success("Link reset dikirim ke email");
      } catch {
        toast.error("Gagal mengirim email");
      }
    },
  });

  if (sent) return <p>Cek email Anda untuk link reset password.</p>;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded space-y-4"
    >
      <h1 className="text-x1 font-bold">Lupa Password</h1>
      <input
        type="email"
        placeholder="Email"
        {...formik.getFieldProps("email")}
        className="w-full border p-2 rounded"
      />
      {formik.touched.email && formik.errors.email && (
        <p className="text-red-500 text-sm">{formik.errors.email}</p>
      )}
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded"
      >
        Kirim Link Reset
      </button>
    </form>
  );
}
