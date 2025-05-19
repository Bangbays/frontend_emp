"use client";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { profileSchema } from "@/schema/profile.schema";
import Image from "next/image";

export default function ProfilPage() {
  const { loading, saveProfile } = useProfile();
  const profile = useSelector((s: RootState) => s.profile.profile);
  const [editMode, setEditMode] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      bio: profile?.bio || "",
      avatar: null as File | null,
    },
    validationSchema: toFormikValidationSchema(profileSchema),
    onSubmit: async (vals) => {
      const form = new FormData();
      form.append("firstName", vals.firstName);
      form.append("lastName", vals.lastName);
      if (vals.bio) form.append("bio", vals.bio);
      if (vals.avatar) form.append("avatar", vals.avatar);
      await saveProfile(form);
      setEditMode(false);
    },
  });

  if (loading || !profile) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-x1 font-bold mb-4">Profil Saya</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <Image
            src={profile.profilePictureUrl || "/avatar-placeholder.png"}
            alt="Avatar"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          {editMode && (
            <input
              type="File"
              accept="image/jpg"
              onChange={(e) =>
                formik.setFieldValue(
                  "avatar",
                  e.currentTarget.files?.[0] || null
                )
              }
            />
          )}
        </div>

        <div>
          <label className="block text-sm">Nama Depan</label>
          <input
            disabled={!editMode}
            {...formik.getFieldProps("firstName")}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Nama Belakang</label>
          <input
            disabled={!editMode}
            {...formik.getFieldProps("lastName")}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Bio</label>
          <textarea
            disabled={!editMode}
            {...formik.getFieldProps("bio")}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
        </div>

        <button
          type={editMode ? "submit" : "button"}
          onClick={() => (editMode ? formik.handleSubmit() : setEditMode(true))}
          className="w-full py-2 bg-indigo-600 text-white rounded"
        >
          {editMode ? "Simpan Perubahan" : "Edit Profil"}
        </button>
      </form>
    </div>
  );
}
