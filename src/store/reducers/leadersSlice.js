import {createSlice} from "@reduxjs/toolkit";
import {useEffect} from "react";

const initialState = {
    // playerName: localStorage.getItem("playerName") || localStorage.setItem("playerName", "anonymous"),
    error: '',
    playMode: 'easy',
}

export const leadersSlice = createSlice({
    name: 'leaders',
    initialState,
    reducers: {
        // updateName: (state, action) => {
        //     state.playerName = action.payload.playerName.trim();
        //     localStorage.setItem("playerName", JSON.stringify(state.playerName));
        //
        // },

        updateValues: (state, action) => {
            // Заменяем текущее состояние новыми данными

            // state.co2 = Math.ceil(action.payload.co2);
            // if (!isNaN(state.temp)) {
            //     // Округляем temp до одного знака после запятой
            //     state.temp = state.temp.toFixed(1);
            // }
            // state.temp > 27
            //     ? state.tempError = true
            //     : state.tempError = false

        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})
export const { updateValues, setError} = leadersSlice.actions;