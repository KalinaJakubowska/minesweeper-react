import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "gameData",
    initialState: {
        gameFields: [],
        gameLineColumn: 10,
        gameLineRows: 10,
        bombsNumber: 10,
        isGameLost: false,
        isGameWon: false,
        gameSize: 100,
        isItBeforeFirstLeftClick: true,
        bombsLeft: 10,
    },
    reducers: {
        setGameFields: (state, { payload }) => {
            state.gameFields = payload;
        },
        setGameLineColumn: (state, { payload }) => {
            state.gameLineColumn = payload;
        },
        setGameLineRows: (state, { payload }) => {
            state.gameLineRows = payload;
        },
        setBombsNumber: (state, { payload }) => {
            state.bombsNumber = payload;
        },
        setIsGameLost: (state, { payload }) => {
            state.isGameLost = payload;
        },
        setIsGameWon: (state, { payload }) => {
            state.isGameWon = payload;
        },
        setGameSize: (state, { payload }) => {
            state.gameSize = payload;
        },
        setIsItBeforeFirstLeftClick: (state, { payload }) => {
            state.isItBeforeFirstLeftClick = payload;
        },
        setBombsLeft: (state, { payload }) => {
            state.bombsLeft = payload;
        },
    },
});

export const {
    setBombsLeft,
    setIsGameWon,
    setIsGameLost,
    setBombsNumber,
    setGameSize,
    setGameLineColumns,
    setGameLineRows,
    setIsItBeforeFirstLeftClick,
    setGameFields,
} = gameSlice.actions;
export const selectGameData = state => state.gameData;
export default gameSlice.reducer;