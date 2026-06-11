import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
    accessToken: string,
}

const initialState: IInitialState = {
    accessToken: localStorage.getItem("accessToken") ?? ""
}

export const loginRequest = createAsyncThunk<void, { login: string, password: string }>('authSlice/loginRequest', ({ login, password }, thunkObject) => {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            login: login,
            password: password,
        })
    })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            const dispatch = thunkObject.dispatch;
            dispatch(saveAccessToken(result.token))
        })
})


const authSlice = createSlice({
    name: "authSlice",
    initialState,

    reducers: {
        saveAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            localStorage.setItem("accessToken", action.payload);
        },

        loadAccessToken: (state) => {
            const token = localStorage.getItem("accessToken");

            if (token) {
                state.accessToken = token;
            }
        },

        removeAccessToken: (state) => {
            state.accessToken = "";

            localStorage.removeItem("accessToken");
        }
    },

    selectors: {
        accessTokenSelector: (state) => state.accessToken
    }
});

export default authSlice.reducer
export const { saveAccessToken, loadAccessToken, removeAccessToken } = authSlice.actions
export const { accessTokenSelector } = authSlice.selectors