import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:9000",
});

export function applyOrganizer(data: {
  organizationName: string;
  organizationDesc: string;
  organizationAddr: string;
  organizationPhone: string;
}) {
  return api.post("/organizer/become", data);
}
