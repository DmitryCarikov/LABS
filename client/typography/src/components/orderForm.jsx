import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../redux/slices/orders';
import { Box, TextField, Button, InputLabel, Typography } from '@mui/material';
import axios from '../redux/axios';

const OrderForm = () => {
    const dispatch = useDispatch();
    const [orderData, setOrderData] = useState({
        description: '',
        status: 'pending',
        fileUrl: '',
        price: 0,  // Установка цены по умолчанию в 0
    });
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let fileUrl = '';

        if (file) {
            const formData = new FormData();
            formData.append('file', file); // Поле должно быть 'file'

            try {
                const response = await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                fileUrl = `${window.location.protocol}//localhost:4444${response.data.url}`;
            } catch (error) {
                console.error('Error uploading file:', error);
                return;
            }
        }

        await dispatch(createOrder({ ...orderData, fileUrl }));
        setOrderData({ description: '', status: 'pending', fileUrl: '', price: 0 });
        setFile(null);
    };

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                required
                fullWidth
                multiline
                rows={4}
                id="description"
                label="Описание проблемы"
                name="description"
                value={orderData.description}
                onChange={handleChange}
                margin="normal"
            />
            <Typography variant="h6" margin="normal">
                Цена: {orderData.price} руб.
            </Typography>
            <InputLabel>Файл для печати</InputLabel>
            <TextField
                type="file"
                fullWidth
                margin="normal"
                onChange={handleFileChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Создать заказ
            </Button>
        </Box>
    );
};

export default OrderForm;
