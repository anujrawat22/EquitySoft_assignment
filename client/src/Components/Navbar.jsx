import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userRole = useSelector(state => state.auth.role);

    const renderNavbar = () => {
        if (isAuthenticated) {
            if (userRole === 'reader') {
                return (
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Blog App
                                </Typography>
                                <Button color="inherit"><Link to="/allposts">All Posts</Link></Button>
                                <LogoutButton />
                            </Toolbar>
                        </AppBar>
                    </Box>
                );
            } else if (userRole === 'author') {
                return (
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Blog App
                            </Typography>
                            <Button color="inherit"><Link to="/addpost">Add New Post</Link></Button>
                            <Button color="inherit"><Link to="/manage">Manage Posts</Link></Button>
                            <LogoutButton />
                            </Toolbar>
                        </AppBar>
                    </Box>
                );
            }
        } else {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Blog App
                            </Typography>
                            <Button color="inherit"><Link to="/login">Login</Link></Button>
                            <Button color="inherit"><Link to="/signup">Signup</Link></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            );
        }
    };

    return <>{renderNavbar()}</>;
};

export default Navbar;
