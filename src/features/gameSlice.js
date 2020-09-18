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
    },
    reducers: {
        setGameFields: (state, { payload }) => {
            state.gameFields = payload;
        },
        setGameLineColumns: (state, { payload }) => {
            state.gameLineColumns = payload;
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
        createNewField: (state, { payload }) => {
            state.gameFields.push(
                {
                    id: state.gameFields.length,
                    type: payload[0],
                    hidden: payload[1],
                    bombsAround: 0,
                    rightClicked: false,
                }
            );
        },
        revealField: ({ gameFields }, { payload: id }) => {
            gameFields[id].hidden = false;
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
    createNewField,
    revealField,
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