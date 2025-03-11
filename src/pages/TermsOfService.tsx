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
import BlockIcon from "@mui/icons-material/Block";
import GavelIcon from "@mui/icons-material/Gavel";
import UpdateIcon from "@mui/icons-material/Update";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";
import CopyrightIcon from "@mui/icons-material/Copyright";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  index: number;
}

interface BulletItemProps {
  children: React.ReactNode;
}

const TermsOfService = () => {
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
        title="Terms of Service | UnplugWell - Your Digital Detox Partner"
        description="Learn about UnplugWell, your trusted source for digital detox solutions. Our mission is to help you create a healthier relationship with technology and embrace mindful living."
        canonicalUrl="/terms-of-service"
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
                Terms of Service
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
                These Terms of Service govern your use of UnplugWell.com. By
                accessing our site, you agree to these terms. Please read them
                carefully.
              </Typography>
            </Box>
          </MotionPaper>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SectionCard
                title="1. Acceptance of Terms"
                icon={<GavelIcon fontSize="large" />}
                index={0}
              >
                <Typography paragraph>
                  By accessing and using UnplugWell.com (hereinafter referred to
                  as "the Site," "we," "us," or "our"), you agree to comply with
                  and be bound by these Terms and Conditions. If you do not
                  agree with any part of these terms, you must not use our Site.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="2. Content Ownership and Use"
                icon={<CopyrightIcon fontSize="large" />}
                index={1}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem", mt: 2 }}
                >
                  Content Ownership:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  All content on UnplugWell.com, including but not limited to
                  text, images, graphics, logos, and software, is the property
                  of UnplugWell.com or its licensors and is protected by
                  copyright and other intellectual property laws.
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Permitted Use:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  You may access and use the content on our Site for personal,
                  non-commercial purposes only. You may not reproduce,
                  distribute, modify, or create derivative works from our
                  content without our express written permission.
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  User-Generated Content:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  If you submit comments or other user-generated content, you
                  grant us a non-exclusive, royalty-free, perpetual, and
                  worldwide license to use, reproduce, modify, and distribute
                  that content. You are responsible for ensuring your
                  user-generated content does not violate any third-party rights
                  or applicable laws.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="3. User Conduct"
                icon={<BlockIcon fontSize="large" />}
                index={2}
              >
                <Typography paragraph>
                  Prohibited Activities: You agree not to:
                </Typography>

                <List disablePadding>
                  <BulletItem>
                    Use our Site for any illegal or unauthorized purpose.
                  </BulletItem>
                  <BulletItem>
                    Post or transmit any content that is harmful, offensive,
                    defamatory, or infringing.
                  </BulletItem>
                  <BulletItem>
                    Interfere with or disrupt the operation of our Site.
                  </BulletItem>
                  <BulletItem>
                    Attempt to gain unauthorized access to our systems or user
                    accounts.
                  </BulletItem>
                  <BulletItem>
                    Engage in any activity that could damage or impair our Site.
                  </BulletItem>
                </List>

                <Typography paragraph sx={{ mt: 3 }}>
                  When leaving comments, you agree to remain respectful. Any
                  comments deemed inappropriate will be removed by
                  UnplugWell.com.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="4. Disclaimers"
                icon={<WarningIcon fontSize="large" />}
                index={3}
              >
                <Typography paragraph>
                  The content on UnplugWell.com is provided for informational
                  purposes only and should not be considered professional
                  advice. We make no representations or warranties about the
                  accuracy, completeness, or suitability of the content.
                </Typography>
                <Typography paragraph>
                  We do not guarantee that our Site will be available at all
                  times or that it will be free from errors or viruses.
                </Typography>
                <Typography paragraph>
                  Our Site may contain links to third-party websites. We are not
                  responsible for the content or privacy practices of these
                  websites.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="5. Limitation of Liability"
                icon={<SecurityIcon fontSize="large" />}
                index={4}
              >
                <Typography paragraph>
                  To the fullest extent permitted by law, UnplugWell.com and its
                  affiliates, officers, directors, employees, and agents shall
                  not be liable for any direct, indirect, incidental,
                  consequential, or punitive damages arising out of or related
                  to your use of our Site.
                </Typography>
                <Typography paragraph>
                  You agree to indemnify and hold UnplugWell.com harmless from
                  any claims, damages, or expenses arising out of your use of
                  our Site or your violation of these Terms and Conditions.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="6. Changes to Terms and Conditions"
                icon={<UpdateIcon fontSize="large" />}
                index={5}
              >
                <Typography paragraph>
                  We reserve the right to modify these Terms and Conditions at
                  any time. We will notify you of any changes by posting the new
                  terms on this page.
                </Typography>
                <Typography paragraph>
                  You are advised to review these Terms and Conditions
                  periodically for any changes. Your continued use of our Site
                  after any changes constitutes your acceptance of the new
                  terms.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="7. Contact Us"
                icon={<ContactSupportIcon fontSize="large" />}
                index={6}
              >
                <Typography paragraph>
                  If you have any questions or concerns about these Terms and
                  Conditions, please contact us:
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

export default TermsOfService;
