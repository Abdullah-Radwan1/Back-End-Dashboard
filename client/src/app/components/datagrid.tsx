"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  ColumnsIcon,
  DownloadIcon,
  SlidersHorizontal,
} from "lucide-react";

const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
}: {
  searchInput: string;
  setSearchInput: (value: string) => void;
  setSearch: (value: string) => void;
}) => {
  return (
    <div className="w-full flex justify-between items-center p-2 border-b">
      <div className="flex items-center gap-2">
        {/* Replace these with real toolbar actions */}
        <Button variant="outline" size="sm">
          <ColumnsIcon className="h-4 w-4 mr-1" />
          Columns
        </Button>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="h-4 w-4 mr-1" />
          Density
        </Button>
        <Button variant="outline" size="sm">
          <DownloadIcon className="h-4 w-4 mr-1" />
          Export
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          className="w-60"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setSearch(searchInput);
            setSearchInput("");
          }}
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DataGridCustomToolbar;
