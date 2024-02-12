import {configureStore} from '@reduxjs/toolkit'
import {leadersSlice} from "./reducers/leadersSlice";
import {boardSizeSlice} from "./reducers/boardSizeSlice";
import {playerNameSlice} from "./reducers/playerNameSlice";

export const store = configureStore({
    reducer: {
        leadersReducer: leadersSlice.reducer,
        boardSizeReducer: boardSizeSlice.reducer,
        playerNameReducer: playerNameSlice.reducer,
    },

})