// src/pages/TermsOfService.tsx
import React, { useEffect } from 'react';
import { Container, Typography, Box, Link, Breadcrumbs } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | UnplugWell';
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
        <Link component={RouterLink} to="/" color="inherit">Home</Link>
        <Typography color="text.primary">Terms of Service</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Terms of Service
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Last Updated: March 1, 2025
      </Typography>

      {/* Content */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>1. Acceptance of Terms</Typography>
        <Typography paragraph>
          By accessing and using UnplugWell.com (hereinafter referred to as "the Site," "we," "us," or "our"), 
          you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any 
          part of these terms, you must not use our Site.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>2. Content Ownership and Use</Typography>
        <Typography variant="h6" gutterBottom>Content Ownership:</Typography>
        <Typography paragraph>
          All content on UnplugWell.com, including but not limited to text, images, graphics, logos, 
          and software, is the property of UnplugWell.com or its licensors and is protected by 
          copyright and other intellectual property laws.
        </Typography>

        <Typography variant="h6" gutterBottom>Permitted Use:</Typography>
        <Typography paragraph>
          You may access and use the content on our Site for personal, non-commercial purposes only. 
          You may not reproduce, distribute, modify, or create derivative works from our content 
          without our express written permission.
        </Typography>

        <Typography variant="h6" gutterBottom>User-Generated Content:</Typography>
        <Typography paragraph>
          If you submit comments or other user-generated content, you grant us a non-exclusive, 
          royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute 
          that content. You are responsible for ensuring your user-generated content does not violate 
          any third-party rights or applicable laws.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>3. User Conduct</Typography>
        <Typography paragraph>Prohibited Activities: You agree not to:</Typography>
        <ul>
          <li><Typography>Use our Site for any illegal or unauthorized purpose.</Typography></li>
          <li><Typography>Post or transmit any content that is harmful, offensive, defamatory, or infringing.</Typography></li>
          <li><Typography>Interfere with or disrupt the operation of our Site.</Typography></li>
          <li><Typography>Attempt to gain unauthorized access to our systems or user accounts.</Typography></li>
          <li><Typography>Engage in any activity that could damage or impair our Site.</Typography></li>
        </ul>

        <Typography paragraph>
          When leaving comments, you agree to remain respectful. Any comments deemed inappropriate 
          will be removed by UnplugWell.com.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>4. Disclaimers</Typography>
        <Typography paragraph>
          The content on UnplugWell.com is provided for informational purposes only and should not be 
          considered professional advice. We make no representations or warranties about the accuracy, 
          completeness, or suitability of the content.
        </Typography>
        <Typography paragraph>
          We do not guarantee that our Site will be available at all times or that it will be free 
          from errors or viruses.
        </Typography>
        <Typography paragraph>
          Our Site may contain links to third-party websites. We are not responsible for the content 
          or privacy practices of these websites.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>5. Limitation of Liability</Typography>
        <Typography paragraph>
          To the fullest extent permitted by law, UnplugWell.com and its affiliates, officers, 
          directors, employees, and agents shall not be liable for any direct, indirect, incidental, 
          consequential, or punitive damages arising out of or related to your use of our Site.
        </Typography>
        <Typography paragraph>
          You agree to indemnify and hold UnplugWell.com harmless from any claims, damages, or expenses 
          arising out of your use of our Site or your violation of these Terms and Conditions.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>6. Changes to Terms and Conditions</Typography>
        <Typography paragraph>
          We reserve the right to modify these Terms and Conditions at any time. We will notify 
          you of any changes by posting the new terms on this page.
        </Typography>
        <Typography paragraph>
          You are advised to review these Terms and Conditions periodically for any changes. 
          Your continued use of our Site after any changes constitutes your acceptance of the new terms.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>7. Contact Us</Typography>
        <Typography paragraph>
          If you have any questions or concerns about these Terms and Conditions, please contact us:
        </Typography>
        <Typography>Email: support@unplugwell.com</Typography>
        <Typography>Address: Alkapuri, Vadodara, Gujarat, India 390007</Typography>
        <Typography>Contact: Available on UnplugWell.com</Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService;