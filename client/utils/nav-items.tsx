import {
  Home,
  ShoppingBag,
  Receipt,
  LineChart,
  Calendar,
  PieChart,
  Users,
} from "lucide-react";

export const navItems = [
  {
    type: "item",
    text: "Dashboard",
    icon: <Home size={18} />,
    path: "/main/dashboard",
  },
  {
    type: "section",
    text: "Client Facing",
  },
  {
    type: "item",
    text: "Products",
    icon: <ShoppingBag size={18} />,
    path: "/main/products",
  },
  {
    type: "item",
    text: "Transactions",
    icon: <Receipt size={18} />,
    path: "/main/transactions",
  },
  {
    type: "section",
    text: "Sales",
  },
  {
    type: "item",
    text: "Overview",
    icon: <LineChart size={18} />,
    path: "/main/overview",
  },
  {
    type: "item",
    text: "Monthly",
    icon: <Calendar size={18} />,
    path: "/main/monthly",
  },
  {
    type: "item",
    text: "Breakdown",
    icon: <PieChart size={18} />,
    path: "/main/breakdown",
  },
  {
    type: "section",
    text: "Management",
  },
  {
    type: "item",
    text: "Customers",
    icon: <Users size={18} />,
    path: "/main/customers",
  },
];
