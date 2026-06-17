import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IFilter, IPet } from "../types/types"

interface IPetsState {
    pets: IPet[],
    filter: IFilter,
}

const API_URL = import.meta.env.VITE_API_URL;

const petsState: IPetsState = {
    pets: [],
    filter: {
        type: '',
        size: '',
        character: '',
        age: '',
        gender: '',
        wool: '',
        other: []
    }
}

export const getPets = createAsyncThunk<IPet[], void, { rejectValue: string }>('petsSlice/getPets', async (_, thunkObject) => {
    const response = await fetch(`${API_URL}/api/pets`)
    const result: IPet[] = await response.json()
    const dispatch = thunkObject.dispatch
    if (result.length === 0) {
        return thunkObject.rejectWithValue('Нет добавленных животных')
    }
    dispatch(savePets(result))
    return result
})

export const postPetFiltering = createAsyncThunk<IPet[], IFilter, { rejectValue: string }>('petsSlice/postPetFiltering', async (filter, thunkObject) => {
    const response = await fetch(`${API_URL}/api/pets/filter`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
    })
    const result: IPet[] = await response.json()
    console.log(result)
    const dispatch = thunkObject.dispatch
    // if (result.length === 0) {
    //     return thunkObject.rejectWithValue('Нет найденных животных по фильтру')
    // }
    dispatch(savePets(result))
    return result
})

const petsSlice = createSlice({
    name: 'petsSlice',
    initialState: petsState,
    reducers: {
        savePets: (state, action: PayloadAction<IPet[]>) => {
            state.pets = [...action.payload]
        },
        saveFilter: (state, action: PayloadAction<IFilter>) => {
            state.filter = { ...action.payload }
        },
    },
    selectors: {
        petsSelector: (state) => state.pets,
        filterSelector: (state) => state.filter,
    },
})

export default petsSlice.reducer
export const { savePets, saveFilter } = petsSlice.actions
export const { petsSelector, filterSelector } = petsSlice.selectors