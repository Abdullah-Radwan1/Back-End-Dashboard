"use client";

import { Mail, UserPlus, CreditCard, TrendingUp } from "lucide-react";
import { useGetDashboardQuery, useMeQuery } from "../../../../redux/API/api";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatBox from "@/app/components/StatBox";
import OverviewChart from "@/app/components/OverviewChart";
import BreakdownChart from "@/app/components/BreakdownChart";
import Title from "@/app/components/Title";
import Image from "next/image";

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardQuery(undefined);
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <Title title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </div>

      {/* Row 1: StatBoxes + BreakdownChart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Stat Boxes: nested grid 1→2→4 */}
        <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
          <StatBox
            title="Total Customers"
            value={data?.totalCustomers}
            increase="+14%"
            description="Since last month"
            icon={<Mail className="text-cyan" />}
          />
          <StatBox
            title="Sales Today"
            value={data?.todayStats.totalSales}
            increase="+21%"
            description="Since last month"
            icon={<UserPlus className="text-purple" />}
          />
          <StatBox
            title="Monthly Sales"
            value={data?.thisMonthStats.totalSales}
            increase="+5%"
            description="Since last month"
            icon={<CreditCard className="text-blue" />}
          />
          <StatBox
            title="Yearly Sales"
            value={data?.yearlySalesTotal}
            increase="+43%"
            description="Since last month"
            icon={<TrendingUp className="text-orange" />}
          />
        </div>

        {/* Breakdown Chart */}
        <Card className="bg-card text-card-foreground border border-border shadow">
          <BreakdownChart isDashboard />
        </Card>
      </div>

      {/* Row 2: OverviewChart + Transactions Table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Overview Chart - Natural height */}
        <div className="self-start">
          {" "}
          {/* This wrapper prevents height stretching */}
          <Card className="h-[600px] bg-card text-card-foreground border border-border shadow">
            <OverviewChart view="sales" isDashboard />
          </Card>
        </div>

        {/* Transactions Table - Fixed height with scroll */}
        <div className="flex flex-col">
          <Card className="bg-card text-card-foreground border border-border shadow flex-1">
            <CardContent className="p-4 h-full flex flex-col">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Recent Transactions
              </h2>
              <div className="flex-1 overflow-y-auto max-h-[500px]">
                <Table>
                  <TableHeader className="sticky top-0 bg-muted/50">
                    <TableRow className="text-muted-foreground">
                      <TableHead>ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!isLoading && data?.transactions?.length > 0 ? (
                      data.transactions.map((tx: any) => (
                        <TableRow key={tx._id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            {tx._id}
                          </TableCell>
                          <TableCell>{tx.userId}</TableCell>
                          <TableCell>
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{tx.products.length}</TableCell>
                          <TableCell className="text-right text-purple">
                            ${tx.cost}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          {isLoading ? (
                            <div className="flex justify-center items-center min-h-[70vh]">
                              <Image
                                alt="loader"
                                width={100}
                                height={100}
                                src={"/inf.svg"}
                              />
                            </div>
                          ) : (
                            "No transactions found."
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
