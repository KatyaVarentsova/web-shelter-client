import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICreateRequest, IRequest } from "../types/types";

interface IRequestsState {
    requests: IRequest[],
}

const requestsState: IRequestsState = {
    requests: []
}

export const getRequests = createAsyncThunk<IRequest[], void, { rejectValue: string }>('requestsSlice/getRequests', async (_, thunkObject) => {
    const state = thunkObject.getState() as any;
    const token = state.authSlice.accessToken;
    const response = await fetch('http://localhost:3000/api/requests', {
        method: "GET",
        headers: {
            authorization: token
        },
        credentials: "include"
    })
    const result: IRequest[] = await response.json()
    const dispatch = thunkObject.dispatch
    if (result.length === 0) {
        return thunkObject.rejectWithValue('Нет добавленных заявок')
    }
    dispatch(saveRequests(result))
    return result
})

export const createRequest = createAsyncThunk<IRequest, ICreateRequest>('requestsSlice/createRequest', async (request) => {
    const response = await fetch('http://localhost:3000/api/requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    if (!response.ok) {
        throw new Error('Ошибка создания заявки');
    }

    return await response.json();
})

export const deleteRequest = createAsyncThunk<IRequest[], string, { rejectValue: string }>('requestsSlice/deleteRequest', async (id: string, thunkObject) => {
    const state = thunkObject.getState() as any;
    const token = state.authSlice.accessToken;
    const response = await fetch(`http://localhost:3000/api/requests/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        },
        credentials: "include"
    })
    const result: IRequest[] = await response.json()
    const dispatch = thunkObject.dispatch
    if (result.length === 0) {
        return thunkObject.rejectWithValue('Нет добавленных заявок')
    }
    dispatch(saveRequests(result))
    return result
})

const requestsSlice = createSlice({
    name: 'requestsSlice',
    initialState: requestsState,
    reducers: {
        saveRequests: (state, action: PayloadAction<IRequest[]>) => {
            state.requests = [...action.payload]
        },
    },
    selectors: {
        requestsSelector: (state) => state.requests,
    },
})

export default requestsSlice.reducer
export const { saveRequests } = requestsSlice.actions
export const { requestsSelector } = requestsSlice.selectors