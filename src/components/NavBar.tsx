import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Home as HomeIcon,
    People as PeopleIcon,
    RestaurantMenu as MenuFoodIcon,
    ShoppingCart as OrderIcon,
    Menu as MenuIcon,
    Close as CloseIcon
} from '@mui/icons-material';

const Navbar = () => {
    const theme = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Home', icon: <HomeIcon /> },
        { path: '/users', label: 'User', icon: <PeopleIcon /> },
        { path: '/products', label: 'Menu', icon: <MenuFoodIcon /> },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const isActivePath = (path: string) => {
        return location.pathname === path;
    };

    const drawerContent = (
        <Box sx={{ width: 280, height: '100%', bgcolor: '#ffffff' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid #ffebe5'
            }}>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    onClick={handleDrawerToggle}
                    sx={{
                        fontWeight: 700,
                        color: '#ff6b35',
                        textDecoration: 'none'
                    }}
                >
                    Food Ordering
                </Typography>
                <IconButton onClick={handleDrawerToggle} sx={{ color: '#ff6b35' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <List sx={{ pt: 2 }}>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to={item.path}
                            onClick={handleDrawerToggle}
                            sx={{
                                py: 1.5,
                                backgroundColor: isActivePath(item.path)
                                    ? 'rgba(255, 107, 53, 0.1)'
                                    : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 107, 53, 0.05)',
                                },
                                borderLeft: isActivePath(item.path)
                                    ? '4px solid #ff6b35'
                                    : '4px solid transparent',
                            }}
                        >
                            <ListItemIcon sx={{
                                color: isActivePath(item.path) ? '#ff6b35' : '#4a5568',
                                minWidth: 40
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                sx={{
                                    color: isActivePath(item.path) ? '#ff6b35' : '#4a5568',
                                    '& .MuiTypography-root': {
                                        fontWeight: isActivePath(item.path) ? 600 : 400,
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}

                <Divider sx={{ my: 2, borderColor: '#ffebe5' }} />
            </List>

            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                borderTop: '1px solid #ffebe5',
                textAlign: 'center'
            }}>
                <Typography variant="caption" color="text.secondary">
                    © 2026 Food Ordering System
                </Typography>
            </Box>
        </Box>
    );

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    background: '#ffffff',
                    boxShadow: '0 2px 10px rgba(255, 107, 53, 0.1)',
                    borderBottom: '1px solid #ffebe5'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
                        {/* Logo */}
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                fontWeight: 700,
                                color: '#ff6b35',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                width: { md: '200px' }
                            }}
                        >
                            Food Ordering System
                        </Typography>

                        {/* Desktop Nav */}
                        {!isMobile && (
                            <>
                                <Box sx={{
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'center',
                                    flex: 1
                                }}>
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.path}
                                            component={RouterLink}
                                            to={item.path}
                                            sx={{
                                                color: isActivePath(item.path) ? '#ff6b35' : '#4a5568',
                                                backgroundColor: isActivePath(item.path)
                                                    ? 'rgba(255, 107, 53, 0.1)'
                                                    : 'transparent',
                                                '&:hover': {
                                                    background: 'rgba(255, 107, 53, 0.05)',
                                                    color: '#ff6b35'
                                                },
                                                fontWeight: isActivePath(item.path) ? 600 : 400,
                                            }}
                                            startIcon={item.icon}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </Box>

                                <Box sx={{ width: { md: '200px' } }} />
                            </>
                        )}

                        {/* Mobile Button */}
                        {isMobile && (
                            <IconButton
                                onClick={handleDrawerToggle}
                                sx={{ color: '#ff6b35', ml: 'auto' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: 280,
                        backgroundColor: '#ffffff'
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Navbar;