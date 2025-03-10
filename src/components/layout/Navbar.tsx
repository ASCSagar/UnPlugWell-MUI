// src/components/layout/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
  Drawer,
  Button,
  alpha,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { fetchCategories } from '../../services/api';
import { Category } from '../../types';

interface NavbarProps {
  toggleTheme?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      const menuCategories = categoriesData.filter(cat => cat.show_in_menu);
      setCategories(menuCategories);
    };
    
    loadCategories();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  const handleHover = (item: string | null) => {
    setHoveredItem(item);
  };
  
  // Navigation Items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  // Dynamic classes based on scroll state
  const navbarStyles = {
    py: scrolled ? 1 : 1.5,
    transition: 'all 0.3s ease',
    bgcolor: scrolled 
      ? alpha(theme.palette.background.default, theme.palette.mode === 'dark' ? 0.85 : 0.9)
      : 'transparent',
    backdropFilter: scrolled ? 'blur(8px)' : 'none',
    boxShadow: scrolled 
      ? '0 4px 20px rgba(0, 0, 0, 0.08)'
      : 'none',
    borderBottom: scrolled
      ? '1px solid'
      : 'none',
    borderColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.divider, 0.1)
      : alpha(theme.palette.divider, 0.1),
  };
  
  // Logo element
  const Logo = () => (
    <Box
      component={RouterLink}
      to="/"
      sx={{
        textDecoration: 'none',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box 
          component="div" 
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.4rem', md: '1.6rem' },
            letterSpacing: '-0.03em',
            background: 'linear-gradient(90deg, #8b5cf6, #d8b4fe)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box 
            component="span" 
            sx={{ 
              display: 'inline-block',
              mr: 0.5,
              p: 0.5,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #8b5cf6, #d8b4fe)',
              width: { xs: 30, md: 35 },
              height: { xs: 30, md: 35 },
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#fff',
                fontWeight: 900,
              }}
            >
              U
            </Box>
          </Box>
          UnplugWell
        </Box>
      </motion.div>
    </Box>
  );
  
  // Desktop navigation items
  const DesktopNavItems = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {navItems.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
      
      {categories.length > 0 && (
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={() => handleHover('categories')}
          onMouseLeave={() => handleHover(null)}
        >
          <NavItem
            item={{ name: 'Categories', path: '/categories' }}
            isDropdown
          />
          
          <AnimatePresence>
            {hoveredItem === 'categories' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 50,
                  marginTop: '0.5rem',
                  width: 'max-content',
                }}
              >
                <Box
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.background.paper, 0.9)
                      : alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    py: 1,
                    mt: 1,
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.divider, 0.1)
                      : alpha(theme.palette.divider, 0.1),
                  }}
                >
                  {categories.map((category) => (
                    <Box
                      key={category.id}
                      component={RouterLink}
                      to={`/category/${category.slug}`}
                      sx={{
                        display: 'block',
                        px: 3,
                        py: 1.5,
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        },
                        ...(location.pathname === `/category/${category.slug}` && {
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        }),
                      }}
                    >
                      {category.name}
                    </Box>
                  ))}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      )}
    </Box>
  );
  
  // Individual nav item component
  interface NavItemProps {
    item: {
      name: string;
      path: string;
    };
    isDropdown?: boolean;
  }
  
  const NavItem: React.FC<NavItemProps> = ({ item, isDropdown = false }) => {
    const active = isActiveRoute(item.path);
    
    return (
      <Box
        component={isDropdown ? 'div' : RouterLink}
        to={isDropdown ? undefined : item.path}
        sx={{
          position: 'relative',
          color: active ? 'primary.main' : 'text.primary',
          textDecoration: 'none',
          py: 1.5,
          px: 2,
          fontWeight: 500,
          fontSize: '0.95rem',
          borderRadius: '8px',
          transition: 'all 0.2s',
          '&:hover': {
            color: 'primary.main',
            bgcolor: alpha(theme.palette.primary.main, 0.05),
          },
          ...(active && {
            fontWeight: 600,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
          }),
        }}
      >
        {item.name}
        
        {active && (
          <Box
            component={motion.div}
            layoutId="activeIndicator"
            sx={{
              position: 'absolute',
              left: '0',
              right: '0',
              bottom: '-2px',
              height: '2px',
              mx: 'auto',
              width: '20px',
              borderRadius: '1px',
              bgcolor: 'primary.main',
              boxShadow: '0 0 8px rgba(139, 92, 246, 0.5)',
            }}
          />
        )}
        
        {isDropdown && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: 0,
              height: 0,
              ml: 0.5,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: `4px solid ${active ? theme.palette.primary.main : theme.palette.text.primary}`,
              transition: 'transform 0.2s',
              transform: hoveredItem === 'categories' ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      </Box>
    );
  };
  
  return (
    <AppBar position="fixed" elevation={0} sx={{ ...navbarStyles }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && <DesktopNavItems />}
            
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              {/* Theme toggle button */}
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{
                  ml: 1,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  width: 36,
                  height: 36,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                {theme.palette.mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
              
              {isMobile && (
                <IconButton
                  onClick={toggleMobileMenu}
                  color="primary"
                  sx={{
                    ml: 1,
                    bgcolor: mobileMenuOpen ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
      
      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        PaperProps={{
          sx: {
            width: '280px',
            bgcolor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.95)
              : alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(10px)',
            px: 2,
            py: 4,
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, px: 2 }}>
          <Logo />
          <IconButton onClick={toggleMobileMenu} edge="end" sx={{ color: 'text.primary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List sx={{ px: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
              <Button
                component={RouterLink}
                to={item.path}
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  px: 2,
                  borderRadius: '8px',
                  color: isActiveRoute(item.path) ? 'primary.main' : 'text.primary',
                  bgcolor: isActiveRoute(item.path) ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  fontWeight: isActiveRoute(item.path) ? 600 : 500,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {item.name}
              </Button>
            </ListItem>
          ))}
          
          {categories.length > 0 && (
            <>
              <Box sx={{ px: 2, py: 1.5, color: 'text.secondary', fontWeight: 600, fontSize: '0.85rem' }}>
                CATEGORIES
              </Box>
              {categories.map((category) => (
                <ListItem key={category.id} disablePadding sx={{ mb: 0.5 }}>
                  <Button
                    component={RouterLink}
                    to={`/category/${category.slug}`}
                    fullWidth
                    sx={{
                      justifyContent: 'flex-start',
                      py: 1.5,
                      px: 2,
                      borderRadius: '8px',
                      color: location.pathname === `/category/${category.slug}` ? 'primary.main' : 'text.primary',
                      bgcolor: location.pathname === `/category/${category.slug}` ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                      fontWeight: location.pathname === `/category/${category.slug}` ? 600 : 500,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    {category.name}
                  </Button>
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;