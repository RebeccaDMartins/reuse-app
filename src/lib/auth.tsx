// src/lib/auth.tsx
import React, { createContext, useContext } from "react";

export type AuthUser = { name: string; handle: string; email: string };

export type AuthContextValue = {
    user: AuthUser | null;
    login: (u: AuthUser) => Promise<void>;
    logout: () => Promise<void>;
    booted: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    login: async () => { },
    logout: async () => { },
    booted: false,
});

export function useAuth() {
    return useContext(AuthContext);
}

export const AUTH_USER_KEY = "auth-user";
