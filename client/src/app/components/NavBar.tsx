"use client";

import React from "react";
import { Loader, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../../../utils/mode-toggle";
import { useLogoutMutation } from "../../../redux/API/api";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const NavBar = ({}: {}) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      // Remove cookie client-side
      document.cookie =
        "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Optionally redirect or show a success message
      window.location.href = "/auth/login";
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
          <AlertDialog>
            <AlertDialogTrigger asChild className="w-full">
              <Button variant={"ghost"}>Sign out</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to sign out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to sign in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout} asChild>
                  <Button className="" variant={"destructive"}>
                    <LogOut />
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
