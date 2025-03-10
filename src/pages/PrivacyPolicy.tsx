// src/pages/PrivacyPolicy.tsx
import React, { useEffect } from 'react';
import { Container, Typography, Box, Link, Breadcrumbs } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | UnplugWell';
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
        <Link component={RouterLink} to="/" color="inherit">Home</Link>
        <Typography color="text.primary">Privacy Policy</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Last Updated: March 1, 2025
      </Typography>

      {/* Content */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>1. Introduction</Typography>
        <Typography paragraph>
          Welcome to UnplugWell.com (hereinafter referred to as "the Site," "we," "us," or "our"). We are 
          committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when 
          you visit our Site. By using UnplugWell.com, you agree to the terms of this Privacy Policy.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>2. Information We Collect</Typography>
        <Typography variant="h6" gutterBottom>Personal Information:</Typography>
        <ul>
          <li>
            <Typography>
              When you subscribe to our newsletter, leave comments, or contact us through our 
              contact form, we may collect your name, email address, and any other information you 
              voluntarily provide.
            </Typography>
          </li>
          <li>
            <Typography>
              If you create an account (if applicable in the future), we may collect your username, 
              password, and profile information.
            </Typography>
          </li>
        </ul>

        <Typography variant="h6" gutterBottom>Non-Personal Information:</Typography>
        <ul>
          <li>
            <Typography>
              We automatically collect certain non-personal information when you visit our Site, 
              including your IP address, browser type, operating system, referring website, pages 
              visited, and the dates and times of your visits.
            </Typography>
          </li>
          <li>
            <Typography>
              We may use cookies, web beacons, and other tracking technologies to collect this information.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>3. How We Use Your Information</Typography>
        <Typography paragraph>We may use your information for the following purposes:</Typography>
        <ul>
          <li><Typography>To provide and maintain our Site.</Typography></li>
          <li><Typography>To send you newsletters and updates (if you have subscribed).</Typography></li>
          <li><Typography>To respond to your comments and inquiries.</Typography></li>
          <li><Typography>To improve our Site and user experience.</Typography></li>
          <li><Typography>To analyze website traffic and usage patterns.</Typography></li>
          <li><Typography>To prevent fraud and protect our Site's security.</Typography></li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>4. Cookies and Tracking Technologies</Typography>
        <ul>
          <li>
            <Typography>
              We use cookies and similar tracking technologies to enhance your experience on our Site. 
              Cookies are small data files stored on your device that allow us to recognize your browser 
              and remember certain information.
            </Typography>
          </li>
          <li>
            <Typography>
              You can control cookies through your browser settings and opt-out of certain tracking 
              technologies. However, disabling cookies may affect your ability to use certain features 
              of our Site.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>5. Third-Party Services</Typography>
        <ul>
          <li>
            <Typography>
              We may use third-party services, such as email marketing platforms, analytics providers, 
              and social media plugins, to operate and improve our Site.
            </Typography>
          </li>
          <li>
            <Typography>
              These third-party services may have their own privacy policies, which we encourage you to review.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>6. Data Security</Typography>
        <ul>
          <li>
            <Typography>
              We take reasonable measures to protect your personal information from unauthorized access, 
              use, or disclosure.
            </Typography>
          </li>
          <li>
            <Typography>
              However, no method of transmission over the internet or electronic storage is 100% secure, 
              and we cannot guarantee absolute security.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>7. Contact Us</Typography>
        <Typography paragraph>
          If you have any questions or concerns about this Privacy Policy, please contact us:
        </Typography>
        <Typography>Email: unplugwell@gmail.com</Typography>
        <Typography>Contact: Available on UnplugWell.com</Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;