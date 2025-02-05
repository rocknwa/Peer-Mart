import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useConnectedStore = create()(
    persist(
      (set, get) => ({
        connected: false,
        setConnected: () => set({ connected: true }),
        setDisconnected: () => set({ connected: false }),
      }),
      {
        name: 'connected-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      },
    ),
  )
  