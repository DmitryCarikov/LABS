import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/orders.json`);
        const data = await response.json();
        return data;
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        list: [],
        selectedOrders: [],
        editOrder: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        addOrder: (state, action) => { state.list.push(action.payload); },
        deleteOrders: (state, action) => {
            state.list = state.list.filter(order => !action.payload.includes(order.id));
        },
        setSelectedOrders: (state, action) => { state.selectedOrders = action.payload; },
        setEditOrder: (state, action) => { state.editOrder = action.payload; },
        saveEditOrder: (state, action) => {
            const index = state.list.findIndex(order => order.id === action.payload.id);
            if (index !== -1) state.list[index] = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {
    addOrder,
    deleteOrders,
    setSelectedOrders,
    setEditOrder,
    saveEditOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
