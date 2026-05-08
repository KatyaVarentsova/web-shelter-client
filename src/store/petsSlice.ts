import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IPet } from "../types/types"

interface IPetsState {
    pets: IPet[],
}

const petsState: IPetsState = {
    pets: []
}

export const getPets = createAsyncThunk<IPet[], void, {rejectValue: string}>('petsSlice/getPets', async (_, thunkObject) => {
    const response = await fetch('http://localhost:3000/api/pets')
    const result: IPet[]  = await response.json()
    const dispatch = thunkObject.dispatch
    if (result.length === 0) {
        return thunkObject.rejectWithValue('Нет добавленных сотрудников')
    }
    dispatch(savePets(result))
    return result
})

const petsSlice = createSlice({
    name: 'petsSlice',
    initialState: petsState,
    reducers: {
        savePets: (state, action: PayloadAction<IPet[]>) => {
            state.pets = [...action.payload]
        }
    },
    selectors: {
        petsSelector: (state) => state.pets,
    }, 
})

export default petsSlice.reducer
export const { savePets } = petsSlice.actions
export const { petsSelector } = petsSlice.selectors