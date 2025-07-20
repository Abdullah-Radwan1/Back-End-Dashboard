"use client";

import React from "react";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../../../utils/mode-toggle";
const NavBar = ({}: {}) => {
  return (
    <div className="flex justify-between items-center px-5 py-2 bg-background border-b">
      {/* Left side: Menu + Search */}
      <SidebarTrigger />

      {/* Right side: Settings + Mode Switch */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
