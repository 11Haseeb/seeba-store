"use client";

import React from "react";
import useAdmin from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardBtn = () => {
  const { currentUser } = useAdmin();

  return (
    currentUser?.isAdmin && (
      <Button asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    )
  );
};

export default DashboardBtn;
