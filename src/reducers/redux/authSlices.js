import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    reqStatus: 'idle',
    status: 'unauthenticated',
    isAuth: false,
    user: null,
    error: null
};

export const checkCookie = createAsyncThunk(
    "auth/checkCookie",
    async () => {
        const response = await axios.get('/api/users');
        return response.data;
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data) => {
        const response = await axios.post('/api/users/login', data);
        return response.data;
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data) => {
        const response = await axios.post('/api/users/register', data);
        return response.data;
    }
);

export const configureUser = createAsyncThunk(
    "auth/configureUser",
    async (data, {getState}) => {
        const state = getState();
        const userId = state.auth.user.id;
        const response = await axios.post(`/api/users/config/${userId}`, data);
        return response.data;
    }
);

export const {actions, reducer} = createSlice({
    name: "user",
    initialState,
    reducers: {
        setReqStatus(state, action){
            state.reqStatus = action.payload;
        }
    },
    extraReducers: {
        [registerUser.pending](state){
            state.reqStatus = 'pending';
        },
        [registerUser.fulfilled](state, action){
            console.log(action.payload);
        },
        [registerUser.rejected](state, action){
            state.reqStatus = "failed";
            state.error = action.payload;
            state.user = null;
            state.isAuth = false;
            state.status = "unauthenticated";
        },
        [configureUser.pending](state, action) {
            state.reqStatus = 'pending';
        },
        [configureUser.fulfilled](state, action) {
            state.reqStatus = 'complited';
            state.user = action.payload;
        },
        [configureUser.rejected](state, action) {
            state.reqStatus = 'failed';
            state.error = action.payload;
        },
        [loginUser.pending](state, action) {
            state.reqStatus = "pending";
        },
        [loginUser.fulfilled](state, action) {
            if (action.payload.status === "unauthenticated"){
                state.error = action.payload.info.message;
                state.isAuth = false;
                state.user = null;
                state.status = action.payload.status;
            }else{
                state.error = null;
                state.isAuth = true;
                state.user = action.payload.user;
                state.status = action.payload.status;
            }
            state.reqStatus = "complited";
        },
        [loginUser.rejected](state, action) {
            state.reqStatus = "failed";
            state.error = action.payload;
            state.user = null;
            state.isAuth = false;
            state.status = "unauthenticated";
        },
        [checkCookie.pending](state, action) {
            state.reqStatus = "pending";
        },
        [checkCookie.fulfilled](state, action){
            if (action.payload.user) {
                state.status = action.payload.status;
                state.user = action.payload.user;
                state.isAuth = true;
                state.error = null;
            } else {
                state.error = null;
                state.isAuth = false;
                state.status = action.payload.status;
            }
            state.reqStatus = "complited";
        },
        [checkCookie.rejected](state, action){
            state.status = "unauthenticated";
            state.error = action.payload;
            state.user = null;
            state.reqStatus = "failed";
        }
    }
});

export const Isauthenticated = state => state.auth.isAuth;
export const getReqStatus = state => state.auth.reqStatus;
export const getUser = state => state.auth.user;