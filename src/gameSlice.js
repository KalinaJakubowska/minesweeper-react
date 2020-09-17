import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "gameData",
    initialState: {
        gameFields: [],
        gameLineColumns: 10,
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
        setGameLineColumns: (state, { payload }) => {
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
        createNewField: (state, { payload }) => {
            state.gameFields.push(
                {
                    id: state.gameFields.length,
                    type: payload[0],
                    hidden: payload[1],
                    bombsAround: 0,
                    rightClicked: false,
                }
            )
        },
        revealField: ({ gameFields }, { payload: id }) => {
            gameFields[id].hidden = false;
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
    createNewField,
    revealField,
} = gameSlice.actions;
export const selectGameData = state => state.gameData;
export const selectGameFields = state => state.gameData.gameFields;
export const selectIsGameLost = state => state.gameData.isGameLost;
export const selectIsGameWon = state => state.gameData.isGameWon;
export default gameSlice.reducer;