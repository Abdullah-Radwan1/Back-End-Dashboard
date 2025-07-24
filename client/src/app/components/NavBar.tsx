"use client";

import React from "react";
import { Loader, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../../../utils/mode-toggle";
import { useLogoutMutation } from "../../../redux/API/api";
import { redirect, useRouter } from "next/navigation";

const NavBar = ({}: {}) => {
  const [logout, { isLoading, isError }] = useLogoutMutation();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      // Remove cookie client-side
      document.cookie =
        "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Optionally redirect or show a success message
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-between items-center px-5 py-2 bg-background border-b">
      {/* Left side: Menu + Search */}
      <SidebarTrigger />

      {/* Right side: Settings + Mode Switch */}
      <div className="flex items-center gap-2">
        {isLoading ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={20} />
          </Button>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
