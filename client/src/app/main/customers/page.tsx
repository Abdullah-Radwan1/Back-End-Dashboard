"use client";

import React from "react";
import { useGetCustomersQuery } from "../../../../redux/API/api";
import Title from "@/app/components/Title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const { data, isLoading } = useGetCustomersQuery(undefined);

  return (
    <div className="px-10 py-6">
      <Title title="ADMINS" subtitle="Managing admins and list of admins" />

      <div className="mt-10 max-h-[75vh] overflow-auto rounded-lg border shadow">
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Occupation</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer._id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {customer.phoneNumber.replace(
                      /^(\d{3})(\d{3})(\d{4})/,
                      "($1)$2-$3"
                    )}
                  </TableCell>
                  <TableCell>{customer.country}</TableCell>
                  <TableCell>{customer.occupation}</TableCell>
                  <TableCell>{customer.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Admin;
