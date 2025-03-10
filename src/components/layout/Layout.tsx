import React, { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  disableContainer?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  maxWidth = "lg",
  disableContainer = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 4, md: 6 },
        }}
      >
        {disableContainer ? (
          children
        ) : (
          <Container maxWidth={maxWidth}>{children}</Container>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
