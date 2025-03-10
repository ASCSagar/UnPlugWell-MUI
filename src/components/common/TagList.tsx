// src/components/common/TagList.tsx
import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Tag } from '../../types';

interface TagListProps {
  tags: Tag[];
  showLabel?: boolean;
  size?: 'small' | 'medium';
  color?: 'default' | 'primary' | 'secondary';
  maxTags?: number;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  showLabel = false,
  size = 'small',
  color = 'default',
  maxTags = tags.length,
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }
  
  const displayTags = tags.slice(0, maxTags);
  const hasMoreTags = tags.length > maxTags;
  
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
      {showLabel && (
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          Tags:
        </Typography>
      )}
      
      {displayTags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          component={RouterLink}
          to={`/tag/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
          clickable
          size={size}
          color={color}
          sx={{
            borderRadius: '4px',
            '&:hover': {
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
          }}
        />
      ))}
      
      {hasMoreTags && (
        <Chip
          label={`+${tags.length - maxTags} more`}
          size={size}
          color="default"
          variant="outlined"
          sx={{ borderRadius: '4px' }}
        />
      )}
    </Box>
  );
};

export default TagList;