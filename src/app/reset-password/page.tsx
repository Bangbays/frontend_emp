"use client";
import { useParams, useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/schema/auth.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { resetPassword } from "@/services/authServices";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const formik = useFormik({
    initialValues: { newPassword: "", confirmNewPassword: "" },
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    onSubmit: async (vals) => {
      try {
        if (typeof token !== "string") {
          toast.error("Token tidak valid");
          return;
        }
        await resetPassword(token, vals.newPassword);
        toast.success("Password berhasil direset");
        router.push("/login");
      } catch {
        toast.error("Token invalid atau sudah kadaluwarsa");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded space-y-4"
    >
      <h1 className="text-x1 font-bold">Reset Password</h1>
      {(
        ["newPassword", "confirmNewPassword"] as Array<
          keyof typeof formik.values
        >
      ).map((field) => (
        <div key={field}>
          <label className="block text-sm">{field}</label>
          <input
            type="password"
            {...formik.getFieldProps(field)}
            className="w-full border p-2 rounded"
          />
          {formik.touched[field] && formik.errors[field] && (
            <p className="text-red-500 text-sm">{formik.errors[field]}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded"
      >
        Reset Password
      </button>
    </form>
  );
}
