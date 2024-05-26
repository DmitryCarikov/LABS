import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { fetchMachines, createMachine, deleteMachine, updateMachine } from '../redux/slices/machines';
import { Grid, Card, CardContent, Typography, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from '../redux/axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EquipmentAdminPage = () => {
    const dispatch = useDispatch();
    const machines = useSelector(state => state.machines.machines);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [currentMachine, setCurrentMachine] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const { control, handleSubmit, reset } = useForm();

    useEffect(() => {
        dispatch(fetchMachines());
    }, [dispatch]);

    const handleOpenEditDialog = (machine) => {
        setCurrentMachine(machine);
        setOpenEditDialog(true);
        reset(machine);
    };

    const handleDelete = (id) => {
        dispatch(deleteMachine(id));
        toast.success('Machine deleted successfully!');
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setCurrentMachine(null);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        reset();
    };

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const uploadImage = async (formData) => {
        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    };

    const handleCreateOrUpdateMachine = async (data, isCreate) => {
        let machineData = isCreate ? data : { ...currentMachine, ...data };

        if (imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);
            const uploadedImageData = await uploadImage(formData);
            if (uploadedImageData && uploadedImageData.url) {
                machineData = { ...machineData, imageUrl: `${window.location.protocol}//localhost:4444${uploadedImageData.url}` };
            }
        }

        if (isCreate) {
            dispatch(createMachine(machineData));
            handleCloseCreateDialog();
            toast.success('Machine created successfully!');
        } else {
            dispatch(updateMachine({ id: currentMachine._id, updatedData: machineData }));
            handleCloseEditDialog();
            toast.success('Machine updated successfully!');
        }
        setImageFile(null); // Reset the image file after handling
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        doc.text('Machine Report', 20, 10);
        const tableColumn = ['Name', 'Model', 'Condition'];
        const tableRows = [];

        machines.forEach(machine => {
            const machineData = [
                machine.name,
                machine.model,
                machine.condition,
            ];
            tableRows.push(machineData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.save('machine_report.pdf');
    };

    const generateExcelReport = () => {
        const worksheet = XLSX.utils.json_to_sheet(machines.map(machine => ({
            Name: machine.name,
            Model: machine.model,
            Condition: machine.condition,
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Machines');
        XLSX.writeFile(workbook, 'machine_report.xlsx');
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Управление оборудованием</Typography>
            <Button color="primary" onClick={handleOpenCreateDialog}>Добавить оборудование</Button>
            <Button color="primary" onClick={generatePDFReport}>Generate PDF Report</Button>
            <Button color="primary" onClick={generateExcelReport}>Generate Excel Report</Button>
            <Grid container spacing={3}>
                {machines.map(machine => (
                    <Grid item key={machine._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="240"
                                image={machine.imageUrl || 'default_machine_image.jpg'}
                                alt={machine.name}
                            />
                            <CardContent>
                                <Typography variant="h5">{machine.name}</Typography>
                                <Typography variant="body1">{machine.model}</Typography>
                                <Typography variant="body2">{machine.condition}</Typography>
                                <Button color="primary" onClick={() => handleOpenEditDialog(machine)}>Изменить</Button>
                                <Button color="secondary" onClick={() => handleDelete(machine._id)}>Удалить</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for Creating a New Machine */}
            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
                <DialogTitle>Добавить новое оборудование</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit((data) => handleCreateOrUpdateMachine(data, true))}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} autoFocus margin="dense" label="Имя" type="text" fullWidth variant="standard" />}
                        />
                        <Controller
                            name="model"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} margin="dense" label="Модель" type="text" fullWidth variant="standard" />}
                        />
                        <Controller
                            name="condition"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} margin="dense" label="Состояние" type="text" fullWidth variant="standard" />}
                        />
                        <TextField type="file" margin="dense" fullWidth variant="standard" onChange={handleFileChange} />
                        <DialogActions>
                            <Button onClick={handleCloseCreateDialog}>Отмена</Button>
                            <Button type="submit">Создать</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Dialog for Editing a Machine */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Изменить оборудование</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit((data) => handleCreateOrUpdateMachine(data, false))}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} autoFocus margin="dense" label="Имя" type="text" fullWidth variant="standard" />}
                        />
                        <Controller
                            name="model"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} margin="dense" label="Модель" type="text" fullWidth variant="standard" />}
                        />
                        <Controller
                            name="condition"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} margin="dense" label="Состояние" type="text" fullWidth variant="standard" />}
                        />
                        <TextField type="file" margin="dense" fullWidth variant="standard" onChange={handleFileChange} />
                        <DialogActions>
                            <Button onClick={handleCloseEditDialog}>Отмена</Button>
                            <Button type="submit">Сохранить</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <ToastContainer />
        </div>
    );
};

export default EquipmentAdminPage;
