"use client";

import { AppSidebar } from "../components/app-sidebar";
import NavBar from "../components/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full overflow-hidden ">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          <NavBar />
          <main className="p-4 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
