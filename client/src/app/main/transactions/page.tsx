"use client";

import React, { useState } from "react";
import Title from "@/app/components/Title";
import { useGetTransactionsQuery } from "../../../../redux/API/api";
import { transColumns } from "../../../../utils/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Page = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const handleSort = (field: string) => {
    setSort((prev) => {
      if (prev.field === field) {
        return { field, sort: prev.sort === "asc" ? "desc" : "asc" };
      }
      return { field, sort: "asc" };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Title title="TRANSACTIONS" subtitle="Entire list of transactions" />

      <div className="flex items-center justify-between my-4">
        <Input
          placeholder="Search..."
          className="w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-2xl border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {transColumns.map((col) => (
                <TableHead
                  key={col.field}
                  className="cursor-pointer"
                  onClick={() => handleSort(col.field)}
                >
                  {col.headerName}
                  {sort.field === col.field &&
                    (sort.sort === "asc" ? " ↑" : " ↓")}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || !data ? (
              <TableRow>
                <TableCell colSpan={transColumns.length}>Loading...</TableCell>
              </TableRow>
            ) : data.transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={transColumns.length}>
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              data.transactions.map((row: any) => (
                <TableRow key={row._id}>
                  {transColumns.map((col) => (
                    <TableCell key={col.field}>{row[col.field]}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Prev
        </Button>
        <span className="text-sm">Page {page + 1}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data?.transactions?.length < pageSize}
        >
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Page;
