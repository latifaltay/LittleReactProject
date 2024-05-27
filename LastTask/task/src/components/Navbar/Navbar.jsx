import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { setViewMode } from '../../redux/viewModeSlice';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleViewChange = (event, newViewMode) => {
        if (newViewMode !== null) {
            dispatch(setViewMode(newViewMode));
        }
        handleMenuClose();
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Button variant="text" style={{ textDecoration: 'none', color: 'white' }} component={RouterLink} to="/posts">Ana Sayfa</Button>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Little Project
                </Typography>
                <div>
                    <IconButton color="inherit" aria-controls="menu" aria-haspopup="true" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={(event) => handleViewChange(event, 'list')}>Liste Görünümü</MenuItem>
                        <MenuItem onClick={(event) => handleViewChange(event, 'card')}>Kart Görünümü</MenuItem>
                        <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
