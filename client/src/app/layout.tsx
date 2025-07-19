"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { ThemeProvider } from "@/lib/theme-provider";

const page = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default page;
