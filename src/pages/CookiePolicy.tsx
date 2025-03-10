import React, { useEffect } from "react";
import { Container, Typography, Box, Link, Breadcrumbs } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cookie Policy | UnplugWell";
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 4 }}
      >
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">Cookie Policy</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Cookie Policy
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Last Updated: March 1, 2025
      </Typography>

      {/* Content */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          1. Introduction
        </Typography>
        <Typography paragraph>
          UnplugWell.com (hereinafter referred to as "the Site," "we," "us," or
          "our") uses cookies and other similar technologies to enhance your
          browsing experience. This Cookie Policy explains what cookies are, how
          we use them, and your choices regarding cookies.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          2. What Are Cookies?
        </Typography>
        <Typography paragraph>
          Cookies are small text files that are placed on your computer or
          mobile device when you visit a website. They are widely used to make
          websites work more efficiently, as well as to provide information to
          the website owners.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          3. How We Use Cookies
        </Typography>
        <Typography variant="h6" gutterBottom>
          Essential Cookies:
        </Typography>
        <Typography paragraph>
          These cookies are necessary for the operation of our Site. They enable
          you to navigate the Site and use its features.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Analytics Cookies:
        </Typography>
        <Typography paragraph>
          We use analytics cookies, such as those provided by Google Analytics,
          to collect information about how visitors use our Site. This helps us
          analyze website traffic and improve our Site's performance. These
          cookies collect information in an anonymous form, including the number
          of visitors, where visitors have come to the Site from, and the pages
          they visited.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Functionality Cookies:
        </Typography>
        <Typography paragraph>
          These cookies allow our Site to remember choices you make (such as
          your language preference) and provide enhanced features.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Third-Party Cookies:
        </Typography>
        <Typography paragraph>
          We may also use third-party cookies, such as those from social media
          platforms or advertising networks, to provide certain features or to
          display targeted advertisements.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          4. Types of Cookies We Use
        </Typography>
        <Typography variant="h6" gutterBottom>
          Session Cookies:
        </Typography>
        <Typography paragraph>
          These are temporary cookies that are stored in your browser's memory
          and are deleted when you close your browser.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Persistent Cookies:
        </Typography>
        <Typography paragraph>
          These cookies remain on your device for a longer period or until you
          delete them.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          5. Your Cookie Choices
        </Typography>
        <Typography variant="h6" gutterBottom>
          Browser Settings:
        </Typography>
        <Typography paragraph>
          You can control and manage cookies through your browser settings. Most
          browsers allow you to block or delete cookies. However, please note
          that blocking cookies may affect your ability to use certain features
          of our Site.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Opt-Out Tools:
        </Typography>
        <Typography paragraph>
          Some third-party services provide opt-out tools that allow you to
          disable their cookies. For example, you can opt-out of Google
          Analytics by installing the Google Analytics Opt-out Browser Add-on.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Cookie Consent Banner:
        </Typography>
        <Typography paragraph>
          Upon your first visit to our site, you will be presented with a cookie
          consent banner, that allows you to accept or deny the use of
          non-essential cookies.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          6. Third-Party Cookies
        </Typography>
        <Typography paragraph>
          We may use third-party services that set cookies on our Site. We do
          not have control over these cookies, and we encourage you to review
          the cookie policies of these third parties.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          7. Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions or concerns about our Cookie Policy, please
          contact us:
        </Typography>
        <Typography>Email: support@unplugwell.com</Typography>
        <Typography>
          Address: Alkapuri, Vadodara, Gujarat, India 390007
        </Typography>
        <Typography>Contact: Available on UnplugWell.com</Typography>
      </Box>
    </Container>
  );
};

export default CookiePolicy;
