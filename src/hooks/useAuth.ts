import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "@/store/authSlice";
import type { RootState } from "@/store";
import { useEffect } from "react";

export function useAuth() {
  const dispatch = useDispatch();
  const token = useSelector((s: RootState) => s.auth.token);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
      dispatch(loginSuccess(t));
    }
  }, [dispatch]);

  const saveToken = (t: string) => {
    localStorage.setItem("token", t);
    dispatch(loginSuccess(t));
  };
  const clearToken = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(logout());
  };
  return { token, saveToken, clearToken };
}
