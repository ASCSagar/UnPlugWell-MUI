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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import CookieIcon from "@mui/icons-material/Cookie";
import SecurityIcon from "@mui/icons-material/Security";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface BulletItemProps {
  children: React.ReactNode;
}

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  index: number;
}

const PrivacyPolicy = () => {
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
        title="Privacy Policy | UnplugWell - Your Digital Detox Partner"
        description="Learn about UnplugWell, your trusted source for digital detox solutions. Our mission is to help you create a healthier relationship with technology and embrace mindful living."
        canonicalUrl="/privacy-policy"
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
                Privacy Policy
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
                At UnplugWell, we value your privacy and are committed to
                protecting your personal information. This policy outlines how
                we collect, use, and safeguard your data when you visit our
                website.
              </Typography>
            </Box>
          </MotionPaper>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SectionCard
                title="1. Introduction"
                icon={<InfoIcon fontSize="large" />}
                index={0}
              >
                <Typography paragraph>
                  Welcome to UnplugWell.com (hereinafter referred to as "the
                  Site," "we," "us," or "our"). We are committed to protecting
                  your privacy and ensuring the security of your personal
                  information. This Privacy Policy outlines how we collect, use,
                  disclose, and safeguard your information when you visit our
                  Site. By using UnplugWell.com, you agree to the terms of this
                  Privacy Policy.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="2. Information We Collect"
                icon={<PersonIcon fontSize="large" />}
                index={1}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem", mt: 2 }}
                >
                  Personal Information:
                </Typography>

                <List disablePadding>
                  <BulletItem>
                    When you subscribe to our newsletter, leave comments, or
                    contact us through our contact form, we may collect your
                    name, email address, and any other information you
                    voluntarily provide.
                  </BulletItem>
                  <BulletItem>
                    If you create an account (if applicable in the future), we
                    may collect your username, password, and profile
                    information.
                  </BulletItem>
                </List>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem", mt: 3 }}
                >
                  Non-Personal Information:
                </Typography>

                <List disablePadding>
                  <BulletItem>
                    We automatically collect certain non-personal information
                    when you visit our Site, including your IP address, browser
                    type, operating system, referring website, pages visited,
                    and the dates and times of your visits.
                  </BulletItem>
                  <BulletItem>
                    We may use cookies, web beacons, and other tracking
                    technologies to collect this information.
                  </BulletItem>
                </List>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="3. How We Use Your Information"
                icon={<DataUsageIcon fontSize="large" />}
                index={2}
              >
                <Typography paragraph>
                  We may use your information for the following purposes:
                </Typography>

                <List disablePadding>
                  <BulletItem>To provide and maintain our Site.</BulletItem>
                  <BulletItem>
                    To send you newsletters and updates (if you have
                    subscribed).
                  </BulletItem>
                  <BulletItem>
                    To respond to your comments and inquiries.
                  </BulletItem>
                  <BulletItem>
                    To improve our Site and user experience.
                  </BulletItem>
                  <BulletItem>
                    To analyze website traffic and usage patterns.
                  </BulletItem>
                  <BulletItem>
                    To prevent fraud and protect our Site's security.
                  </BulletItem>
                </List>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="4. Cookies and Tracking Technologies"
                icon={<CookieIcon fontSize="large" />}
                index={3}
              >
                <List disablePadding>
                  <BulletItem>
                    We use cookies and similar tracking technologies to enhance
                    your experience on our Site. Cookies are small data files
                    stored on your device that allow us to recognize your
                    browser and remember certain information.
                  </BulletItem>
                  <BulletItem>
                    You can control cookies through your browser settings and
                    opt-out of certain tracking technologies. However, disabling
                    cookies may affect your ability to use certain features of
                    our Site.
                  </BulletItem>
                </List>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="5. Third-Party Services"
                icon={<GroupWorkIcon fontSize="large" />}
                index={4}
              >
                <List disablePadding>
                  <BulletItem>
                    We may use third-party services, such as email marketing
                    platforms, analytics providers, and social media plugins, to
                    operate and improve our Site.
                  </BulletItem>
                  <BulletItem>
                    These third-party services may have their own privacy
                    policies, which we encourage you to review.
                  </BulletItem>
                </List>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="6. Data Security"
                icon={<SecurityIcon fontSize="large" />}
                index={5}
              >
                <List disablePadding>
                  <BulletItem>
                    We take reasonable measures to protect your personal
                    information from unauthorized access, use, or disclosure.
                  </BulletItem>
                  <BulletItem>
                    However, no method of transmission over the internet or
                    electronic storage is 100% secure, and we cannot guarantee
                    absolute security.
                  </BulletItem>
                </List>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="7. Contact Us"
                icon={<ContactSupportIcon fontSize="large" />}
                index={6}
              >
                <Typography paragraph>
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us:
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
                    unplugwell@gmail.com
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

const BulletItem: React.FC<BulletItemProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <ListItem alignItems="flex-start" sx={{ px: 0, py: 0.5 }}>
      <ListItemIcon sx={{ minWidth: 28, color: theme.palette.primary.main }}>
        <FiberManualRecordIcon sx={{ fontSize: 10 }} />
      </ListItemIcon>
      <ListItemText primary={children} />
    </ListItem>
  );
};

export default PrivacyPolicy;
