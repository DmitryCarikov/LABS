import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [newClient, setNewClient] = useState('');
    const [editClient, setEditClient] = useState(null);
    const [selectedClients, setSelectedClients] = useState([]);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data/clients.json`)
            .then(response => response.json())
            .then(data => setClients(data));
    }, []);

    const handleAddClient = () => {
        const newId = clients.length > 0 ? clients[clients.length - 1].id + 1 : 1;
        const clientToAdd = { id: newId, name: newClient };
        setClients([...clients, clientToAdd]);
        setNewClient('');
    };

    const handleDeleteClients = () => {
        setClients(clients.filter(client => !selectedClients.includes(client.id)));
        setSelectedClients([]);
    };

    const handleEditClients = () => {
        if (selectedClients.length === 1) {
            const clientToEdit = clients.find(client => client.id === selectedClients[0]);
            setEditClient(clientToEdit);
        }
    };

    const handleSaveEditClient = () => {
        setClients(clients.map(client => (client.id === editClient.id ? editClient : client)));
        setEditClient(null);
        setSelectedClients([]);
    };

    const handleSelectClient = (id) => {
        if (selectedClients.includes(id)) {
            setSelectedClients(selectedClients.filter(clientId => clientId !== id));
        } else {
            setSelectedClients([...selectedClients, id]);
        }
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom>Clients</Typography>
            <List>
                {clients.map(client => (
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
                <Dialog open={Boolean(editClient)} onClose={() => setEditClient(null)}>
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
                            onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditClient(null)} color="primary">
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
