"use client";

import React, { ReactNode, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import AuthLoader from "@/components/loaders/auth-loader/AuthLoader";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

const Provider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const handleUser = async () => {
      await axios.post("/api/user", { user });
    };

    if (user) {
      handleUser();
    }
  }, [user]);

  return !isLoaded ? (
    <AuthLoader />
  ) : (
    <>
      <NextTopLoader showSpinner={false} />
      <div>{children}</div>
      <Toaster />
    </>
  );
};

export default Provider;
