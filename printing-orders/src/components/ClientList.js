import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container, Typography, List, ListItem, ListItemText, Checkbox,
    TextField, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Box
} from '@mui/material';
import {
    fetchClients, addClient, deleteClients, setSelectedClients,
    setEditClient, saveEditClient
} from '../redux/clientsSlice';

const ClientList = () => {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients.list);
    const selectedClients = useSelector(state => state.clients.selectedClients);
    const editClient = useSelector(state => state.clients.editClient);
    const clientStatus = useSelector(state => state.clients.status);
    const error = useSelector(state => state.clients.error);
    const [newClient, setNewClient] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (clientStatus === 'idle') {
            dispatch(fetchClients());
        }
    }, [clientStatus, dispatch]);

    const handleAddClient = () => {
        const newId = clients.length > 0 ? clients[clients.length - 1].id + 1 : 1;
        const clientToAdd = { id: newId, name: newClient };
        dispatch(addClient(clientToAdd));
        setNewClient('');
    };

    const handleDeleteClients = () => {
        dispatch(deleteClients(selectedClients));
        dispatch(setSelectedClients([]));
    };

    const handleEditClients = () => {
        if (selectedClients.length === 1) {
            const clientToEdit = clients.find(client => client.id === selectedClients[0]);
            dispatch(setEditClient(clientToEdit));
        }
    };

    const handleSaveEditClient = () => {
        dispatch(saveEditClient(editClient));
        dispatch(setEditClient(null));
        dispatch(setSelectedClients([]));
    };

    const handleSelectClient = (id) => {
        const newSelectedClients = selectedClients.includes(id)
            ? selectedClients.filter(clientId => clientId !== id)
            : [...selectedClients, id];
        dispatch(setSelectedClients(newSelectedClients));
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h2" gutterBottom>Clients</Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Search Clients"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </Box>
            {clientStatus === 'loading' && <p>Loading...</p>}
            {clientStatus === 'failed' && <p>{error}</p>}
            <List>
                {filteredClients.map(client => (
                    <ListItem
                        key={client.id}
                        dense
                        button
                        onClick={() => handleSelectClient(client.id)}
                        selected={selectedClients.includes(client.id)}
                    >
                        <Checkbox
                            checked={selectedClients.includes(client.id)}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={client.name} />
                    </ListItem>
                ))}
            </List>

            <Typography variant="h3" gutterBottom>Add New Client</Typography>
            <TextField
                label="Client Name"
                variant="outlined"
                value={newClient}
                onChange={(e) => setNewClient(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddClient}
                fullWidth
            >
                Add Client
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={handleEditClients}
                disabled={selectedClients.length !== 1}
                fullWidth
                sx={{ mt: 2 }}
            >
                Edit Selected Client
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClients}
                disabled={selectedClients.length === 0}
                fullWidth
                sx={{ mt: 2 }}
            >
                Delete Selected Clients
            </Button>

            {editClient && (
                <Dialog open={Boolean(editClient)} onClose={() => dispatch(setEditClient(null))}>
                    <DialogTitle>Edit Client</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit the name of the client.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Client Name"
                            fullWidth
                            value={editClient.name}
                            onChange={(e) => dispatch(setEditClient({ ...editClient, name: e.target.value }))}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => dispatch(setEditClient(null))} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEditClient} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default ClientList;
