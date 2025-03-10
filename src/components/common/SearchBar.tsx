import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

interface SearchBarProps {
  onClose?: () => void;
  placeholder?: string;
  fullWidth?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onClose,
  placeholder = "Search for articles, topics, and more...",
  fullWidth = true,
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      if (onClose) onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        component="form"
        onSubmit={handleSearch}
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          width: fullWidth ? "100%" : "auto",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 0.5,
        }}
      >
        <TextField
          autoFocus
          fullWidth
          variant="standard"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            disableUnderline: true,
            sx: { px: 1 },
          }}
        />

        {query && (
          <IconButton
            size="small"
            aria-label="clear search"
            onClick={() => setQuery("")}
            edge="end"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}

        {onClose && (
          <IconButton
            color="primary"
            aria-label="close search"
            onClick={onClose}
            edge="end"
            sx={{ ml: 1 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Paper>
    </motion.div>
  );
};

export default SearchBar;
