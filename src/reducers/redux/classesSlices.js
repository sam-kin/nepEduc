import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import axios from 'axios';

const getClasses = createAsyncThunk(
    "getClasses",
    async () => {
        const response = await axios.get("/api/classes/get_all");
        return response.data;
    }
);

const classesAdapter = createEntityAdapter({});

const initialState = classesAdapter.getInitialState({
    error: null,
    status: 'idle'
});

export const {actions, reducer} = createSlice({
    name: 'classes',
    initialState,
    reducers: {},
    extraReducers: {
        [getClasses.pending](state, action){
            state.status = 'pending';
        },
        [getClasses.fulfilled](state, action){
            state.status = 'completed';
            console.log(action.payload);
        },
        [getClasses.failed](state, action){
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});


export const {
    selectAll: getAllClasses,
    selectById: getClassById,
} = classesAdapter.getSelectors(state => state.classes);