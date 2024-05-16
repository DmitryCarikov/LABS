import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Printing Orders
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/orders">
                        Orders
                    </Button>
                    <Button color="inherit" component={Link} to="/clients">
                        Clients
                    </Button>
                    <Button color="inherit" component={Link} to="/reports">
                        Reports
                    </Button>
                    <Button color="inherit" component={Link} to="/settings">
                        Settings    
                    </Button>
                    <Button color="inherit" component={Link} to="/profile">
                        Profile    
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
