"use client";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerSchema } from "@/schema/auth.schema";
import { register } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: async (vals) => {
      try {
        await register({
          firstName: vals.firstName,
          lastName: vals.lastName,
          email: vals.email,
          password: vals.password,
          confirmPassword: vals.confirmPassword,
          referralCode: vals.referralCode || undefined,
        });
        toast.success("Register berhasil!");
        router.push("/login");
      } catch {
        toast.error("Gagal register");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Registrasi</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.firstName}
              </p>
            )}
          </div>

          <div>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...formik.getFieldProps("lastName")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.lastName}
              </p>
            )}
          </div>

          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <div>
            <input
              id="referralCode"
              type="text"
              placeholder="Referral Code (opsional)"
              {...formik.getFieldProps("referralCode")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}
