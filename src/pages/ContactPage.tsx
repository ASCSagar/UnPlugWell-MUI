import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/Seo";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formState.name.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email),
      message: formState.message.trim() === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formState);

      // Simulate successful submission
      setFormSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
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
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            Get In Touch
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Have questions or suggestions? We'd love to hear from you.
          </Typography>
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
                  <strong>Email:</strong> hello@unplugwell.com
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  <strong>Location:</strong> Portland, Oregon
                </Typography>
              </Box>

              <Box
                component="img"
                src="https://source.unsplash.com/random/600x400/?office,cozy"
                alt="UnplugWell office"
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  mt: 4,
                }}
              />
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
                    required
                    error={errors.name}
                    helperText={errors.name ? "Name is required" : ""}
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
                    required
                    error={errors.email}
                    helperText={errors.email ? "Valid email is required" : ""}
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
                    multiline
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={errors.message}
                    helperText={errors.message ? "Message is required" : ""}
                  />
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={formSubmitted}
          autoHideDuration={6000}
          onClose={() => setFormSubmitted(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setFormSubmitted(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Thank you for your message! We'll get back to you soon.
          </Alert>
        </Snackbar>

        <Snackbar
          open={submitError}
          autoHideDuration={6000}
          onClose={() => setSubmitError(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSubmitError(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            There was an error sending your message. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default ContactPage;
