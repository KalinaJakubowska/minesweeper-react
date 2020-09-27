import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "gameData",
    initialState: {
        gameFields: [],
        gameLineColumns: localStorage.getItem("innerLineColumns") ? JSON.parse(+localStorage.getItem("innerLineColumns") + 2) : 10,
        gameLineRows: localStorage.getItem("innerLineRows") ? JSON.parse(+localStorage.getItem("innerLineRows") + 2) : 10,
        bombsNumber: JSON.parse(localStorage.getItem("bombsNumberForm")) || 10,
        isGameLost: false,
        isGameWon: false,
    },
    reducers: {
        setGameFields: (state, { payload }) => {
            state.gameFields = payload;
        },
        setIsGameLost: (state, { payload }) => {
            state.isGameLost = payload;
        },
        setIsGameWon: (state, { payload }) => {
            state.isGameWon = payload;
        },
        revealField: ({ gameFields }, { payload: id }) => {
            gameFields[id].hidden = false;
        },
        setGameProperties: (state, { payload: { bombsNumber, gameLineColumns, gameLineRows } }) => {
            state.gameLineColumns = gameLineColumns;
            state.gameLineRows = gameLineRows;
            state.bombsNumber = bombsNumber;
            state.isGameLost = false;
            state.isGameWon = false;
        },
        revealAllBombs: ({ gameFields }) => {
            gameFields.filter(field => field.type === "bomb")
                .forEach(field => field.hidden = false)
        },
    },
});

export const {
    setIsGameWon,
    setIsGameLost,
    setBombsNumber,
    setGameLineColumns,
    setGameLineRows,
    setGameFields,
    revealField,
    setGameProperties,
    revealAllBombs,
} = gameSlice.actions;
export const selectGameData = state => state.gameData;
export const selectGameFields = state => state.gameData.gameFields;
export const selectIsGameLost = state => state.gameData.isGameLost;
export const selectIsGameWon = state => state.gameData.isGameWon;
export const selectBombsLeft = state => {
    return (
        selectIsGameWon(state)
            ? 0
            : (
                selectGameData(state).bombsNumber
                - selectGameFields(state).filter(({ rightClicked }) => rightClicked).length
            )
    );
};
export const selectIsGameStarted = (state) => {
    return !selectGameFields(state).filter(field => field.type !== "border"
        && field.hidden === false).length
}

export default gameSlice.reducer;