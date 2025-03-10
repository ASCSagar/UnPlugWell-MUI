import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
  Drawer,
  Button,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import UnplugWell from "../../assets/unplugwellOne.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const navbarStyles = {
    py: scrolled ? 1 : 1.5,
    transition: "all 0.3s ease",
    bgcolor: scrolled
      ? alpha(theme.palette.background.default, 0.9)
      : "transparent",
    backdropFilter: scrolled ? "blur(8px)" : "none",
    boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "none",
    borderBottom: scrolled ? "1px solid" : "none",
    borderColor: alpha(theme.palette.divider, 0.1),
  };

  const Logo = () => (
    <Box
      component={RouterLink}
      to="/"
      sx={{
        textDecoration: "none",
        color: "#000",
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={UnplugWell}
            alt="UnplugWell Logo"
            sx={{
              width: { xs: 30, md: 35 },
              height: { xs: 30, md: 35 },
              mr: 1,
            }}
          />
          <Box
            component="span"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.4rem", md: "1.6rem" },
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #8b5cf6, #d8b4fe)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            UnplugWell
          </Box>
        </Box>
      </motion.div>
    </Box>
  );

  const DesktopNavItems = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {navItems.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
    </Box>
  );

  interface NavItemProps {
    item: {
      name: string;
      path: string;
    };
    isDropdown?: boolean;
  }

  const NavItem: React.FC<NavItemProps> = ({ item, isDropdown = false }) => {
    const active = isActiveRoute(item.path);
    return (
      <Box
        component={isDropdown ? "div" : RouterLink}
        to={isDropdown ? undefined : item.path}
        sx={{
          position: "relative",
          color: active ? "primary.main" : "text.primary",
          textDecoration: "none",
          py: 1.5,
          px: 2,
          fontWeight: 500,
          fontSize: "0.95rem",
          borderRadius: "8px",
          transition: "all 0.2s",
          "&:hover": {
            color: "primary.main",
            bgcolor: alpha(theme.palette.primary.main, 0.05),
          },
          ...(active && {
            fontWeight: 600,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
          }),
        }}
      >
        {item.name}

        {active && (
          <Box
            component={motion.div}
            layoutId="activeIndicator"
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "-2px",
              height: "2px",
              mx: "auto",
              width: "20px",
              borderRadius: "1px",
              bgcolor: "primary.main",
              boxShadow: "0 0 8px rgba(139, 92, 246, 0.5)",
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ ...navbarStyles }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isMobile && <DesktopNavItems />}
            <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
              {isMobile && (
                <IconButton
                  onClick={toggleMobileMenu}
                  color="primary"
                  sx={{
                    ml: 1,
                    bgcolor: mobileMenuOpen
                      ? alpha(theme.palette.primary.main, 0.1)
                      : "transparent",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        PaperProps={{
          sx: {
            width: "280px",
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: "blur(10px)",
            px: 2,
            py: 4,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            px: 2,
          }}
        >
          <Logo />
          <IconButton
            onClick={toggleMobileMenu}
            edge="end"
            sx={{ color: "text.primary" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
              <Button
                component={RouterLink}
                to={item.path}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  py: 1.5,
                  px: 2,
                  borderRadius: "8px",
                  color: isActiveRoute(item.path)
                    ? "primary.main"
                    : "text.primary",
                  bgcolor: isActiveRoute(item.path)
                    ? alpha(theme.palette.primary.main, 0.08)
                    : "transparent",
                  fontWeight: isActiveRoute(item.path) ? 600 : 500,
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {item.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
