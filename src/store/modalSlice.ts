import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface IModalState {
    isOpenFilter: boolean,
    isOpenForm: boolean,
}

const modalState: IModalState = {
    isOpenFilter: false,
    isOpenForm: false
}

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: modalState,
    reducers: {
        setIsOpenFilter: (state, action: PayloadAction<boolean>) => {
            state.isOpenFilter = action.payload
        }, 
        setIsOpenForm: (state, action: PayloadAction<boolean>) => {
            state.isOpenForm = action.payload
        }, 
        closeAllModals: (state) => {
            state.isOpenFilter = false;
            state.isOpenForm = false;
        }
    },
    selectors: {
        isOpenFilterSelector: (state) => state.isOpenFilter,
        isOpenFormSelector: (state) => state.isOpenForm,
    },
})

export default modalSlice.reducer
export const {setIsOpenFilter, setIsOpenForm, closeAllModals} = modalSlice.actions
export const {isOpenFilterSelector, isOpenFormSelector} = modalSlice.selectors