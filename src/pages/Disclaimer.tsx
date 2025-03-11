import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Seo from "../components/layout/Seo";
import Layout from "../components/layout/Layout";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  useTheme,
  alpha,
  Card,
  CardContent,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import LinkIcon from "@mui/icons-material/Link";
import GavelIcon from "@mui/icons-material/Gavel";
import DevicesIcon from "@mui/icons-material/Devices";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  index: number;
}

const Disclaimer = () => {
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const MotionPaper = motion(Paper);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <Layout>
      <Seo
        title="Disclaimer | UnplugWell - Your Digital Detox Partner"
        description="Learn about UnplugWell, your trusted source for digital detox solutions. Our mission is to help you create a healthier relationship with technology and embrace mindful living."
        canonicalUrl="/disclaimer"
      />
      <Box
        sx={{
          pt: 8,
          pb: 8,
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
            variants={headerVariants}
          >
            <Box sx={{ position: "relative", zIndex: 1 }}>
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
                Disclaimer
              </Typography>
              <Divider
                sx={{
                  width: "100px",
                  mx: "auto",
                  my: 3,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                }}
              />
              <Typography align="center" sx={{ maxWidth: "700px", mx: "auto" }}>
                The information provided on UnplugWell is for general
                informational purposes only. Please review this disclaimer
                carefully to understand our limitations and your
                responsibilities.
              </Typography>
            </Box>
          </MotionPaper>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SectionCard
                title="1. General Information"
                icon={<InfoIcon fontSize="large" />}
                index={0}
              >
                <Typography paragraph>
                  The information provided on UnplugWell.com (hereinafter
                  referred to as "the Site," "we," "us," or "our") is for
                  general informational and educational purposes only. It is not
                  intended as a substitute for professional advice, including
                  but not limited to medical, psychological, or technological
                  advice.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12}>
              <SectionCard
                title="2. Digital Detox and Well-being"
                icon={<MedicalInformationIcon fontSize="large" />}
                index={1}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem", mt: 2 }}
                >
                  Individual Results May Vary:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  The strategies, tips, and recommendations related to digital
                  detox and well-being presented on this Site are based on
                  general knowledge and experience. Individual results may vary,
                  and what works for one person may not work for another.
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Not Medical Advice:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  The content on this Site should not be considered medical
                  advice. If you have concerns about your mental or physical
                  health, including the impact of digital device usage, please
                  consult with a qualified healthcare professional.
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Personal Responsibility:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  You are solely responsible for your decisions and actions
                  related to digital detox and well-being. We are not liable for
                  any consequences resulting from your use of the information on
                  this Site.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="3. Technology and Internet Use"
                icon={<DevicesIcon fontSize="large" />}
                index={2}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem", mt: 2 }}
                >
                  No Guarantee of Accuracy:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  While we strive to provide accurate and up-to-date information
                  about technology and internet use, we make no representations
                  or warranties about the accuracy, completeness, or reliability
                  of the content.
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Third-Party Products and Services:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  Any mention of third-party products or services on this Site
                  does not constitute an endorsement or recommendation. We are
                  not responsible for the performance, reliability, or safety of
                  these products or services.
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Internet Risks:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  Internet use involves inherent risks, including but not
                  limited to malware, viruses, and data breaches. We are not
                  responsible for any damages or losses resulting from your use
                  of the internet.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="4. Limitation of Liability"
                icon={<GavelIcon fontSize="large" />}
                index={3}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem", mt: 2 }}
                >
                  As-Is Basis:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  This Site and its content are provided on an "as-is" and
                  "as-available" basis. We disclaim all warranties, express or
                  implied, including but not limited to warranties of
                  merchantability, fitness for a particular purpose, and
                  non-infringement.
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  No Liability:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  To the fullest extent permitted by law, UnplugWell.com and its
                  affiliates, officers, directors, employees, and agents shall
                  not be liable for any direct, indirect, incidental,
                  consequential, or punitive damages arising out of or related
                  to your use of this Site.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="5. External Links"
                icon={<LinkIcon fontSize="large" />}
                index={4}
              >
                <Typography paragraph>
                  This Site may contain links to third-party websites. We are
                  not responsible for the content, privacy practices, or
                  accuracy of information on these websites.
                </Typography>
                <Typography paragraph>
                  The inclusion of external links does not imply endorsement or
                  recommendation by UnplugWell.com.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="6. Contact Us"
                icon={<ContactSupportIcon fontSize="large" />}
                index={5}
              >
                <Typography paragraph>
                  If you have any questions or concerns about this Disclaimer,
                  please contact us:
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.1),
                    borderRadius: 2,
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                  }}
                >
                  <Typography
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>
                      Email:
                    </Box>{" "}
                    support@unplugwell.com
                  </Typography>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>
                      Address:
                    </Box>{" "}
                    Alkapuri, Vadodara, Gujarat, India 390007
                  </Typography>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>
                      Contact:
                    </Box>{" "}
                    Available on UnplugWell.com
                  </Typography>
                </Box>
              </SectionCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  children,
  index,
}) => {
  const theme = useTheme();
  const MotionCard = motion(Card);

  return (
    <MotionCard
      elevation={2}
      sx={{
        borderRadius: 3,
        height: "100%",
        overflow: "visible",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.1 + index * 0.1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Box
          sx={{
            mr: 2,
            color: theme.palette.primary.main,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            p: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </Typography>
      </Box>
      <CardContent sx={{ p: 3 }}>{children}</CardContent>
    </MotionCard>
  );
};

export default Disclaimer;
