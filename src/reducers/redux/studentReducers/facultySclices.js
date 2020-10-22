import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getFaculties = createAsyncThunk(
    "getFaculties",
    async (univId) => {
        const response = await axios.get(`/api/fac/${univId}`);
        return response.data;
    }
);

const facAdapter = createEntityAdapter();

const initialState = facAdapter.getInitialState({
    reqStatus: 'idle',
    error: null
});
export const { actions, reducer } = createSlice({
    name: "universities",
    initialState,
    reducers: {},
    extraReducers: {
        [getFaculties.pending](state, action) {
            state.status = 'pending';
        },
        [getFaculties.fulfilled](state, action) {
            state.status = 'completed';
            const facs = action.payload.map(fac => {
                const { _id, ...rest } = fac;
                return {
                    id: _id,
                    ...rest
                };
            });
            facAdapter.upsertMany(state, facs);
        },
        [getFaculties.rejected](state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    selectAll: getAllFaculties,
    selectById: getfacultyById
} = facAdapter.getSelectors(state => state.faculties);

export const getReqStatus = state => state.reqStatus;
export const getError = state => state.error;
