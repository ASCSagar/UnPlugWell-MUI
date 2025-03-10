import React from "react";
import { motion } from "framer-motion";
import { Box, Container } from "@mui/material";
import Subscribe from "../common/Subscribe";

const SubscriptionSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(236, 72, 153, 0.95) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatedCircle
        position={{ top: -150, left: -150 }}
        size={300}
        animationDelay={0}
      />
      <AnimatedCircle
        position={{ bottom: -100, right: -100 }}
        size={250}
        animationDelay={4}
        scaleAnimation={[1, 0.9, 1]}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Subscribe
            title="Get Weekly Digital Wellbeing Tips"
            subtitle="Join our community and receive exclusive content on mindfulness, digital detox, and balanced technology use."
          />
        </motion.div>
      </Container>
    </Box>
  );
};

interface AnimatedCircleProps {
  position: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  size: number;
  animationDelay?: number;
  scaleAnimation?: number[];
}

const AnimatedCircle = ({
  position,
  size,
  animationDelay = 0,
  scaleAnimation = [1, 1.1, 1],
}: AnimatedCircleProps) => {
  return (
    <Box
      component={motion.div}
      animate={{
        scale: scaleAnimation,
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: animationDelay,
        },
      }}
      sx={{
        position: "absolute",
        ...position,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.1)",
        zIndex: 0,
      }}
    />
  );
};

export default SubscriptionSection;
