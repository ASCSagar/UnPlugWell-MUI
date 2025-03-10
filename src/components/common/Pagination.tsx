import React from "react";
import {
  Pagination as MuiPagination,
  PaginationProps as MuiPaginationProps,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PaginationProps extends Omit<MuiPaginationProps, "onChange"> {
  currentPage: number;
  totalPages: number;
  basePath: string;
  onChange?: (page: number) => void;
  scrollToTop?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
  onChange,
  scrollToTop = true,
  ...props
}) => {
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (onChange) {
      onChange(page);
    } else {
      // Default behavior: navigate to the new page
      const path = page === 1 ? basePath : `${basePath}/page/${page}`;
      navigate(path);

      // Scroll to top if needed
      if (scrollToTop) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: 2,
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default Pagination;
