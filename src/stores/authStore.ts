import { create } from "zustand";

interface AuthState {
  role: string | null;
  setRole: (role: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clearAuth: () => set({ role: null }),
}));
