"use client";

import {
  LayoutDashboard,
  Package,
  Receipt,
  Activity,
  CalendarDays,
  PieChart,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import clsx from "clsx";

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
import { useMeQuery } from "../../../redux/API/api";
export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;
  const { data: me, isLoading: userLoading } = useMeQuery(undefined);

  console.log(me);
  return (
    <Sidebar className="h-full border-r ">
      <SidebarContent className="bg-background text-foreground">
        {/* Group: Main */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-md">
            Welcome back,{"\u00A0"}
            <p className="text-purple"> {me?.username || "can you wait ?"}!</p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/main/dashboard")}
                  className={clsx(
                    "gap-3",
                    isActive("/main/dashboard") && "bg-muted text-primary"
                  )}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group: Client Facing */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Client Facing
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/main/products")}
                  className={clsx(
                    "gap-3",
                    isActive("/main/products") && "bg-muted text-primary"
                  )}
                >
                  <Package className="w-5 h-5" />
                  <span>Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/main/transactions")}
                  className={clsx(
                    "gap-3",
                    isActive("/main/transactions") && "bg-muted text-primary"
                  )}
                >
                  <Receipt className="w-5 h-5" />
                  <span>Transactions</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group: Sales */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Sales
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/main/overview")}
                  className={clsx(
                    "gap-3",
                    isActive("/main/overview") && "bg-muted text-primary"
                  )}
                >
                  <Activity className="w-5 h-5" />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/main/monthly")}
                  className={clsx(
                    "gap-3",
                    isActive("/main/monthly") && "bg-muted text-primary"
                  )}
                >
                  <CalendarDays className="w-5 h-5" />
                  <span>Monthly</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/main/breakdown")}
                  className={clsx(
                    "gap-3",
                    isActive("/main/breakdown") && "bg-muted text-primary"
                  )}
                >
                  <PieChart className="w-5 h-5" />
                  <span>Breakdown</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group: Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/main/customers")}
                  className={clsx(
                    "gap-3",
                    isActive("/main/customers") && "bg-muted text-primary"
                  )}
                >
                  <Users className="w-5 h-5" />
                  <span>Customers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
