import React from "react";
import {
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
import { motion } from "framer-motion";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  vertical?: boolean;
  showLabel?: boolean;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  description = "",
  vertical = false,
  showLabel = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [copied, setCopied] = React.useState(false);

  // Encode parameters for sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  // Share links
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const emailShareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareButtons = [
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      url: facebookShareUrl,
      color: "#1877F2",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon />,
      url: twitterShareUrl,
      color: "#1DA1F2",
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      url: linkedInShareUrl,
      color: "#0A66C2",
    },
    {
      name: "Email",
      icon: <EmailIcon />,
      url: emailShareUrl,
      color: "#EA4335",
    },
    {
      name: copied ? "Copied!" : "Copy Link",
      icon: <LinkIcon />,
      action: handleCopyLink,
      color: "#9370DB",
    },
  ];

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      elevation={0}
      sx={{
        display: "inline-flex",
        flexDirection: vertical ? "column" : "row",
        alignItems: "center",
        gap: 1.5,
        p: vertical ? 1.5 : 2,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {showLabel && !vertical && (
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ mr: 1, display: { xs: "none", sm: "block" } }}
        >
          Share:
        </Typography>
      )}

      {showLabel && vertical && (
        <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
          Share
        </Typography>
      )}

      {shareButtons.map((button) => (
        <Tooltip key={button.name} title={button.name} arrow>
          <IconButton
            component={button.action ? "button" : "a"}
            href={button.action ? undefined : button.url}
            onClick={button.action}
            target={button.action ? undefined : "_blank"}
            rel={button.action ? undefined : "noopener noreferrer"}
            aria-label={`Share on ${button.name}`}
            sx={{
              color: button.color,
              bgcolor: `${button.color}10`,
              "&:hover": {
                bgcolor: `${button.color}20`,
              },
            }}
            size={isMobile ? "small" : "medium"}
          >
            {button.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Paper>
  );
};

export default ShareButtons;
