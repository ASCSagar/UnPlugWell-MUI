import React from "react";
import { Box, Typography, Grid, Paper, Avatar, Divider } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/Seo";
import Subscribe from "../components/common/Subscribe";

const AboutPage = () => {
  const team = [
    {
      id: 1,
      name: "Mathew Taylor",
      role: "Founder & Editor",
      bio: "Mathew is a digital wellbeing advocate and writer who helps people find balance in their tech-driven lives. With over 10 years of experience in mindfulness and productivity coaching, he founded UnplugWell to share practical strategies for healthier relationships with technology.",
      avatar: "https://source.unsplash.com/random/400x400/?portrait-man-1",
    },
    {
      id: 4,
      name: "Amelia Liam",
      role: "Content Director",
      bio: "Amelia specializes in workplace wellness and digital balance strategies for professionals. As a certified career coach and corporate consultant, she helps individuals and organizations implement healthier tech habits that boost both wellbeing and performance.",
      avatar: "https://source.unsplash.com/random/400x400/?portrait-woman-1",
    },
    {
      id: 3,
      name: "Emma Oliver",
      role: "Health & Wellness Editor",
      bio: "Emma is a health researcher and writer focused on the intersection of technology use and mental health. Her evidence-based approach helps readers make informed decisions about their digital habits to support overall wellbeing.",
      avatar: "https://source.unsplash.com/random/400x400/?portrait-woman-2",
    },
  ];

  return (
    <Layout>
      <Seo
        title="About Us | UnplugWell - Your Digital Detox Partner"
        description="Learn about UnplugWell, your trusted source for digital detox solutions. Our mission is to help you create a healthier relationship with technology and embrace mindful living."
        canonicalUrl="/about"
      />
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            About UnplugWell
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Helping you find balance in a digital world
          </Typography>
        </Box>

        <Grid container spacing={5} sx={{ mb: 8 }}>
          <Grid
            item
            xs={12}
            md={6}
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography variant="h4" gutterBottom fontWeight={600}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At UnplugWell, we believe technology should enhance our lives, not
              control them. Founded in 2023, our mission is to help people
              develop a healthier relationship with their digital devices
              through mindful practices, expert insights, and practical
              strategies.
            </Typography>
            <Typography variant="body1" paragraph>
              In today's hyper-connected world, finding moments to disconnect
              has become increasingly challenging yet vital for our mental
              wellbeing, productivity, and relationships. We provide resources
              to help you regain control over your digital habits and create
              space for what truly matters.
            </Typography>
            <Typography variant="body1">
              Whether you're looking to reduce screen time, combat digital
              burnout, or simply find more balance in your tech use, UnplugWell
              offers guidance without judgment. We celebrate the benefits of
              technology while advocating for mindful consumption and regular
              digital breaks.
            </Typography>
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
            <Box
              component="img"
              src="https://source.unsplash.com/random/600x400/?digital-detox,mindfulness"
              alt="Digital wellbeing"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 4,
                boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight={600}
            textAlign="center"
            sx={{ mb: 5 }}
          >
            Meet Our Team
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
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Typography variant="h5" component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary.main"
                    gutterBottom
                    fontWeight={500}
                  >
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 8 }} />

        <Subscribe />
      </Box>
    </Layout>
  );
};

export default AboutPage;
