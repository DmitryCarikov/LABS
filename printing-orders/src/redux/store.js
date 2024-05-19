import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clientsSlice';
import ordersReducer from './ordersSlice';

export const store = configureStore({
    reducer: {
        clients: clientsReducer,
        orders: ordersReducer,
    },
});