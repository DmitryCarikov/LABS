import React from 'react';

const OrderDetails = ({ order }) => {
    return (
        <div>
            <h2>{order.name}</h2>
            <p>{order.description}</p>
            <p>Client: {order.client}</p>
            <p>Status: {order.status}</p>
        </div>
    );
};

export default OrderDetails;
