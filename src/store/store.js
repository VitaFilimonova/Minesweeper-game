import {configureStore} from '@reduxjs/toolkit'
import {leadersSlice} from "./reducers/LeadersSlice";
import {boardSizeSlice} from "./reducers/BoardSizeSlice";
// import {valuesApi} from "../services/ValuesServices";

export const store = configureStore({
    reducer: {
        // [valuesApi.reducerPath]: valuesApi.reducer,
        valuesReducer: leadersSlice.reducer,
        boardSizeReducer: boardSizeSlice.reducer,

    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(valuesApi.middleware),
})