import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact us
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            About us
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow us on social media
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
