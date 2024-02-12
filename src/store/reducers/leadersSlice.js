import {createSlice} from "@reduxjs/toolkit";
import {useEffect} from "react";

const savedLeaders = JSON.parse(localStorage.getItem("leaders"));

const initialState = {
    error: '',
    leaders: savedLeaders || {
        easy: [],
        normal: [],
        hard: [],
        custom: []
    },
};

export const leadersSlice = createSlice({
    name: 'leaders',
    initialState,
    reducers: {
        // updateName: (state, action) => {
        //     state.playerName = action.payload.playerName.trim();
        //     localStorage.setItem("playerName", JSON.stringify(state.playerName));
        //
        // },

        addLeaderResult: (state, action) => {
            const { mode, playerName, time } = action.payload;
            const newResult = { playerName, time };
            const results = state.leaders[mode];

            // Добавляем новый результат и сортируем по времени
            const updatedResults = [...results, newResult].sort((a, b) => a.time - b.time).slice(0, 10);

            state.leaders[mode] = updatedResults;
            localStorage.setItem("leaders", JSON.stringify(state.leaders));
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})
export const { addLeaderResult, setError} = leadersSlice.actions;