"use client";

import { Download, Mail, UserPlus, CreditCard, TrendingUp } from "lucide-react";
import { useGetDashboardQuery } from "../../../../redux/API/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardQuery(undefined);

  return (
    <div className="min-h-screen px-4 py-6 lg:px-10 bg-background text-foreground">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <Title title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button
          variant="outline"
          className="flex items-center gap-2 border-border text-blue hover:bg-muted"
        >
          <Download className="text-blue" />
          Download Reports
        </Button>
      </div>

      {/* Stat Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
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

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-6">
        <Card className="col-span-1 xl:col-span-8 bg-card text-card-foreground border border-border shadow">
          <OverviewChart view="sales" isDashboard />
        </Card>
        <Card className="col-span-1 xl:col-span-4 bg-card text-card-foreground border border-border shadow">
          <CardContent className="p-4">
            <BreakdownChart isDashboard />
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="bg-card text-card-foreground border border-border shadow">
        <CardContent className="p-4 overflow-x-auto">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Recent Transactions
          </h2>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 text-muted-foreground">
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
                    <TableCell className="font-medium">{tx._id}</TableCell>
                    <TableCell>{tx.userId}</TableCell>
                    <TableCell>
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{tx.products.length}</TableCell>
                    <TableCell className="text-right text-yellow">
                      ${tx.cost}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    {isLoading ? "Loading..." : "No transactions found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
