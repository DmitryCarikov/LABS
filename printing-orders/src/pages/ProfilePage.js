import React from 'react';
import { Container, Typography, Avatar, Box } from '@mui/material';

const ProfilePage = () => {
    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
                <Avatar sx={{ width: 100, height: 100, mr: 4 }}>U</Avatar>
                <Box>
                    <Typography variant="h4" component="h2">
                        User Name
                    </Typography>
                    <Typography variant="body1" component="p">
                        Email: user@example.com
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ProfilePage;
