import React, { useState, useEffect } from 'react';
import Modal from './Modal';
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
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li
                        key={order.id}
                        onClick={() => handleOrderClick(order)}
                        className={selectedOrders.includes(order.id) ? 'selected' : ''}
                    >
                        <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                        />
                        {order.name}
                    </li>
                ))}
            </ul>
            {selectedOrder && <Modal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
            
            <h3>Add New Order</h3>
            <input
                type="text"
                placeholder="Name"
                value={newOrder.name}
                onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={newOrder.description}
                onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })}
            />
            <input
                type="text"
                placeholder="Client"
                value={newOrder.client}
                onChange={(e) => setNewOrder({ ...newOrder, client: e.target.value })}
            />
            <input
                type="text"
                placeholder="Status"
                value={newOrder.status}
                onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
            />
            <button onClick={handleAddOrder}>Add Order</button>

            <button onClick={handleEditOrders} disabled={selectedOrders.length !== 1}>
                Edit Selected Order
            </button>
            <button onClick={handleDeleteOrders} disabled={selectedOrders.length === 0}>
                Delete Selected Orders
            </button>

            {editOrder && (
                <div>
                    <h3>Edit Order</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editOrder.name}
                        onChange={(e) => setEditOrder({ ...editOrder, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={editOrder.description}
                        onChange={(e) => setEditOrder({ ...editOrder, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Client"
                        value={editOrder.client}
                        onChange={(e) => setEditOrder({ ...editOrder, client: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        value={editOrder.status}
                        onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                    />
                    <button onClick={handleSaveEditOrder}>Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default OrderList;
