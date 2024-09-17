"use client";
import { Provider, useSelector } from "react-redux";
import "/src/app/global.css";
import { Rootstate, store } from "../../redux/store";
import NavBar from "../../components/NavBar";
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import SideBar from "../../components/SideBar";
import { useState } from "react";
import { useGetUserQuery } from "../../redux/API/api";

function Layout({ children }: { children: React.ReactNode }) {
 const mode = useSelector((state: Rootstate) => state.modeSlice.mode);
 const userId = useSelector((state: Rootstate) => state.modeSlice.userId);

 const drawerWidth = "250px";
 const [isSideBarOpen, setIsSideBarOpen] = useState(true);
 const isNonMobile = useMediaQuery("(min-width:600px)");
 const { data } = useGetUserQuery(userId);

 return (
  <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
   <CssBaseline />
   <Box display={isNonMobile ? "flex" : "block"} width={"100%"} height={"100%"}>
    <SideBar
     data={data}
     isNonMobile={isNonMobile}
     drawerWidth={drawerWidth}
     isSideBarOpen={isSideBarOpen}
     setIsSideBarOpen={setIsSideBarOpen}
    />
    <Box width="100%">
     <NavBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
     {children}
    </Box>
   </Box>
  </ThemeProvider>
 );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <html lang="en">
   <body>
    <Provider store={store}>
     <Layout>{children}</Layout>
    </Provider>
   </body>
  </html>
 );
}
