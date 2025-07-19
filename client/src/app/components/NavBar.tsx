"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rootstate } from "../../../redux/store";

import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const mode = "dark";
const NavBar = ({
  setIsSideBarOpen,
  isSideBarOpen,
}: {
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSideBarOpen: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center px-5 py-2 bg-background border-b">
      {/* Left side: Menu + Search */}
      <div className="flex items-center bg-muted rounded-md px-2 py-1 gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        <Input
          type="text"
          placeholder="Search..."
          className="w-48 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Right side: Settings + Mode Switch */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          {mode === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
