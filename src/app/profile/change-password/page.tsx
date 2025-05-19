"use client";
import { toast } from "react-toastify";
import { changePasswordSchema } from "@/schema/profile.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { changePassword } from "@/services/profileService";

export default function ChangePasswordPage() {
  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
    validationSchema: toFormikValidationSchema(changePasswordSchema),
    onSubmit: async (vals) => {
      try {
        await changePassword(vals.oldPassword, vals.newPassword);
        toast.success("Password berhasil diganti");
      } catch {
        toast.error("Gagal ganti password");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-4 space-y-4 bg-white rounded"
    >
      <h1 className="text-x1 font-bold">Ganti Password</h1>
      {(["oldPassword", "newPassword", "confirmNewPassword"] as const).map(
        (field) => (
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
        )
      )}
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded"
      >
        Ganti Password
      </button>
    </form>
  );
}
