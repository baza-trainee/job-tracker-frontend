import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Хук для перевірки завершення реанімації Redux Persist
export const usePersistRehydrated = (): boolean => {
    const rehydrated = useSelector((state: RootState) => state._persist?.rehydrated);
    return rehydrated ?? false;
  };