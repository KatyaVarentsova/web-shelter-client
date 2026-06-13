import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPetRow } from "../types/types";

interface IPetsState {
    pets: IPetRow[],
}

const petsTableState: IPetsState = {
    pets: []
}

export const getPetsTable = createAsyncThunk<IPetRow[], string, { rejectValue: string }>('petsTableSlice/getPetsTable', async (category: string, thunkObject) => {
    const state = thunkObject.getState() as any;
    const token = state.authSlice.accessToken;
    const response = await fetch(`http://localhost:3000/api/pets/${category}`, {
        method: "GET",
        headers: {
            authorization: token
        },
        credentials: "include"
    })
    const result: IPetRow[] = await response.json()
    const dispatch = thunkObject.dispatch
    if (result.length === 0) {
        return thunkObject.rejectWithValue('Нет добавленных питомцев')
    }
    dispatch(savePetsTable(result))
    return result
})

interface IDeletePetParams {
    id: string;
    category: string;
}

export const deletePetsTable = createAsyncThunk<IPetRow[], IDeletePetParams, { rejectValue: string }>('petsTableSlice/deletePetsTable', async ({ id, category }, thunkObject) => {
    const state = thunkObject.getState() as any;
    const token = state.authSlice.accessToken;
    const response = await fetch(`http://localhost:3000/api/pets/${category}/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        },
        credentials: "include"
    })
    const result: IPetRow[] = await response.json()
    const dispatch = thunkObject.dispatch
    if (result.length === 0) {
        return thunkObject.rejectWithValue('Нет добавленных питомцев')
    }
    dispatch(savePetsTable(result))
    return result
})

const petsTableSlice = createSlice({
    name: 'petsTableSlice',
    initialState: petsTableState,
    reducers: {
        savePetsTable: (state, action: PayloadAction<IPetRow[]>) => {
            state.pets = [...action.payload]
        },
    },
    selectors: {
        petsTableSelector: (state) => state.pets,
    },
})

export default petsTableSlice.reducer
export const { savePetsTable } = petsTableSlice.actions
export const { petsTableSelector } = petsTableSlice.selectors