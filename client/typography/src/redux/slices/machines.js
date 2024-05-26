import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchMachines = createAsyncThunk('machines/fetchMachines', async () => {
    const { data } = await axios.get('/machine');
    return data;
});

export const fetchMachineById = createAsyncThunk('machines/fetchMachineById', async (id) => {
    const { data } = await axios.get(`/machine/${id}`);
    return data;
});

export const createMachine = createAsyncThunk('machines/createMachine', async (machineData) => {
    const { data } = await axios.post('/machine/create', machineData);
    return data;
});

export const updateMachine = createAsyncThunk('machines/updateMachine', async ({ id, updatedData }) => {
    const { data } = await axios.patch(`/machine/${id}/update`, updatedData);
    return data;
});

export const deleteMachine = createAsyncThunk('machines/deleteMachine', async (id) => {
    await axios.delete(`/machine/${id}/delete`);
    return id;
});

const initialState = {
    machines: [],
    currentMachine: null,
    status: 'idle',
    error: null
};

const machinesSlice = createSlice({
    name: 'machines',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMachines.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchMachines.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.machines = action.payload;
        })
        .addCase(fetchMachines.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchMachineById.pending, (state) => {
            state.currentMachine = null;
            state.status = 'loading';
        })
        .addCase(fetchMachineById.fulfilled, (state, action) => {
            state.currentMachine = action.payload;
            state.status = 'succeeded';
        })
        .addCase(fetchMachineById.rejected, (state, action) => {
            state.currentMachine = null;
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(createMachine.fulfilled, (state, action) => {
            state.machines.push(action.payload);
        })
        .addCase(updateMachine.fulfilled, (state, action) => {
            const index = state.machines.findIndex(machine => machine._id === action.payload._id);
            if (index !== -1) {
                state.machines[index] = action.payload;
            }
        })
        .addCase(deleteMachine.fulfilled, (state, action) => {
            state.machines = state.machines.filter(machine => machine._id !== action.payload);
        });
    }
});

export const machinesReducer = machinesSlice.reducer;
