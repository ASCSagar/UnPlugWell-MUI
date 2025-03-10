// src/components/common/Card.tsx
import React, { ReactNode } from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  styled,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionCard = styled(motion.div)({
  height: '100%',
  display: 'flex',
});

interface CardProps extends MuiCardProps {
  animated?: boolean;
  hoverEffect?: 'lift' | 'scale' | 'border' | 'none';
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({
  animated = true,
  hoverEffect = 'lift',
  children,
  ...props
}) => {
  // Define animations based on hover effect type
  const getAnimationProps = () => {
    switch (hoverEffect) {
      case 'lift':
        return {
          whileHover: { y: -8, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
          transition: { duration: 0.3 },
        };
      case 'scale':
        return {
          whileHover: { scale: 1.03 },
          transition: { duration: 0.3 },
        };
      case 'border':
        return {
          whileHover: { borderColor: '#9370DB' },
          transition: { duration: 0.3 },
        };
      case 'none':
      default:
        return {};
    }
  };
  
  if (!animated) {
    return <MuiCard {...props}>{children}</MuiCard>;
  }
  
  return (
    <MotionCard {...getAnimationProps()}>
      <MuiCard
        {...props}
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.3s',
          ...(hoverEffect === 'border' && {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'transparent',
          }),
          ...props.sx,
        }}
      >
        {children}
      </MuiCard>
    </MotionCard>
  );
};

export default Card;