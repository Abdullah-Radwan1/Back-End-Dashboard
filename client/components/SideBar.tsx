import React, { useState } from "react";
import { navItems } from "../utils/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
 IconButton,
 List,
 ListItem,
 ListItemButton,
 ListItemIcon,
 ListItemText,
 Typography,
 useTheme,
 Box,
 Drawer,
 Divider,
 Icon,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import Image from "next/image";
import { user } from "../types/userT";

const SideBar = ({
 setIsSideBarOpen,
 isSideBarOpen,
 isNonMobile,
 drawerWidth,
 data,
}: {
 setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
 isSideBarOpen: boolean;
 isNonMobile: boolean;
 drawerWidth: string;
 data: user;
}) => {
 const router = useRouter();
 const pathName = usePathname();
 const theme = useTheme();

 return (
  <Box>
   {isSideBarOpen && (
    <Drawer
     open={isSideBarOpen}
     onClose={() => setIsSideBarOpen(false)}
     variant="persistent"
     anchor="left"
     PaperProps={{
      sx: {
       pb: "2rem",
       width: drawerWidth,
       backgroundColor: theme.palette.background.default, // Matches theme background
       borderWidth: isNonMobile ? 0 : "2px",
       "& .MuiListItemButton-root": {},
       "& .MuiListItemIcon-root": {
        minWidth: "40px",
        color: theme.palette.text.primary, // Icon color based on theme
       },
      },
     }}
     sx={{
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
       width: drawerWidth,
       boxSizing: "border-box",
       backgroundColor: theme.palette.background.paper, // Matches theme background
      },
     }}
    >
     <Box>
      <List>
       {navItems.map(({ text, icon }) => {
        if (!icon) {
         return (
          <Typography
           sx={{
            p: ".5rem 0 1rem 2.6rem",
            fontWeight: "bolder",
            fontSize: "1.1rem",
            color: theme.palette.secondary.dark,
           }}
           key={text}
          >
           {text}
          </Typography>
         );
        }
        const lcText = text.toLowerCase();
        return (
         <ListItem
          sx={{
           backgroundColor: pathName === `/${lcText}` ? theme.palette.action.active : "transparent", // Changes background when path matches
          }}
          key={text}
          disablePadding
         >
          <ListItemButton
           className="flex justify-start gap-4 items-center "
           sx={{
            display: "flex",
            justifyItems: "center",
            pl: 5,
            backgroundColor:
             pathName === `/${lcText}` ? theme.palette.background.default : "transparent", // Changes button background color
            color:
             pathName === `/${lcText}` ? theme.palette.text.primary : theme.palette.text.primary, // Text color based on active state
           }}
           onClick={() => {
            router.push(`/${lcText}`);
           }}
          >
           <IconButton
            sx={{
             color:
              pathName === `/${lcText}` ? theme.palette.text.secondary : theme.palette.text.primary, // Dynamic icon color based on active state
            }}
           >
            {icon}
           </IconButton>

           <h2>{text}</h2>
          </ListItemButton>
         </ListItem>
        );
       })}
      </List>
     </Box>
     <Divider sx={{ backgroundColor: theme.palette.divider }} />

     <Box my={"2rem"} display="flex" alignItems="center" justifyContent={"center"}>
      <section className="flex items-center gap-5">
       <Image width={50} height={50} src={"/cartoon.jpg"} alt="" className="rounded-full" />
       <div>
        <Typography variant="h6" color={theme.palette.text.primary}>
         {data?.name}
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.text.secondary}>
         {data?.role}
        </Typography>
       </div>
      </section>
      {!isNonMobile && (
       <IconButton
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        sx={{ alignSelf: "flex-end", color: theme.palette.text.primary }}
       >
        <ChevronLeft />
       </IconButton>
      )}
     </Box>
    </Drawer>
   )}
  </Box>
 );
};

export default SideBar;
