"use client";
import { DownloadOutlined, Email, PersonAdd, PointOfSale, Traffic } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "../../../components/StatBox";
import OverviewChart from "../../../components/OverviewChart";
import Title from "../../../components/Title";
import BreakdownChart from "../../../components/BreakdownChart";
import { useGetDashboardQuery } from "../../../redux/API/api";
import { dashboardColums } from "../../../utils/utils";
export default function Dashboard() {
 const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
 const theme = useTheme();
 const { data, isLoading, isSuccess } = useGetDashboardQuery(undefined);
 return (
  <Box m="1.5rem 2.5rem">
   <div className="flex justify-between">
    <Title title="DASHBOARD" subtitle="Welcome to your dashboard" />

    <Box>
     <Button
      sx={{
       backgroundColor: theme.palette.background.paper,
       color: theme.palette.text.primary,
       fontSize: "14px",
       fontWeight: "bold",
       padding: "10px 20px",
      }}
     >
      <DownloadOutlined sx={{ mr: "10px" }} />
      Download Reports
     </Button>
    </Box>
   </div>

   <Box
    mt="20px"
    display="grid"
    gridTemplateColumns="repeat(12, 1fr)"
    gridAutoRows="160px"
    gap="20px"
    sx={{
     "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
    }}
   >
    {/* ROW 1 */}
    <StatBox
     title="Total Customers"
     value={data && data.totalCustomers}
     increase="+14%"
     description="Since last month"
     icon={<Email sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />}
    />
    <StatBox
     title="Sales Today"
     value={data && data.todayStats.totalSales}
     increase="+21%"
     description="Since last month"
     icon={<PointOfSale sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />}
    />

    <Box
     gridColumn="span 8"
     gridRow="span 2"
     sx={{ backgroundColor: theme.palette.background.paper }}
     p="1rem"
    >
     <OverviewChart view="sales" isDashboard={true} />
    </Box>
    <StatBox
     title="Monthly Sales"
     value={data && data.thisMonthStats.totalSales}
     increase="+5%"
     description="Since last month"
     icon={<PersonAdd sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />}
    />
    <StatBox
     title="Yearly Sales"
     value={data && data.yearlySalesTotal}
     increase="+43%"
     description="Since last month"
     icon={<Traffic sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />}
    />

    {/* ROW 2 */}
    <Box
     gridColumn="span 8"
     gridRow="span 3"
     sx={{
      "& .MuiDataGrid-root": {
       border: "none",
      },
      "& .MuiDataGrid-cell": {
       borderBottom: "none",
      },
      "& .MuiDataGrid-columnHeaders": {
       backgroundColor: theme.palette.background.paper,
       color: theme.palette.secondary.dark,
       borderBottom: "none",
      },
      "& .MuiDataGrid-virtualScroller": {
       backgroundColor: theme.palette.background.paper,
      },
      "& .MuiDataGrid-footerContainer": {
       backgroundColor: theme.palette.background.paper,
       color: theme.palette.secondary.dark,
       borderTop: "none",
      },
      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
       color: `${theme.palette.secondary.main} !important`,
      },
     }}
    >
     <DataGrid
      loading={isLoading || !data}
      getRowId={(row) => row._id}
      rows={(data && data.transactions) || []}
      columns={dashboardColums}
     />
    </Box>
    <Box
     gridColumn="span 4"
     gridRow="span 3"
     sx={{ backgroundColor: theme.palette.background.paper }}
     p="1.5rem"
     borderRadius="0.55rem"
    >
     <Typography variant="h6" sx={{ color: theme.palette.secondary.dark }}>
      Sales By Category
     </Typography>
     <BreakdownChart isDashboard={true} />
     <Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary.dark }}>
      Breakdown of real states and information via category for revenue made for this year and total
      sales.
     </Typography>
    </Box>
   </Box>
  </Box>
 );
}
