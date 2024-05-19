import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HomePage = () => {
    return (
        <Container>
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Printing Orders Management System
                </Typography>
                <Typography variant="h5" component="p">
                    Manage your printing orders efficiently.
                </Typography>
            </Box>
        </Container>
    );
};

export default HomePage;
