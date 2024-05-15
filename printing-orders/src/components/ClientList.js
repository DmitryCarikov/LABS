import React, { useState, useEffect } from 'react';
import '../App.css'; // добавьте стили для выделения

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
        <div>
            <h2>Clients</h2>
            <ul>
                {clients.map(client => (
                    <li
                        key={client.id}
                        className={selectedClients.includes(client.id) ? 'selected' : ''}
                    >
                        <input
                            type="checkbox"
                            checked={selectedClients.includes(client.id)}
                            onChange={() => handleSelectClient(client.id)}
                        />
                        {client.name}
                    </li>
                ))}
            </ul>

            <h3>Add New Client</h3>
            <input
                type="text"
                placeholder="Client Name"
                value={newClient}
                onChange={(e) => setNewClient(e.target.value)}
            />
            <button onClick={handleAddClient}>Add Client</button>

            <button onClick={handleEditClients} disabled={selectedClients.length !== 1}>
                Edit Selected Client
            </button>
            <button onClick={handleDeleteClients} disabled={selectedClients.length === 0}>
                Delete Selected Clients
            </button>

            {editClient && (
                <div>
                    <h3>Edit Client</h3>
                    <input
                        type="text"
                        placeholder="Client Name"
                        value={editClient.name}
                        onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                    />
                    <button onClick={handleSaveEditClient}>Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default ClientList;
