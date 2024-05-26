import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMachines } from '../redux/slices/machines';
import { fetchEmployees } from '../redux/slices/employees';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees.employees.slice(0, 4));
    const machines = useSelector(state => state.machines.machines.slice(0, 4));

    useEffect(() => {
        dispatch(fetchEmployees());
        dispatch(fetchMachines());
    }, [dispatch]);

    const renderEmployees = () => (
        <Grid container spacing={2}>
            {employees.map(employee => (
                <Grid item key={employee._id} xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="200"
                            image={employee.imageUrl || 'default_employee_image.jpg'}
                            alt={employee.name}
                        />
                        <CardContent>
                            <Typography variant="h5">{employee.name}</Typography>
                            <Typography variant="body1">{employee.position}</Typography>
                            <Typography variant="body2">{employee.specialization}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    const renderMachines = () => (
        <Grid container spacing={2}>
            {machines.map(machine => (
                <Grid item key={machine._id} xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="200"
                            image={machine.imageUrl || 'default_machine_image.jpg'}
                            alt={machine.name}
                        />
                        <CardContent>
                            <Typography variant="h5">{machine.name}</Typography>
                            <Typography variant="body2">Модель: {machine.model}</Typography>
                            <Typography variant="body2">Состояние: {machine.condition}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Добро пожаловать в нашу типографию!
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '2rem' }}>
                Мы обеспечиваем высокое качество печати и надежность вашего производственного процесса.
            </Typography>

            <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
                Наше оборудование
            </Typography>
            {renderMachines()}
            <Typography>
                <Link to='/machines'>
                    Смотреть все
                </Link>
            </Typography>

            <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
                Наши специалисты
            </Typography>
            {renderEmployees()}
            <Typography>
                <Link to='/employees'>
                    Смотреть все
                </Link>
            </Typography>
        </div>
    );
};

export default HomePage;
