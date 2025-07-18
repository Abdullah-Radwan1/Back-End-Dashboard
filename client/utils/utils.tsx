import {
  AdminPanelSettingsOutlined,
  CalendarViewMonthOutlined,
  PieChartOutlineOutlined,
  PointOfSaleOutlined,
  ReceiptLongOutlined,
  ShoppingBagOutlined,
  Groups3Outlined,
} from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlinedIcon />,
    path: "/main/dashboard",
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingBagOutlined />,
    path: "/main/products",
  },

  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
    path: "/main/transactions",
  },

  {
    text: "Sales",
    icon: null,
    path: "/main/sales",
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
    path: "/main/overview",
  },

  {
    text: "Monthly",
    icon: <CalendarViewMonthOutlined />,
    path: "/main/monthly",
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlineOutlined />,
    path: "/main/breakdown",
  },
  {
    text: "Management",
    icon: null,
    path: "/main/management",
  },
  {
    text: "Customers",
    icon: <Groups3Outlined />,
    path: "/main/customers",
  },
];

export const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params: any) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.4,
  },
  {
    field: "occupation",
    headerName: "Occupation",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
  },
];

export const transColumns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 1,
  },
  {
    field: "products",
    headerName: "# of Products",
    flex: 0.5,
    sortable: false,
    renderCell: (params: any) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params: any) => `$${Number(params.value).toFixed(2)}`,
  },
];

export const dashboardColums = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 1,
  },
  {
    field: "products",
    headerName: "# of Products",
    flex: 0.5,
    sortable: false,
    renderCell: (params: any) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params: any) => `$${Number(params.value).toFixed(2)}`,
  },
];
