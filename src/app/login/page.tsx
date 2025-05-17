"use client";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "@/schema/auth.schema";
import { login } from "@/services/authServices";
import { saveToken } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (vals) => {
      try {
        const res = await login(vals);
        dispatch(saveToken(res.data.token));
        toast.success("Login berhasil!");
        router.push("/");
      } catch {
        toast.error("Email atau password salah");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3x1 font-bold text-center mb-8">EventApp</h1>
        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder=""
              {...formik.getFieldProps("email")}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...formik.getFieldProps("password")}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}
