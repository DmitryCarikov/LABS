import React from 'react';
import OrderDetails from './OrderDetails';

const Modal = ({ order, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <OrderDetails order={order} />
            </div>
        </div>
    );
};

export default Modal;