import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from ".";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
