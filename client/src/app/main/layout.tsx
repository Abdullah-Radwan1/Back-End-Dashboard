"use client";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

import { useState } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const drawerWidth = "250px";
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isNonMobile, setIsNonMobile] = useState(true);

  // Apply dark or light mode class to <html> element

  return (
    <html suppressHydrationWarning>
      <body>
        <div>
          {/* <SideBar
        isNonMobile={isNonMobile}
        drawerWidth={drawerWidth}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      /> */}
          <div className="w-full">
            <NavBar
              isSideBarOpen={isSideBarOpen}
              setIsSideBarOpen={setIsSideBarOpen}
            />
            <main className="p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
