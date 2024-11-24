import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TemporalUser } from "../types";

interface TemporalUserData {
  temporalUser: TemporalUser | null;
  setUserData: (userData: TemporalUser) => void;
  clearTemporalUser: () => void;
}

const useTemporalUser = create(
  persist<TemporalUserData>(
    (set, get) => ({
      temporalUser: get()?.temporalUser || null,
      setUserData: (data: TemporalUser) => {
        set({ temporalUser: data });
      },

      clearTemporalUser: () => set({ temporalUser: null }),
    }),
    {
      name: "temporal-user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useTemporalUser };
