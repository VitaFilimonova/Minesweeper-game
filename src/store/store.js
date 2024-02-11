import {configureStore} from '@reduxjs/toolkit'
import {leadersSlice} from "./reducers/leadersSlice";
import {boardSizeSlice} from "./reducers/boardSizeSlice";
import {playerNameSlice} from "./reducers/playerNameSlice";
// import {valuesApi} from "../services/ValuesServices";

export const store = configureStore({
    reducer: {
        // [valuesApi.reducerPath]: valuesApi.reducer,
        valuesReducer: leadersSlice.reducer,
        boardSizeReducer: boardSizeSlice.reducer,
        playerNameReducer: playerNameSlice.reducer,

    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(valuesApi.middleware),
})