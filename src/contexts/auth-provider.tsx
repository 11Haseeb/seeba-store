"use client";

import React, { ReactNode } from "react";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import AuthLoader from "@/components/loaders/auth-loader/AuthLoader";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: currentTheme === "dark" ? dark : undefined,
      }}
    >
      <ClerkLoading>
        <AuthLoader />
      </ClerkLoading>

      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
};

export default AuthProvider;
