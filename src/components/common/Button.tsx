import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
} from "@mui/material";
import { motion } from "framer-motion";

// Create a motion-enhanced button
const MotionButton = styled(motion.div)({
  display: "inline-block",
});

interface ButtonProps extends MuiButtonProps {
  animated?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  animated = true,
  children,
  ...props
}) => {
  if (!animated) {
    return <MuiButton {...props}>{children}</MuiButton>;
  }

  return (
    <MotionButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <MuiButton {...props}>{children}</MuiButton>
    </MotionButton>
  );
};

export default Button;
