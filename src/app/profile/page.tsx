"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setProfile } from "@/store/profilSlice";
import { fetchProfile, updateProfile } from "@/services/profileService";
import { profileSchema } from "@/schema/profile.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import Image from "next/image";
import { differenceInDays, parseISO } from "date-fns";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((s: RootState) => s.profile.profile);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

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
    validationSchema: toFormikValidationSchema(profileSchema),
    onSubmit: async (vals) => {
      const form = new FormData();
      form.append("name", `${vals.firstName} ${vals.lastName}`);
      form.append("bio", vals.bio);
      if (vals.avatar) form.append("avatar", vals.avatar);
      const res = await updateProfile(form);
      dispatch(setProfile(res.data));
      setEditMode(false);
      alert("Profil diperbarui");
    },
  });

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Tidak ada data profil</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profil Saya</h1>

      <div className="flex items-center mb-4 space-x-4">
        <Image
          src={profile.profilePictureUrl || "/avatar-placeholder.png"}
          width={64}
          height={64}
          alt="Avatar"
          className="rounded-full"
        />
        {editMode && (
          <input
            type="file"
            accept="image/jpeg"
            onChange={(e) =>
              formik.setFieldValue("avatar", e.currentTarget.files?.[0] || null)
            }
          />
        )}
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Nama Depan */}
        <div>
          <label className="block text-sm font-medium">Nama Depan</label>
          <input
            disabled={!editMode}
            {...formik.getFieldProps("firstName")}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Nama Belakang */}
        <div>
          <label className="block text-sm font-medium">Nama Belakang</label>
          <input
            disabled={!editMode}
            {...formik.getFieldProps("lastName")}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            disabled={!editMode}
            {...formik.getFieldProps("bio")}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Referral Code & Points */}
        <div className="mt-4">
          <p>
            <strong>Referral Code:</strong> {profile.referralCode}
          </p>
          <p>
            <strong>Poin Anda:</strong> {profile.points.toLocaleString()}
          </p>
        </div>

        {/* Daftar Voucher */}
        <div>
          <strong>Voucher Aktif:</strong>
          <ul className="list-disc ml-5">
            {profile.coupons.length > 0 ? (
              profile.coupons.map((c) => {
                const expires = parseISO(c.expiresAt);
                const daysLeft = differenceInDays(expires, new Date());
                return (
                  <li key={c.id}>
                    {c.code} – IDR {c.discount.toLocaleString()} (exp:{" "}
                    <span className="text-sm text-gray-500">
                      (sisa {daysLeft} hari)
                    </span>
                  </li>
                );
              })
            ) : (
              <li>Tidak ada voucher</li>
            )}
          </ul>
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
