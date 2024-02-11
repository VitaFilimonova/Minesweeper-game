import {createSlice} from "@reduxjs/toolkit";
import {useEffect} from "react";

const initialState = {
    playerName: localStorage.getItem("playerName") || "anonymous",
    error: '',
};

// Проверяем, установлено ли уже имя игрока в localStorage, если нет — устанавливаем "anonymous"
if (!localStorage.getItem("playerName")) {
    localStorage.setItem("playerName", "anonymous");
}


export const playerNameSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        updateName: (state, action) => {

            state.playerName = action.payload.playerName.trim() ;
            localStorage.setItem("playerName", JSON.stringify(state.playerName));


        },


        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})
export const {updateName, updateValues, setError} = playerNameSlice.actions;