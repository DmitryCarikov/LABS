import React from 'react';
import { Container, Typography } from '@mui/material';

const ReportsPage = () => {
    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                Reports
            </Typography>
            <Typography variant="body1" component="p">
                View and analyze your reports here.
            </Typography>
        </Container>
    );
};

export default ReportsPage;
