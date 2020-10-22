import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getUniversities = createAsyncThunk(
    "getUniversities",
    async () => {
        const response = await axios.get('/api/univ');
        return response.data;
    }
);

const univAdapter = createEntityAdapter();

const initialState = univAdapter.getInitialState({
    reqStatus: 'idle',
    error: null
});
export const { actions, reducer } = createSlice({
    name: "universities",
    initialState,
    reducers: {},
    extraReducers: {
        [getUniversities.pending](state, action) {
            state.status = 'pending';
        },
        [getUniversities.fulfilled](state, action) {
            state.status = 'completed';
            const univs = action.payload.map(univ => {
                const { _id, ...rest } = univ;
                return {
                    id: _id,
                    ...rest
                };
            });
            univAdapter.upsertMany(state, univs);
        },
        [getUniversities.rejected](state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    selectAll: getAllUniversities,
    selectById: getUniversityById
} = univAdapter.getSelectors(state => state.universities);

export const getReqStatus = state => state.reqStatus;
export const getError = state => state.error;
