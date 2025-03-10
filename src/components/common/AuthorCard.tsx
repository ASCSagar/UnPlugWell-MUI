import React from 'react';
import { Box, Typography, Avatar, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Author } from '../../types';

// This is mock data since the API doesn't provide detailed author info
const authorDetails: Record<string, {
  bio: string;
  avatar: string;
  expertise: string[];
}> = {
  'Mathew Taylor': {
    bio: 'Mathew is a digital wellbeing advocate and writer who helps people find balance in their tech-driven lives. With over 10 years of experience in mindfulness and productivity coaching, he shares practical strategies for healthier relationships with technology.',
    avatar: 'https://source.unsplash.com/random/400x400/?portrait-man-1',
    expertise: ['Digital Wellbeing', 'Mindfulness', 'Productivity'],
  },
  'Amelia Liam': {
    bio: 'Amelia specializes in workplace wellness and digital balance strategies for professionals. As a certified career coach and corporate consultant, she helps individuals and organizations implement healthier tech habits that boost both wellbeing and performance.',
    avatar: 'https://source.unsplash.com/random/400x400/?portrait-woman-1',
    expertise: ['Career Development', 'Digital Balance', 'Workplace Wellness'],
  },
  'Emma Oliver': {
    bio: 'Emma is a health researcher and writer focused on the intersection of technology use and mental health. Her evidence-based approach helps readers make informed decisions about their digital habits to support overall wellbeing.',
    avatar: 'https://source.unsplash.com/random/400x400/?portrait-woman-2',
    expertise: ['Mental Health', 'Digital Detox', 'Healthy Habits'],
  },
  'Sarah Johnson': {
    bio: 'Sarah is a family therapist and parenting expert who specializes in helping families navigate screen time and build stronger connections through offline activities. Her practical advice is grounded in both clinical experience and personal parenting journey.',
    avatar: 'https://source.unsplash.com/random/400x400/?portrait-woman-3',
    expertise: ['Family Wellness', 'Parenting', 'Screen Time Management'],
  },
  'Michael Chen': {
    bio: 'Michael is a productivity expert and former tech executive who discovered the power of digital minimalism. He now shares strategies for professionals to optimize their relationship with technology while enhancing focus and creativity.',
    avatar: 'https://source.unsplash.com/random/400x400/?portrait-man-2',
    expertise: ['Productivity', 'Digital Minimalism', 'Focus'],
  },
};

// Default author details for authors not in our mock data
const defaultAuthorDetails = {
  bio: 'A digital wellbeing expert who shares insights on balanced technology use and mindful living in the modern world.',
  avatar: 'https://source.unsplash.com/random/400x400/?portrait',
  expertise: ['Digital Wellbeing', 'Mindful Technology'],
};

interface AuthorCardProps {
  author: Author;
  minimal?: boolean;
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  minimal = false
}) => {
  const authorInfo = authorDetails[author.full_name] || defaultAuthorDetails;

  if (minimal) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={authorInfo.avatar}
          alt={author.full_name}
          sx={{ width: 40, height: 40 }}
        />
        <Typography variant="body2" fontWeight={500}>
          {author.full_name}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" component="h3" gutterBottom>
        About the Author
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar
          src={authorInfo.avatar}
          alt={author.full_name}
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="h6" component="div">
            {author.full_name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.75,
              mt: 0.5,
            }}
          >
            {authorInfo.expertise.map((skill, index) => (
              <Typography
                key={index}
                variant="caption"
                component="span"
                sx={{
                  color: 'primary.main',
                  bgcolor: 'primary.light',
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  fontSize: '0.7rem',
                }}
              >
                {skill}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" color="text.secondary">
        {authorInfo.bio}
      </Typography>
    </Paper>
  );
};

export default AuthorCard;