import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  Button,
  Stack,
  TextField,
  InputAdornment,
  Tooltip,
  useMediaQuery,
  Alert,
  Snackbar,
  useTheme,
} from "@mui/material";
import UnplugWell from "../../assets/unplugwellTwo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import GavelIcon from "@mui/icons-material/Gavel";
import CookieIcon from "@mui/icons-material/Cookie";
import InfoIcon from "@mui/icons-material/Info";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showLegalLinks, setShowLegalLinks] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const currentYear = new Date().getFullYear();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setSubscribeError(true);
      setErrorMessage("Please enter your email address");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribeError(true);
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://unplugwell.com/blog/api/subscription/subscribe-create/",
        { email, site: "2" }
      );

      if (response.status === 201) {
        setSubscribeSuccess(true);
        setEmail("");
      } else {
        setSubscribeError(true);
        setErrorMessage(response.data.message || "Subscription failed");
      }
    } catch (error) {
      setSubscribeError(true);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSubscribeSuccess(false);
    setSubscribeError(false);
  };

  const toggleLegalLinks = () => {
    setShowLegalLinks(!showLegalLinks);
  };

  const socialLinks = [
    {
      icon: <FacebookIcon />,
      url: "https://www.facebook.com/people/Unplugwell-DigitalDetox/61570893369070/",
      label: "Facebook",
    },
    {
      icon: <TwitterIcon />,
      url: "https://x.com/unplugwell",
      label: "Twitter",
    },
    {
      icon: <InstagramIcon />,
      url: "https://www.instagram.com/unplugwell/",
      label: "Instagram",
    },
  ];

  const quickLinks = [
    { text: "Home", url: "/" },
    { text: "Blog", url: "/blogs" },
    { text: "About Us", url: "/about" },
    { text: "Contact", url: "/contact" },
  ];

  const legalLinks = [
    {
      text: "Privacy Policy",
      url: "/privacy-policy",
      icon: <PrivacyTipIcon fontSize="small" />,
    },
    {
      text: "Terms of Service",
      url: "/terms-of-service",
      icon: <GavelIcon fontSize="small" />,
    },
    {
      text: "Cookie Policy",
      url: "/cookie-policy",
      icon: <CookieIcon fontSize="small" />,
    },
    {
      text: "Disclaimer",
      url: "/disclaimer",
      icon: <InfoIcon fontSize="small" />,
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        background: "linear-gradient(90deg, #8b5cf6, #8b5cf6)",
        color: "#fff",
        mt: "auto",
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 3, sm: 4, md: 6 },
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Brand section */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
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
                UnplugWell
              </Typography>

              <Typography
                variant="body2"
                sx={{ mb: 3, opacity: 0.9, lineHeight: 1.7 }}
              >
                Discover the benefits of digital detox. Explore expert tips,
                resources, and strategies to disconnect, recharge, and find
                balance in a tech-driven world.
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  ".MuiIconButton-root": {
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transform: "translateY(-3px)",
                    },
                  },
                }}
              >
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} title={social.label} arrow>
                    <IconButton
                      color="inherit"
                      aria-label={social.label}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Quick Links section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Quick Links
            </Typography>

            <Stack spacing={1.5}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.url}
                  sx={{
                    color: "inherit",
                    display: "block",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    opacity: 0.9,
                    "&:hover": {
                      opacity: 1,
                      pl: 0.5,
                      fontWeight: 500,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "&:hover .MuiSvgIcon-root": {
                        opacity: 1,
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <Typography variant="body2">{link.text}</Typography>
                    <ArrowForwardIcon
                      sx={{
                        ml: 1,
                        fontSize: "0.8rem",
                        opacity: 0,
                        transition: "all 0.3s ease",
                      }}
                    />
                  </Box>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Newsletter section */}
          <Grid item xs={12} sm={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Subscribe to Our Newsletter
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 2, opacity: 0.9, lineHeight: 1.7 }}
            >
              Join our newsletter to receive the latest updates and tips on
              digital wellbeing.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 3,
                width: "100%",
              }}
            >
              <TextField
                value={email}
                onChange={handleEmailChange}
                placeholder="Your email address"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  flex: { xs: "1", sm: "2" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                    </InputAdornment>
                  ),
                }}
                error={subscribeError}
                helperText={subscribeError ? errorMessage : ""}
              />

              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                disabled={isLoading}
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  fontWeight: 600,
                  py: { xs: 1, sm: 1.2 },
                  flex: { xs: "1", sm: "1" },
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                {isLoading
                  ? "Subscribing..."
                  : isSmall
                  ? "Subscribe"
                  : "Subscribe Now"}
              </Button>
            </Box>

            <Typography
              variant="caption"
              sx={{
                opacity: 0.8,
                display: "block",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </Typography>
          </Grid>
        </Grid>

        <Divider
          sx={{ my: { xs: 3, md: 4 }, borderColor: "rgba(255, 255, 255, 0.2)" }}
        />

        {/* Footer bottom section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "center" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="body2"
            sx={{ mb: { xs: 2, md: 0 }, opacity: 0.8 }}
          >
            © {currentYear} UnplugWell. All rights reserved.
          </Typography>

          <Box>
            <Button
              onClick={toggleLegalLinks}
              color="inherit"
              endIcon={
                showLegalLinks ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )
              }
              sx={{
                opacity: 0.8,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  opacity: 1,
                },
                display: { xs: "flex", md: "none" },
                mb: 1,
              }}
            >
              Legal
            </Button>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1, md: 3 }}
              sx={{
                display: { xs: showLegalLinks ? "flex" : "none", md: "flex" },
                mb: { xs: 2, md: 0 },
                justifyContent: "center",
              }}
            >
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.url}
                  color="inherit"
                  underline="hover"
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: 0.5,
                    opacity: 0.8,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Scroll to top button */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 8, md: 16 },
            right: { xs: 8, md: 16 },
            zIndex: 2,
          }}
        >
          <Tooltip title="Back to top" arrow>
            <IconButton
              color="inherit"
              aria-label="scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>

      {/* Notifications */}
      <Snackbar
        open={subscribeSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          Thank you for subscribing! Check your email for confirmation.
        </Alert>
      </Snackbar>

      <Snackbar
        open={subscribeError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;
