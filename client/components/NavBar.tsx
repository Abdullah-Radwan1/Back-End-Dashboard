"use client";
import { Rootstate } from "../redux/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../redux/modeSlice/modeSlice";
import {
 LightModeOutlined,
 DarkModeOutlined,
 Menu as MenuIcon,
 Search,
 SettingsOutlined,
} from "@mui/icons-material";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";

const NavBar = ({
 setIsSideBarOpen,
 isSideBarOpen,
}: {
 setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
 isSideBarOpen: boolean;
}) => {
 const mode = useSelector((state: Rootstate) => state.modeSlice.mode);
 const theme = useTheme();
 const dispatch = useDispatch();

 return (
  <Box
   sx={{
    backgroundColor: theme.palette.background.default,
    transition: "width 0.3s",
    justifyContent: "space-between",
    display: "flex",
    px: 5,
    py: 2,
   }}
  >
   <Box
    sx={{
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
     backgroundColor: theme.palette.background.paper,
     borderRadius: "8px",
     padding: "0 8px",
    }}
   >
    <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
     <MenuIcon />
    </IconButton>
    <InputBase placeholder="Search..." sx={{ marginLeft: 1 }} />
    <IconButton>
     <Search />
    </IconButton>
   </Box>

   {/* Right side */}
   <Box>
    <IconButton>
     <SettingsOutlined />
    </IconButton>
    <IconButton
     onClick={() => {
      dispatch(toggleMode("dark"));
     }}
    >
     {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
   </Box>
  </Box>
 );
};

export default NavBar;
