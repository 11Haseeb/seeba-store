"use client";

import { usePathname } from "next/navigation";
import { List, Package, Users } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const ManageMenu = () => {
  const pathname = usePathname();

  const items = [
    {
      title: "List Products",
      url: "listed-products",
      icon: List,
    },
    {
      title: "Sold Products",
      url: "purchased-products",
      icon: Package,
    },
    {
      title: "Customers",
      url: "customers",
      icon: Users,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Manage</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, url, icon: Icon }) => {
            const URL = `/dashboard/${url}`;

            return (
              <SidebarMenuItem key={title.toLowerCase().replace(" ", "-")}>
                <SidebarMenuButton isActive={pathname === URL} asChild>
                  <Link href={URL}>
                    <Icon />
                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ManageMenu;
