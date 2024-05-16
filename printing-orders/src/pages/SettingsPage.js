import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const SettingsPage = () => {
    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                Settings
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
                <TextField label="Username" variant="outlined" fullWidth margin="normal" />
                <TextField label="Email" variant="outlined" fullWidth margin="normal" />
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Save Changes
                </Button>
            </Box>
        </Container>
    );
};

export default SettingsPage;
