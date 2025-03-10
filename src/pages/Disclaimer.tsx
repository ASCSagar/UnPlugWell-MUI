import React, { useEffect } from "react";
import { Container, Typography, Box, Link, Breadcrumbs } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Disclaimer | UnplugWell";
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
        <Typography color="text.primary">Disclaimer</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Disclaimer
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Last Updated: March 1, 2025
      </Typography>

      {/* Content */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          1. General Information
        </Typography>
        <Typography paragraph>
          The information provided on UnplugWell.com (hereinafter referred to as
          "the Site," "we," "us," or "our") is for general informational and
          educational purposes only. It is not intended as a substitute for
          professional advice, including but not limited to medical,
          psychological, or technological advice.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          2. Digital Detox and Well-being
        </Typography>
        <Typography variant="h6" gutterBottom>
          Individual Results May Vary:
        </Typography>
        <Typography paragraph>
          The strategies, tips, and recommendations related to digital detox and
          well-being presented on this Site are based on general knowledge and
          experience. Individual results may vary, and what works for one person
          may not work for another.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Not Medical Advice:
        </Typography>
        <Typography paragraph>
          The content on this Site should not be considered medical advice. If
          you have concerns about your mental or physical health, including the
          impact of digital device usage, please consult with a qualified
          healthcare professional.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Personal Responsibility:
        </Typography>
        <Typography paragraph>
          You are solely responsible for your decisions and actions related to
          digital detox and well-being. We are not liable for any consequences
          resulting from your use of the information on this Site.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          3. Technology and Internet Use
        </Typography>
        <Typography variant="h6" gutterBottom>
          No Guarantee of Accuracy:
        </Typography>
        <Typography paragraph>
          While we strive to provide accurate and up-to-date information about
          technology and internet use, we make no representations or warranties
          about the accuracy, completeness, or reliability of the content.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Third-Party Products and Services:
        </Typography>
        <Typography paragraph>
          Any mention of third-party products or services on this Site does not
          constitute an endorsement or recommendation. We are not responsible
          for the performance, reliability, or safety of these products or
          services.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Internet Risks:
        </Typography>
        <Typography paragraph>
          Internet use involves inherent risks, including but not limited to
          malware, viruses, and data breaches. We are not responsible for any
          damages or losses resulting from your use of the internet.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          4. Limitation of Liability
        </Typography>
        <Typography variant="h6" gutterBottom>
          As-Is Basis:
        </Typography>
        <Typography paragraph>
          This Site and its content are provided on an "as-is" and
          "as-available" basis. We disclaim all warranties, express or implied,
          including but not limited to warranties of merchantability, fitness
          for a particular purpose, and non-infringement.
        </Typography>

        <Typography variant="h6" gutterBottom>
          No Liability:
        </Typography>
        <Typography paragraph>
          To the fullest extent permitted by law, UnplugWell.com and its
          affiliates, officers, directors, employees, and agents shall not be
          liable for any direct, indirect, incidental, consequential, or
          punitive damages arising out of or related to your use of this Site.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          5. External Links
        </Typography>
        <Typography paragraph>
          This Site may contain links to third-party websites. We are not
          responsible for the content, privacy practices, or accuracy of
          information on these websites.
        </Typography>
        <Typography paragraph>
          The inclusion of external links does not imply endorsement or
          recommendation by UnplugWell.com.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          6. Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions or concerns about this Disclaimer, please
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

export default Disclaimer;
