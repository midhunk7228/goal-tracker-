export interface User {
  id: string;
  email: string;
  // Add more user fields as needed
}

export interface AuthState {
  user: User | null;
  session: any | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  logout: () => void;
}
