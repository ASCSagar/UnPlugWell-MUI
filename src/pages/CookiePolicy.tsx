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
import CookieIcon from "@mui/icons-material/Cookie";
import StorageIcon from "@mui/icons-material/Storage";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  index: number;
}

const CookiePolicy = () => {
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
        title="Cookie Policy | UnplugWell - Your Digital Detox Partner"
        description="Learn about UnplugWell, your trusted source for digital detox solutions. Our mission is to help you create a healthier relationship with technology and embrace mindful living."
        canonicalUrl="/cookie-policy"
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
                Cookie Policy
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
                This Cookie Policy explains how UnplugWell uses cookies and
                similar technologies to recognize you when you visit our
                website. It explains what these technologies are, why we use
                them, and your rights to control our use of them.
              </Typography>
            </Box>
          </MotionPaper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SectionCard
                title="1. Introduction"
                icon={<InfoIcon fontSize="large" />}
                index={0}
              >
                <Typography paragraph>
                  UnplugWell.com (hereinafter referred to as "the Site," "we,"
                  "us," or "our") uses cookies and other similar technologies to
                  enhance your browsing experience. This Cookie Policy explains
                  what cookies are, how we use them, and your choices regarding
                  cookies.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="2. What Are Cookies?"
                icon={<CookieIcon fontSize="large" />}
                index={1}
              >
                <Typography paragraph>
                  Cookies are small text files that are placed on your computer
                  or mobile device when you visit a website. They are widely
                  used to make websites work more efficiently, as well as to
                  provide information to the website owners.
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.info.light, 0.1),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <strong>Did you know?</strong> The name "cookie" comes from
                    "magic cookie," a term for a packet of data that a computer
                    receives and then sends back without changing or altering
                    it.
                  </Typography>
                </Box>
              </SectionCard>
            </Grid>

            <Grid item xs={12}>
              <SectionCard
                title="3. How We Use Cookies"
                icon={<CategoryIcon fontSize="large" />}
                index={2}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                      >
                        Essential Cookies:
                      </Typography>
                      <Typography sx={{ pl: 2 }}>
                        These cookies are necessary for the operation of our
                        Site. They enable you to navigate the Site and use its
                        features.
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                      >
                        Analytics Cookies:
                      </Typography>
                      <Typography sx={{ pl: 2 }}>
                        We use analytics cookies, such as those provided by
                        Google Analytics, to collect information about how
                        visitors use our Site. This helps us analyze website
                        traffic and improve our Site's performance. These
                        cookies collect information in an anonymous form,
                        including the number of visitors, where visitors have
                        come to the Site from, and the pages they visited.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                      >
                        Functionality Cookies:
                      </Typography>
                      <Typography sx={{ pl: 2 }}>
                        These cookies allow our Site to remember choices you
                        make (such as your language preference) and provide
                        enhanced features.
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                      >
                        Third-Party Cookies:
                      </Typography>
                      <Typography sx={{ pl: 2 }}>
                        We may also use third-party cookies, such as those from
                        social media platforms or advertising networks, to
                        provide certain features or to display targeted
                        advertisements.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="4. Types of Cookies We Use"
                icon={<StorageIcon fontSize="large" />}
                index={3}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.6),
                      boxShadow: `0 1px 3px ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, fontSize: "1rem" }}
                    >
                      Session Cookies:
                    </Typography>
                    <Typography>
                      These are temporary cookies that are stored in your
                      browser's memory and are deleted when you close your
                      browser.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.6),
                      boxShadow: `0 1px 3px ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, fontSize: "1rem" }}
                    >
                      Persistent Cookies:
                    </Typography>
                    <Typography>
                      These cookies remain on your device for a longer period or
                      until you delete them.
                    </Typography>
                  </Box>
                </Box>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="5. Your Cookie Choices"
                icon={<SettingsIcon fontSize="large" />}
                index={4}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Browser Settings:
                </Typography>
                <Typography paragraph sx={{ pl: 2, mb: 2 }}>
                  You can control and manage cookies through your browser
                  settings. Most browsers allow you to block or delete cookies.
                  However, please note that blocking cookies may affect your
                  ability to use certain features of our Site.
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Opt-Out Tools:
                </Typography>
                <Typography paragraph sx={{ pl: 2, mb: 2 }}>
                  Some third-party services provide opt-out tools that allow you
                  to disable their cookies. For example, you can opt-out of
                  Google Analytics by installing the Google Analytics Opt-out
                  Browser Add-on.
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Cookie Consent Banner:
                </Typography>
                <Typography paragraph sx={{ pl: 2 }}>
                  Upon your first visit to our site, you will be presented with
                  a cookie consent banner, that allows you to accept or deny the
                  use of non-essential cookies.
                </Typography>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="6. Third-Party Cookies"
                icon={<IntegrationInstructionsIcon fontSize="large" />}
                index={5}
              >
                <Typography paragraph>
                  We may use third-party services that set cookies on our Site.
                  We do not have control over these cookies, and we encourage
                  you to review the cookie policies of these third parties.
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.warning.light, 0.1),
                    border: `1px solid ${alpha(
                      theme.palette.warning.main,
                      0.2
                    )}`,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <strong>Note:</strong> Third-party cookies may track your
                    browsing activity across different websites. We recommend
                    reviewing the privacy policies of these third-party services
                    if you have concerns about your online privacy.
                  </Typography>
                </Box>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard
                title="7. Contact Us"
                icon={<ContactSupportIcon fontSize="large" />}
                index={6}
              >
                <Typography paragraph>
                  If you have any questions or concerns about our Cookie Policy,
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

export default CookiePolicy;
