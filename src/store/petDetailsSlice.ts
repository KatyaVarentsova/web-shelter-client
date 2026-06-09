import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IPetDetails } from "../types/types"

interface IPetDetailsState {
    pet: IPetDetails,
}

const petDetailsState: IPetDetailsState = {
    pet: {
        id: "fe8c148b-a3bd-498b-9e2e-8211ad069a8c",
        nickname: "Герда",
        category: "Собака",
        size: 22,
        character: "Спокойный",
        birthday: "2020-01-12T21:00:00.000Z",
        gender: "Девочка",
        wool: "Короткая",
        for_family: true,
        for_dogs: true,
        for_cats: true,
        is_guest: false,
        description: "Герда — ласковая и очень чуткая собака, которая прекрасно чувствует настроение человека. Она спокойно относится к новым людям, любит внимание и с удовольствием проводит время рядом с семьёй. Герда не навязчива, но всегда будет рядом, если вам нужна компания, прогулка или просто тёплый взгляд после тяжёлого дня. Она терпелива, аккуратна и хорошо подойдёт для жизни в семье с детьми. Герда быстро привыкает к распорядку, любит спокойные прогулки и легко находит общий язык с другими животными. Эта собака станет не просто питомцем, а настоящим другом и надёжным членом семьи.",
        curator_id: "f7f2d7a4-a480-4e2b-8948-9431f6b41ab4",
        created_at: "2026-05-09T16:37:13.367Z",
        images: [
            {
                id: "a0b9aeba-3ba0-4164-bdd2-d0aa5aebb8ef",
                image: "https://priutnekrasovka.ru/public/uploads/a72e6f05568024888eafa9125bc610864210388c.png",
                number: 1
            },
            {
                id: "d57cac3f-f5d5-4491-b1d2-8719c829e633",
                image: "https://priutnekrasovka.ru/public/uploads/9a0222c67853d636121e352514c6dca436cef7f5.jpg",
                number: 2
            }
        ]
    }
}

export const getPetDetails = createAsyncThunk<IPetDetails, string, { rejectValue: string }>('petDetailsSlice/getPetDetails', async (id: string, thunkObject) => {
    const response = await fetch(`http://localhost:3000/api/pets/${id}`)
    if (!response.ok) {
        const errorData = await response.json();
        return thunkObject.rejectWithValue(errorData.message || 'Ошибка загрузки данных о работнике')
    }
    const result: IPetDetails = await response.json()
    const dispatch = thunkObject.dispatch
    dispatch(savePetDetails(result))
    return result
})

const petDetailsSlice = createSlice({
    name: 'petDetailsSlice',
    initialState: petDetailsState,
    reducers: {
        savePetDetails: (state, action: PayloadAction<IPetDetails>) => {
            state.pet = { ...action.payload }
        }
    },
    selectors: {
        petDetailsSelector: (state) => state.pet,
    },
})

export default petDetailsSlice.reducer
export const { savePetDetails } = petDetailsSlice.actions
export const { petDetailsSelector } = petDetailsSlice.selectors