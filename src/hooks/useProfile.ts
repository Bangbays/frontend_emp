import { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "@/services/profileService";
import { useDispatch } from "react-redux";
import { setProfile, updateProfilSuccess } from "@/store/profilSlice";

export function useProfile() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfile()
      .then((res) => {
        dispatch(setProfile(res.data));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const saveProfile = (form: FormData) => {
    return updateProfile(form).then((res) => {
      dispatch(updateProfilSuccess(res.data));
      return res.data;
    });
  };

  return { loading, saveProfile };
}
