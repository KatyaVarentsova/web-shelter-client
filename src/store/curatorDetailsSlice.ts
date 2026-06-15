import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICurator, IShortCurators } from "../types/types";

interface ICeratorDetailsState {
    curator: ICurator,
    curators: IShortCurators[],
}

const curatorDetailsState: ICeratorDetailsState = {
    curator: {
        id: "f7f2d7a4-a480-4e2b-8948-9431f6b41ab4",
        last_name: "Варенцова",
        first_name: "Екатерна",
        description: "Специализируется на социализации животных и подборе семьи с учётом характера питомца. Более 4 лет помогает бездомным кошкам и собакам найти дом, консультирует по вопросам адаптации и ухода после переезда в новую семью.",
        image: "https://sun9-71.vkuserphoto.ru/s/v1/ig2/ve8WH8JDq2h5oLhr1y2SoYk2tW_u3Gaq1FthmzqPtK2K7QY8L4kDIIjoqaYU2DesxLpvRYer0ZSRLGLUos6OAfZq.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,830x830&from=bu&cs=830x0",
        phone_number: "8314323791",
        messengers: [
            {
                id: "d921c85a-55c8-4c9f-aee4-c3e337cc2425",
                messenger: "telegram",
                nickname: "https://t.me/kotya_gr"
            },
            {
                id: "f85693e4-033b-477f-828e-894ec448e24c",
                messenger: "vk",
                nickname: "https://vk.ru/k.grigoryeva11"
            }
        ]
    },
    curators: []
}

export const getCuratorDetails = createAsyncThunk<ICurator, string, { rejectValue: string }>('curatorDetailsSlice/getCuratorDetails', async (id: string, thunkObject) => {
    const response = await fetch(`http://localhost:3000/api/curators/${id}`)
    if (!response.ok) {
        const errorData = await response.json();
        return thunkObject.rejectWithValue(errorData.message || 'Ошибка загрузки данных о кураторе')
    }
    const result: ICurator = await response.json()
    const dispatch = thunkObject.dispatch
    dispatch(saveCurator(result))
    return result
})

export const getShortCurators = createAsyncThunk<IShortCurators[], void, { rejectValue: string }>('curatorDetailsSlice/getShortCurators', async (_, thunkObject) => {
    const response = await fetch(`http://localhost:3000/api/curators/info`)
    if (!response.ok) {
        const errorData = await response.json();
        return thunkObject.rejectWithValue(errorData.message || 'Ошибка загрузки данных о кураторах')
    }
    const result: IShortCurators[] = await response.json()
    const dispatch = thunkObject.dispatch
    dispatch(saveShortCurators(result))
    return result
})

const curatorDetailsSlice = createSlice({
    name: 'curatorDetailsSlice',
    initialState: curatorDetailsState,
    reducers: {
        saveCurator: (state, action: PayloadAction<ICurator>) => {
            state.curator = { ...action.payload }
        },
        saveShortCurators: (state, action: PayloadAction<IShortCurators[]>) => {
            state.curators = [...action.payload]
        }
    },
    selectors: {
        curatorSelector: (state) => state.curator,
        shortCuratorsSelector: (state) => state.curators,
    },
})

export default curatorDetailsSlice.reducer
export const { saveCurator, saveShortCurators } = curatorDetailsSlice.actions
export const { curatorSelector, shortCuratorsSelector } = curatorDetailsSlice.selectors