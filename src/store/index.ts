import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import petsSlice from "./petsSlice";
import modalSlice from "./modalSlice";
import petDetailsSlice from "./petDetailsSlice";
import curatorDetailsSlice from "./curatorDetailsSlice";
import requestsSlice from "./requestsSlice";

const store = configureStore({
    reducer: {
        petsSlice: petsSlice,
        modalSlice: modalSlice,
        petDetailsSlice: petDetailsSlice,
        curatorDetailsSlice: curatorDetailsSlice,
        requestsSlice: requestsSlice,
    }
})

export default store
//RootState - это тип переменной store
export type RootState = ReturnType<typeof store.getState>;
//Функция для изменения состояния
export const useAppDispatch: () => typeof store.dispatch = useDispatch
//Функция для чтения состояния
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector