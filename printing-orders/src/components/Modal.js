import React from 'react';
import OrderDetails from './OrderDetails';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ order, onClose }) => {
    return (
        <Dialog open={Boolean(order)} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Order Details
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <OrderDetails order={order} />
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
