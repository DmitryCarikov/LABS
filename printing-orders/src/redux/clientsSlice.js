import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchClients = createAsyncThunk(
    'clients/fetchClients',
    async () => {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/clients.json`);
        const data = await response.json();
        return data;
    }
);

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        list: [],
        selectedClients: [],
        editClient: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        addClient: (state, action) => { state.list.push(action.payload); },
        deleteClients: (state, action) => {
            state.list = state.list.filter(client => !action.payload.includes(client.id));
        },
        setSelectedClients: (state, action) => { state.selectedClients = action.payload; },
        setEditClient: (state, action) => { state.editClient = action.payload; },
        saveEditClient: (state, action) => {
            const index = state.list.findIndex(client => client.id === action.payload.id);
            if (index !== -1) state.list[index] = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {
    addClient,
    deleteClients,
    setSelectedClients,
    setEditClient,
    saveEditClient,
} = clientsSlice.actions;

export default clientsSlice.reducer;
