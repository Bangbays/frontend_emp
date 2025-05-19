"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useProfile } from "@/hooks/useProfile";
import { setProfile } from "@/store/profilSlice";
import { fetchProfile } from "@/services/profileService";
import { applyOrganizer } from "@/services/organizerService";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { profileSchema } from "@/schema/profile.schema";
import { becomeOrganizerSchema } from "@/schema/organizer.schema";
import Image from "next/image";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { loading, saveProfile } = useProfile();
  const profile = useSelector((s: RootState) => s.profile.profile);

  const [editMode, setEditMode] = useState(false);
  const [showOrgForm, setShowOrgForm] = useState(false);

  useEffect(() => {
    fetchProfile().then((r) => dispatch(setProfile(r.data)));
  }, [dispatch]);

  const formikProfile = useFormik({
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
      const updated = await saveProfile(form);
      dispatch(setProfile(updated));
      setEditMode(false);
    },
  });

  const formikOrg = useFormik({
    enableReinitialize: true,
    initialValues: {
      organizationName: profile?.organizationName || "",
      organizationDesc: profile?.organizationDesc || "",
      organizationAddr: profile?.organizationAddr || "",
      organizationPhone: profile?.organizationPhone || "",
    },
    validationSchema: toFormikValidationSchema(becomeOrganizerSchema),
    onSubmit: async (vals) => {
      const res = await applyOrganizer(vals);
      dispatch(setProfile(res.data.user));
      setShowOrgForm(false);
    },
  });

  if (loading || !profile) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>

        {/* Become Organizer Button */}
        {profile.role === "CUSTOMER" && !showOrgForm && (
          <button
            onClick={() => setShowOrgForm(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-2xl shadow hover:bg-indigo-700"
          >
            Become Organizer
          </button>
        )}
        {profile.role === "PENDING_ORGANIZER" && (
          <button
            disabled
            className="px-6 py-2 bg-gray-400 text-white rounded-2xl"
          >
            Pending Approval
          </button>
        )}
        {profile.role === "ORGANIZER" && (
          <a
            href="/organizer/dashboard"
            className="px-6 py-2 bg-green-600 text-white rounded-2xl"
          >
            Go to Dashboard
          </a>
        )}
      </div>

      {/* FORM BECOME ORGANIZER */}
      {showOrgForm && profile.role === "CUSTOMER" && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Become Organizer</h2>
          <p className="text-gray-600 mb-6">
            Please fill out the form to become an event organizer.
          </p>
          <form onSubmit={formikOrg.handleSubmit} className="space-y-4">
            {/* Organization Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Organization Name *
              </label>
              <input
                {...formikOrg.getFieldProps("organizationName")}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                placeholder="ParaMos"
              />
              {formikOrg.touched.organizationName &&
                formikOrg.errors.organizationName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formikOrg.errors.organizationName}
                  </p>
                )}
            </div>
            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Short Description
              </label>
              <textarea
                {...formikOrg.getFieldProps("organizationDesc")}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                rows={3}
              />
              {formikOrg.touched.organizationDesc &&
                formikOrg.errors.organizationDesc && (
                  <p className="text-red-500 text-sm mt-1">
                    {formikOrg.errors.organizationDesc}
                  </p>
                )}
            </div>
            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                {...formikOrg.getFieldProps("organizationAddr")}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                placeholder="Jl. Contoh No.123"
              />
              {formikOrg.touched.organizationAddr &&
                formikOrg.errors.organizationAddr && (
                  <p className="text-red-500 text-sm mt-1">
                    {formikOrg.errors.organizationAddr}
                  </p>
                )}
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                {...formikOrg.getFieldProps("organizationPhone")}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                placeholder="+628123456789"
              />
              {formikOrg.touched.organizationPhone &&
                formikOrg.errors.organizationPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formikOrg.errors.organizationPhone}
                  </p>
                )}
            </div>
            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setShowOrgForm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CARD PROFIL & EDIT */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Edit Profil</h2>
        <form onSubmit={formikProfile.handleSubmit} className="space-y-4">
          {/* Avatar */}
          <div className="flex items-center space-x-4">
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
                  formikProfile.setFieldValue(
                    "avatar",
                    e.currentTarget.files?.[0] || null
                  )
                }
              />
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              disabled={!editMode}
              {...formikProfile.getFieldProps("firstName")}
              className="w-full border p-2 rounded disabled:bg-gray-100"
            />
            {formikProfile.touched.firstName &&
              formikProfile.errors.firstName && (
                <p className="text-red-500 text-sm">
                  {formikProfile.errors.firstName}
                </p>
              )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              disabled={!editMode}
              {...formikProfile.getFieldProps("lastName")}
              className="w-full border p-2 rounded disabled:bg-gray-100"
            />
            {formikProfile.touched.lastName &&
              formikProfile.errors.lastName && (
                <p className="text-red-500 text-sm">
                  {formikProfile.errors.lastName}
                </p>
              )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              disabled={!editMode}
              {...formikProfile.getFieldProps("bio")}
              className="w-full border p-2 rounded disabled:bg-gray-100"
              rows={3}
            />
          </div>

          <button
            type={editMode ? "submit" : "button"}
            onClick={() =>
              editMode ? formikProfile.handleSubmit() : setEditMode(true)
            }
            className="w-full py-2 bg-indigo-600 text-white rounded-lg"
          >
            {editMode ? "Simpan Perubahan" : "Edit Profil"}
          </button>
        </form>
      </div>
    </div>
  );
}
