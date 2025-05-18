"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setProfile } from "@/store/profilSlice";
import { fetchProfile, updateProfile } from "@/services/userService";
import { updateProfileSchema } from "@/schema/profile.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import Image from "next/image";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((s: RootState) => s.profile.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile()
      .then((res) => dispatch(setProfile(res.data)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      bio: profile?.bio || "",
      avatar: null as File | null,
    },
    validationSchema: toFormikValidationSchema(updateProfileSchema),
    onSubmit: async (vals) => {
      const form = new FormData();
      form.append("name", `${vals.firstName} ${vals.lastName}`);
      form.append("bio", vals.bio || "");
      if (vals.avatar) form.append("avatar", vals.avatar);
      const res = await updateProfile(form);
      dispatch(setProfile(res.data));
      alert("Profil diperbarui");
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white rounded-x1 shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2x1 font-semibold text-center">Profil Saya</h2>

        <div className="flex space-x-4 items-center">
          <Image
            src={profile?.profilePictureUrl || "/default-avatar.jpg"}
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/jpeg"
            onChange={(e) =>
              formik.setFieldValue("avatar", e.currentTarget.files?.[0] || null)
            }
          />
          {formik.errors.avatar && (
            <p className="text-red-500 text-sm">{formik.errors.avatar}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Nama Depan</label>
          <input
            {...formik.getFieldProps("firstName")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Nama Belakang</label>
          <input
            {...formik.getFieldProps("lastName")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Bio</label>
          <textarea
            {...formik.getFieldProps("bio")}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
