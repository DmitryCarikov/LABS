import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Container, Typography, List, ListItem, ListItemText, Checkbox, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '../App.css'; // добавьте стили для выделения

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editOrder, setEditOrder] = useState(null);
    const [newOrder, setNewOrder] = useState({ name: '', description: '', client: '', status: '' });
    const [selectedOrders, setSelectedOrders] = useState([]);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data/orders.json`)
            .then(response => response.json())
            .then(data => setOrders(data));
    }, []);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleAddOrder = () => {
        const newId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
        const orderToAdd = { ...newOrder, id: newId };
        setOrders([...orders, orderToAdd]);
        setNewOrder({ name: '', description: '', client: '', status: '' });
    };

    const handleDeleteOrders = () => {
        setOrders(orders.filter(order => !selectedOrders.includes(order.id)));
        setSelectedOrders([]);
    };

    const handleEditOrders = () => {
        if (selectedOrders.length === 1) {
            const orderToEdit = orders.find(order => order.id === selectedOrders[0]);
            setEditOrder(orderToEdit);
        }
    };

    const handleSaveEditOrder = () => {
        setOrders(orders.map(order => (order.id === editOrder.id ? editOrder : order)));
        setEditOrder(null);
        setSelectedOrders([]);
    };

    const handleSelectOrder = (id) => {
        if (selectedOrders.includes(id)) {
            setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
        } else {
            setSelectedOrders([...selectedOrders, id]);
        }
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom>Orders</Typography>
            <List>
                {orders.map(order => (
                    <ListItem
                        key={order.id}
                        button
                        onClick={() => handleOrderClick(order)}
                        selected={selectedOrders.includes(order.id)}
                    >
                        <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                        />
                        <ListItemText primary={order.name} />
                    </ListItem>
                ))}
            </List>
            {selectedOrder && <Modal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}

            <Typography variant="h3" gutterBottom>Add New Order</Typography>
            <TextField
                label="Name"
                variant="outlined"
                value={newOrder.name}
                onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                variant="outlined"
                value={newOrder.description}
                onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Client"
                variant="outlined"
                value={newOrder.client}
                onChange={(e) => setNewOrder({ ...newOrder, client: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Status"
                variant="outlined"
                value={newOrder.status}
                onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddOrder}
                fullWidth
                sx={{ mt: 2 }}
            >
                Add Order
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={handleEditOrders}
                disabled={selectedOrders.length !== 1}
                fullWidth
                sx={{ mt: 2 }}
            >
                Edit Selected Order
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleDeleteOrders}
                disabled={selectedOrders.length === 0}
                fullWidth
                sx={{ mt: 2 }}
            >
                Delete Selected Orders
            </Button>

            {editOrder && (
                <Dialog open={Boolean(editOrder)} onClose={() => setEditOrder(null)}>
                    <DialogTitle>Edit Order</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit the details of the order.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            fullWidth
                            value={editOrder.name}
                            onChange={(e) => setEditOrder({ ...editOrder, name: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            fullWidth
                            value={editOrder.description}
                            onChange={(e) => setEditOrder({ ...editOrder, description: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Client"
                            fullWidth
                            value={editOrder.client}
                            onChange={(e) => setEditOrder({ ...editOrder, client: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Status"
                            fullWidth
                            value={editOrder.status}
                            onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditOrder(null)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEditOrder} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default OrderList;
