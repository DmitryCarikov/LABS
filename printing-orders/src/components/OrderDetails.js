import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const OrderDetails = ({ order }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h2" component="div" gutterBottom>
                    {order.name}
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    {order.description}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                    Client: {order.client}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                    Status: {order.status}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default OrderDetails;
