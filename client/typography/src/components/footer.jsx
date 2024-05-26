import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import logo from '../../src/media/logo.png';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: '#2E3B55', py: 6, color: 'white' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={4}>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <img src={logo} alt="Logo" style={{ marginRight: '10px', height: '100px' }} />
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Типография
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">
                            Телефон: +375 (29) 123-45-67
                        </Typography>
                        <Typography variant="body1">
                            Email: typograph@example.com
                        </Typography>
                        <Typography variant="body1">
                            Рабочее время: Пн-Пт 9:00 - 18:00
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">
                            Адрес: ул. Принтерная, 52, Могилев, Беларусь
                        </Typography>
                        <Link href="https://github.com/DmitryCarikov" target="_blank" rel="noopener" color="inherit">
                            GitHub
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;
