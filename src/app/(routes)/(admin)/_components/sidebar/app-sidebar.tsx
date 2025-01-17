import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Header from "./header";
import CreateNewBtn from "./create-new-btn";
import ExploreMenu from "./explore-menu";
import ManageMenu from "./manage-menu";

export function AppSidebar() {
  return (
    <Sidebar>
      <Header />
      <SidebarContent>
        <CreateNewBtn />
        <ManageMenu />
        <SidebarSeparator />
        <ExploreMenu />
      </SidebarContent>
    </Sidebar>
  );
}
