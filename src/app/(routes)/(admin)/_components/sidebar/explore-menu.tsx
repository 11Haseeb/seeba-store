import { Home, ListCollapseIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const ExploreMenu = () => {
  const items = [
    {
      title: "Home",
      icon: Home,
    },
    {
      title: "Products",
      icon: ListCollapseIcon,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Explore</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, icon: Icon }) => {
            return (
              <SidebarMenuItem key={title.toLowerCase().replace(" ", "-")}>
                <SidebarMenuButton asChild>
                  <Link
                    href={
                      title === "Home"
                        ? "/"
                        : `/${title.toLowerCase().replace(" ", "-")}`
                    }
                  >
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

export default ExploreMenu;
