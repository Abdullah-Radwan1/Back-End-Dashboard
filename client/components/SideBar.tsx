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
 const [active, setActive] = useState("");
 const router = useRouter();
 const pathName = usePathname();
 const theme = useTheme();
 console.log(data);
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
       width: drawerWidth,
       backgroundColor: theme.palette.background.paper, // Matches theme background
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
      <Box my={"2rem"} display="flex" alignItems="center" justifyContent={"center"} gap={4}>
       <section className="flex items-center gap-5">
        <Image
         width={40}
         height={40}
         src={"/241373641_887265995553345_4026210723519995756_n.jpg"}
         alt=""
         className="rounded-full"
        />
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
      <Divider sx={{ backgroundColor: theme.palette.neutral.main }} />
      <List>
       {navItems.map(({ text, icon }) => {
        if (!icon) {
         return (
          <Typography
           sx={{ p: "2.25rem 0 1rem 2.6rem", fontWeight: "bolder", fontSize: "1.1rem" }}
           key={text}
           color={theme.palette.text.primary}
          >
           {text}
          </Typography>
         );
        }
        const lcText = text.toLowerCase();
        return (
         <ListItem
          sx={{
           backgroundColor: active === lcText ? theme.palette.background.default : "transparent",
          }}
          key={text}
          disablePadding
         >
          <ListItemButton
           sx={{
            pl: 5,
            backgroundColor: active === lcText ? theme.palette.primary.main : "transparent",
            color: active === lcText ? theme.palette.text.secondary : theme.palette.primary.main,
           }}
           onClick={() => {
            router.push(`/${lcText}`);
            setActive(lcText);
           }}
          >
           <ListItemIcon
            sx={{
             color: active === lcText ? theme.palette.text.secondary : theme.palette.text.primary,
            }}
           >
            {icon}
           </ListItemIcon>
           <ListItemText primary={text} />
          </ListItemButton>
         </ListItem>
        );
       })}
      </List>
     </Box>
    </Drawer>
   )}
  </Box>
 );
};

export default SideBar;
