import { createSlice } from "@reduxjs/toolkit";
import idsAroundSelectedField from "./idsAroundSelectedField";

const gameSlice = createSlice({
  name: "gameData",
  initialState: {
    gameFields: [],
    gameLineColumns: localStorage.getItem("innerLineColumns")
      ? JSON.parse(+localStorage.getItem("innerLineColumns") + 2)
      : 10,
    gameLineRows: localStorage.getItem("innerLineRows")
      ? JSON.parse(+localStorage.getItem("innerLineRows") + 2)
      : 10,
    bombsNumber: JSON.parse(localStorage.getItem("bombsNumberForm")) || 10,
    isGameLost: false,
    isGameWon: false,
    firstID: false,
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
    prepareGame: (
      state,
      { payload: level }
    ) => {
      state.gameLineColumns = level.columns;
      state.gameLineRows = level.rows;
      state.bombsNumber = level.bombs;
      state.isGameLost = false;
      state.isGameWon = false;
      state.firstID = false;
    },
    revealAllBombs: ({ gameFields }) => {
      gameFields
        .filter((field) => field.type === "bomb")
        .forEach((field) => (field.hidden = false));
    },
    setFirstID: (state, { payload }) => {
      state.firstID = payload;
    },
    revealAllEmptyFieldsInGroup: (
      { gameFields, gameLineColumns },
      { payload: { id } }
    ) => {
      const revealFieldAndFieldsAround = (fieldIndex) => {
        if (gameFields[fieldIndex].rightClicked === false) {
          gameFields[fieldIndex].hidden = false;
        }

        for (const id of idsAroundSelectedField(fieldIndex, gameLineColumns)) {
          if (
            gameFields[id].type === "field" &&
            !gameFields[id].bombsAround &&
            gameFields[id].hidden &&
            !gameFields[id].rightClicked
          ) {
            revealFieldAndFieldsAround(id);
          } else if (gameFields[id].hidden && !gameFields[id].rightClicked) {
            gameFields[id].hidden = false;
          }
        }
      };
      revealFieldAndFieldsAround(id);
    },
    generateFieldsContent: (state, { payload }) => {
      const gameSize = state.gameLineColumns * state.gameLineRows;

      const countBombsAroundAllFields = () => {
        const countBombsAroundField = (i) => {
          return idsAroundSelectedField(i, state.gameLineColumns)
            .map((id) => +(state.gameFields[id].type === "bomb"))
            .reduce((acc, curr) => acc + curr);
        };

        for (let i = 0; i < gameSize; i++) {
          if (state.gameFields[i].type === "field") {
            state.gameFields[i].bombsAround = countBombsAroundField(i);
          }
        }
      };

      const emptyFields = idsAroundSelectedField(
        payload,
        state.gameLineColumns
      );

      for (let i = 1; i <= state.bombsNumber; i++) {
        let newBomb = Math.floor(Math.random() * gameSize);
        while (
          state.gameFields[newBomb].type !== "field" ||
          newBomb === payload ||
          emptyFields.includes(newBomb)
        ) {
          newBomb = Math.floor(Math.random() * gameSize);
        }

        state.gameFields[newBomb].type = "bomb";
      }
      countBombsAroundAllFields(payload);
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
  prepareGame,
  setFirstID,
  revealAllBombs,
  revealAllEmptyFieldsInGroup,
  generateFieldsContent,
} = gameSlice.actions;
export const selectGameData = (state) => state.gameData;
export const selectFirstID = (state) => state.gameData.firstID;
export const selectGameFields = (state) => state.gameData.gameFields;
export const selectIsGameLost = (state) => state.gameData.isGameLost;
export const selectIsGameWon = (state) => state.gameData.isGameWon;
export const selectBombsLeft = (state) => {
  return selectIsGameWon(state)
    ? 0
    : selectGameData(state).bombsNumber -
        selectGameFields(state).filter(({ rightClicked }) => rightClicked)
          .length;
};

export default gameSlice.reducer;
