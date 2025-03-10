import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  useTheme,
  useMediaQuery,
  ButtonBase,
} from "@mui/material";
import { motion } from "framer-motion";
import { TableOfContentsItem } from "../../types";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  title?: string;
  sticky?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  title = "Table of Contents",
  sticky = true,
}) => {
  const [activeId, setActiveId] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    // Observe all section headings
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Cleanup
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        position: sticky && !isMobile ? "sticky" : "static",
        top: sticky && !isMobile ? 100 : "auto",
        maxHeight: sticky && !isMobile ? "calc(100vh - 150px)" : "auto",
        overflowY: sticky && !isMobile ? "auto" : "visible",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.light",
          borderRadius: "3px",
        },
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>

      <List disablePadding sx={{ my: 1 }}>
        {items.map((item) => (
          <ListItem
            component="li"
            key={item.id}
            disableGutters
            sx={{
              pl: (item.level - 1) * 2,
              borderLeft: "2px solid",
              borderLeftColor:
                activeId === item.id ? "primary.main" : "transparent",
              backgroundColor:
                activeId === item.id ? "primary.light" : "transparent",
              borderRadius: "0 8px 8px 0",
              mb: 0.5,
              transition: "all 0.2s ease",
              ":hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            <ButtonBase
              onClick={() => handleClick(item.id)}
              sx={{ width: "100%", textAlign: "left" }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: activeId === item.id ? 600 : 400,
                  color: activeId === item.id ? "primary.main" : "text.primary",
                  fontSize: 16 - (item.level - 1) * 1, // Decrease font size based on heading level
                }}
              />
            </ButtonBase>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TableOfContents;
