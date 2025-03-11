import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Link,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CookieIcon from "@mui/icons-material/Cookie";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface CookieConsentProps {
  cookieName?: string;
  cookieValue?: string;
  cookieExpiration?: number; // days
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  cookieName = "cookie_consent",
  cookieValue = "accepted",
  cookieExpiration = 365, // 1 year by default
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = getCookie(cookieName) === cookieValue;
    if (!hasConsented) {
      // Show consent banner if no consent found
      setOpen(true);
    }
  }, [cookieName, cookieValue]);

  // Get cookie by name
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  // Set cookie with name, value and expiration
  const setCookie = (name: string, value: string, days: number): void => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const handleAccept = () => {
    // Set consent cookie
    setCookie(cookieName, cookieValue, cookieExpiration);
    setOpen(false);

    // Optional: Add analytics initialization here if needed
    // For example, you might initialize Google Analytics here
  };

  const handleClose = () => {
    // Set cookie for dismissed state but not full consent
    setCookie("cookie_dismissed", "true", 7); // Shorter expiration for dismissed
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          sx={{
            position: "fixed",
            bottom: 20,
            left: { xs: 16, md: 30 },
            right: { xs: 16, md: 30 },
            zIndex: 9999,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid",
              borderColor: "rgba(99, 102, 241, 0.2)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CookieIcon
                  color="primary"
                  sx={{
                    fontSize: { xs: 32, sm: 40 },
                    color: "#6366f1",
                  }}
                />

                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    We Value Your Privacy
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    This website uses cookies to improve your experience and
                    personalize content. By clicking "Accept All", you consent
                    to our use of cookies. Visit our{" "}
                    <Link
                      component={RouterLink}
                      to="/cookie-policy"
                      color="primary"
                    >
                      Cookie Policy
                    </Link>{" "}
                    or{" "}
                    <Link
                      component={RouterLink}
                      to="/privacy-policy"
                      color="primary"
                    >
                      Privacy Policy
                    </Link>{" "}
                    to learn more.
                  </Typography>
                </Box>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{
                  minWidth: { sm: 260 },
                  alignSelf: { xs: "stretch", sm: "auto" },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  fullWidth
                  sx={{
                    borderColor: "#6366f1",
                    color: "#6366f1",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#4f46e5",
                      backgroundColor: "rgba(99, 102, 241, 0.05)",
                    },
                  }}
                >
                  Necessary Only
                </Button>

                <Button
                  variant="contained"
                  onClick={handleAccept}
                  fullWidth
                  sx={{
                    bgcolor: "#6366f1",
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    color: "white",
                    fontWeight: 500,
                    "&:hover": {
                      background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                    },
                  }}
                >
                  Accept All
                </Button>
              </Stack>
            </Box>

            <IconButton
              size="small"
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
