import { UserProfile } from "@/types/profile";
import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:9000",
});

export function fetchProfile() {
  return api.get<UserProfile>("/profile");
}
