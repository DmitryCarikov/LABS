import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotFoundPage = () => {
    return (
        <Container>
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    ERROR 404 NOT FOUND
                </Typography>
            </Box>
        </Container>
    );
};

export default NotFoundPage;