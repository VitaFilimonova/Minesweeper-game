import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    rows: 8,
    columns: 8,
    minesNumber: 10,

}

export const boardSizeSlice = createSlice({
    name: 'boardSize',
    initialState,
    reducers: {
        updateBoard: (state, action) => {
            state.rows = action.payload.rows
            state.columns = action.payload.columns
            state.minesNumber = action.payload.minesNumber

        },

        // updateValues: (state, action) => {
            // Заменяем текущее состояние новыми данными

            // state.co2 = Math.ceil(action.payload.co2);
            // if (!isNaN(state.temp)) {
            //     // Округляем temp до одного знака после запятой
            //     state.temp = state.temp.toFixed(1);
            // }
            // state.temp > 27
            //     ? state.tempError = true
            //     : state.tempError = false

        // },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})
export const {updateBoard, setError} = boardSizeSlice.actions;