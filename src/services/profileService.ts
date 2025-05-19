import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:9000",
});

export function fetchProfile() {
  return api.get("/profile");
}

export function updateProfile(form: FormData) {
  return api.put("/profile", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function changePassword(oldPassword: string, newPassword: string) {
  return api.post("/profile/change-password", { oldPassword, newPassword });
}
