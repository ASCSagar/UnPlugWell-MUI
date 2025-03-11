import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  Container,
  useTheme,
  alpha,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/Seo";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BalanceIcon from "@mui/icons-material/Balance";
import PhoneAndroidOffIcon from "@mui/icons-material/PhoneAndroid";

const team = [
  {
    id: 1,
    name: "Mathew Taylor",
    role: "Founder & Editor",
    bio: "Mathew is a digital wellbeing advocate and writer who helps people find balance in their tech-driven lives. With over 10 years of experience in mindfulness and productivity coaching, he founded UnplugWell to share practical strategies for healthier relationships with technology.",
    avatar: "https://source.unsplash.com/random/400x400/?portrait-man-1",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:mathew@unplugwell.com",
    },
  },
  {
    id: 2,
    name: "Amelia Liam",
    role: "Content Director",
    bio: "Amelia specializes in workplace wellness and digital balance strategies for professionals. As a certified career coach and corporate consultant, she helps individuals and organizations implement healthier tech habits that boost both wellbeing and performance.",
    avatar: "https://source.unsplash.com/random/400x400/?portrait-woman-1",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:amelia@unplugwell.com",
    },
  },
  {
    id: 3,
    name: "Emma Oliver",
    role: "Health & Wellness Editor",
    bio: "Emma is a health researcher and writer focused on the intersection of technology use and mental health. Her evidence-based approach helps readers make informed decisions about their digital habits to support overall wellbeing.",
    avatar: "https://source.unsplash.com/random/400x400/?portrait-woman-2",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:emma@unplugwell.com",
    },
  },
];

const values = [
  {
    title: "Balance",
    description:
      "We believe in the power of technology while advocating for mindful usage and regular digital breaks.",
    icon: <BalanceIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Education",
    description:
      "We provide research-backed resources that empower you to make informed decisions about your digital habits.",
    icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Community",
    description:
      "We foster a judgment-free community where people can share experiences and support each other's digital wellbeing journey.",
    icon: <PeopleAltIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Mindfulness",
    description:
      "We promote intentional technology use that enhances rather than detracts from our lives and relationships.",
    icon: <PhoneAndroidOffIcon sx={{ fontSize: 40 }} />,
  },
];

const AboutPage = () => {
  const theme = useTheme();
  const MotionPaper = motion(Paper);

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <Seo
        title="About Us | UnplugWell - Your Digital Detox Partner"
        description="Learn about UnplugWell, your trusted source for digital detox solutions. Our mission is to help you create a healthier relationship with technology and embrace mindful living."
        canonicalUrl="/about"
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
                About Us
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
                Helping you find balance in a digital world through mindful
                practices and evidence-based strategies.
              </Typography>
            </Box>
          </MotionPaper>
        </Container>
        <Grid container spacing={5} sx={{ mb: 10, alignItems: "center" }}>
          <Grid
            item
            xs={12}
            md={6}
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src="https://unplugwell.com/media/blog/images/Tech-Free_Vacation.jpg"
                alt="Digital wellbeing"
                sx={{
                  width: "100%",
                  height: { xs: 300, md: 400 },
                  objectFit: "cover",
                  borderRadius: 4,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  zIndex: 1,
                  position: "relative",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  border: `2px solid ${theme.palette.primary.main}`,
                  top: 20,
                  left: 20,
                  zIndex: 0,
                }}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Typography
              variant="h3"
              gutterBottom
              fontWeight={700}
              sx={{ color: theme.palette.primary.main }}
            >
              Our Mission
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.1rem", mb: 3 }}
            >
              At UnplugWell, we believe technology should enhance our lives, not
              control them. Founded in 2023, our mission is to help people
              develop a healthier relationship with their digital devices
              through mindful practices, expert insights, and practical
              strategies.
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.1rem", mb: 3 }}
            >
              In today's hyper-connected world, finding moments to disconnect
              has become increasingly challenging yet vital for our mental
              wellbeing, productivity, and relationships. We provide resources
              to help you regain control over your digital habits and create
              space for what truly matters.
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
              Whether you're looking to reduce screen time, combat digital
              burnout, or simply find more balance in your tech use, UnplugWell
              offers guidance without judgment. We celebrate the benefits of
              technology while advocating for mindful consumption and regular
              digital breaks.
            </Typography>
          </Grid>
        </Grid>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ mb: 10 }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 5, color: theme.palette.primary.main }}
          >
            Our Values
          </Typography>

          <Grid container spacing={3}>
            {values.map((value) => (
              <Grid item xs={12} sm={6} md={3} key={value.title}>
                <motion.div variants={itemVariants}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 10px 30px ${alpha(
                          theme.palette.primary.main,
                          0.15
                        )}`,
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 1.5,
                          mb: 2,
                          borderRadius: "50%",
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        {value.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        fontWeight={600}
                        gutterBottom
                      >
                        {value.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 10 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 2, color: theme.palette.primary.main }}
          >
            Meet Our Team
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6, maxWidth: 700, mx: "auto" }}
          >
            Our passionate experts are dedicated to helping you navigate the
            digital world mindfully
          </Typography>

          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid
                item
                xs={12}
                md={4}
                key={member.id}
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: 4,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{
                      width: 150,
                      height: 150,
                      mb: 3,
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                      border: `4px solid ${theme.palette.background.paper}`,
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    fontWeight={700}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 2,
                      fontWeight: 600,
                      pb: 2,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "40px",
                        height: "3px",
                        bgcolor: theme.palette.primary.main,
                        borderRadius: "2px",
                      },
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6 }}
                  >
                    {member.bio}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: "auto" }}>
                    <IconButton
                      aria-label="LinkedIn"
                      sx={{
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        "&:hover": {
                          bgcolor: theme.palette.primary.main,
                          color: "white",
                        },
                      }}
                      size="small"
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Twitter"
                      sx={{
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        "&:hover": {
                          bgcolor: theme.palette.primary.main,
                          color: "white",
                        },
                      }}
                      size="small"
                    >
                      <TwitterIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Email"
                      sx={{
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        "&:hover": {
                          bgcolor: theme.palette.primary.main,
                          color: "white",
                        },
                      }}
                      size="small"
                    >
                      <EmailIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default AboutPage;
