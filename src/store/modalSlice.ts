import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface IModalState {
    isOpenFilter: boolean,
}

const modalState: IModalState = {
    isOpenFilter: false,
}

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: modalState,
    reducers: {
        setIsOpenFilter: (state, action: PayloadAction<boolean>) => {
            state.isOpenFilter = action.payload
        }, 
    },
    selectors: {
        isOpenFilterSelector: (state) => state.isOpenFilter,
    },
})

export default modalSlice.reducer
export const {setIsOpenFilter} = modalSlice.actions
export const {isOpenFilterSelector} = modalSlice.selectors