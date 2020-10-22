import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getDepartment = createAsyncThunk(
    "getDepartment",
    async (facId) => {
        const response = await axios.get(`/api/depart/${facId}`);
        return response.data;
    }
);

const departAdapter = createEntityAdapter();

const initialState = departAdapter.getInitialState({
    reqStatus: 'idle',
    error: null
});
export const { actions, reducer } = createSlice({
    name: "universities",
    initialState,
    reducers: {},
    extraReducers: {
        [getDepartment.pending](state, action) {
            state.status = 'pending';
        },
        [getDepartment.fulfilled](state, action) {
            state.status = 'completed';
            const departs = action.payload.map(depart => {
                const { _id, ...rest } = depart;
                return {
                    id: _id,
                    ...rest
                };
            });
            departAdapter.upsertMany(state, departs);
        },
        [getDepartment.rejected](state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    selectAll: getAllDepartments,
    selectById: getDepartmentsById
} = departAdapter.getSelectors(state => state.departments);

export const getReqStatus = state => state.reqStatus;
export const getError = state => state.error;
