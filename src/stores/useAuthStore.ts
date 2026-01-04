import { create } from "zustand";
import type { AuthState } from "@/features/auth/types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session }),
  logout: () => set({ user: null, session: null, isAuthenticated: false }),
}));
