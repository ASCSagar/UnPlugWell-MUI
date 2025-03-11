import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Seo from "../components/layout/Seo";
import Layout from "../components/layout/Layout";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Divider,
  alpha,
  Container,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const theme = useTheme();
  const MotionPaper = motion(Paper);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear the error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://unplugwell.com/blog/api/message/message/",
        { ...formState, site: "2" }
      );
      if (response.status === 201) {
        setSnackbarMessage("Message sent successfully!");
        setSnackbarSeverity("success");
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      setSnackbarMessage("Failed to send message. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Layout>
      <Seo
        title="Contact Us | UnplugWell - Reach Out for Digital Detox Support"
        description="Have questions about digital detox or need assistance? Contact UnplugWell today. We’re here to help you unplug and thrive in a hyper-connected world."
        canonicalUrl="/contact"
      />
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            pt: 8,
            bgcolor: alpha(theme.palette.primary.light, 0.05),
          }}
        >
          <Container>
            <MotionPaper
              elevation={2}
              sx={{
                p: { xs: 3, md: 5 },
                mb: 5,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.light,
                  0.2
                )}, ${alpha(theme.palette.background.paper, 0.9)})`,
                position: "relative",
                overflow: "hidden",
              }}
              initial="hidden"
              animate="visible"
            >
              <Box>
                <Typography
                  variant="h3"
                  component="h1"
                  align="center"
                  fontWeight={700}
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                  }}
                >
                  Get In Touch
                </Typography>

                <Divider
                  sx={{
                    width: "100px",
                    mx: "auto",
                    my: 3,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  }}
                />
                <Typography
                  align="center"
                  sx={{ maxWidth: "700px", mx: "auto" }}
                >
                  Have questions or suggestions? We'd love to hear from you.
                </Typography>
              </Box>
            </MotionPaper>
          </Container>
        </Box>

        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={5}
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Contact Information
              </Typography>

              <Typography variant="body1" paragraph>
                We're here to help with any questions about digital wellbeing,
                collaboration opportunities, or feedback on our content.
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 4, mb: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  <strong>Email : </strong>support@unplugwell.com
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  <strong>Location : </strong> Alkapuri, Vadodara
                </Typography>
              </Box>

              <Box sx={{ py: 2 }}>
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169202432397!2d73.16878167596472!3d22.309439742562773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5873e594259%3A0xda3dc91c20f4beec!2sAnant%20Soft%20Computing!5e0!3m2!1sen!2sin!4v1731308281495!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  loading="lazy"
                />
              </Box>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper
              elevation={0}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 4,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Send Us a Message
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Your Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Your Message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    fullWidth
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SendIcon />}
                    disabled={loading}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default ContactPage;
