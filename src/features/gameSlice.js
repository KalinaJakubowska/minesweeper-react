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
    setGameProperties: (
      state,
      { payload: { bombsNumber, gameLineColumns, gameLineRows } }
    ) => {
      state.gameLineColumns = gameLineColumns;
      state.gameLineRows = gameLineRows;
      state.bombsNumber = bombsNumber;
      state.isGameLost = false;
      state.isGameWon = false;
    },
    revealAllBombs: ({ gameFields }) => {
      gameFields
        .filter((field) => field.type === "bomb")
        .forEach((field) => (field.hidden = false));
    },
    generateEmptyFields: (state) => {
      const createNewField = ({ type, hidden }) => {
        state.gameFields.push({
          id: state.gameFields.length,
          type,
          hidden,
          bombsAround: 0,
          rightClicked: false,
        });
      };

      state.gameFields = [];

      for (let i = 0; i < state.gameLineRows; i++) {
        for (let y = 0; y < state.gameLineColumns; y++) {
          if (
            y === 0 ||
            y === state.gameLineColumns - 1 ||
            i === 0 ||
            i === state.gameLineRows - 1
          ) {
            createNewField({ type: "border", hidden: false });
          } else {
            createNewField({ type: "field", hidden: true });
          }
        }
      }
    },
    revealAllEmptyFieldsInGroup: (
      state,
      { payload: { id, newGameFields = [...state.gameFields] } }
    ) => {
      const revealFieldAndFieldsAround = (fieldIndex) => {
        if (newGameFields[fieldIndex].rightClicked === false) {
          newGameFields = [
            ...newGameFields.slice(0, fieldIndex),
            { ...newGameFields[fieldIndex], hidden: false },
            ...newGameFields.slice(fieldIndex + 1),
          ];
        }

        for (const id of idsAroundSelectedField(
          fieldIndex,
          state.gameLineColumns
        )) {
          if (
            newGameFields[id].type === "field" &&
            newGameFields[id].bombsAround === 0 &&
            newGameFields[id].hidden === true &&
            newGameFields[id].rightClicked === false
          ) {
            revealFieldAndFieldsAround(id);
          } else if (
            newGameFields[id].hidden === true &&
            newGameFields[id].rightClicked === false
          ) {
            newGameFields = [
              ...newGameFields.slice(0, id),
              { ...newGameFields[id], hidden: false },
              ...newGameFields.slice(id + 1),
            ];
          }
        }
      };
      revealFieldAndFieldsAround(id);
      state.gameFields = newGameFields;
    },
    generateFieldsContent: (state, { payload }) => {
      const gameSize = state.gameLineColumns * state.gameLineRows;

      const countBombsAroundAllFields = () => {
        const countBombsAroundField = (i) => {
          return (idsAroundSelectedField(i, state.gameLineColumns)
            .map((id) => +(state.gameFields[id].type === "bomb"))
            .reduce((acc, curr) => acc + curr));
        };

        for (let i = 0; i < gameSize; i++) {
          if (state.gameFields[i].type === "field") {
            state.gameFields[i].bombsAround = countBombsAroundField(i);
          }
        }
        // dispatch(revealAllEmptyFieldsInGroup({ id: firstID, newGameFields }));
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
  setGameProperties,
  revealAllBombs,
  generateEmptyFields,
  revealAllEmptyFieldsInGroup,
  generateFieldsContent,
} = gameSlice.actions;
export const selectGameData = (state) => state.gameData;
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
export const selectIsGameStarted = (state) => {
  return !selectGameFields(state).filter(
    (field) => field.type !== "border" && field.hidden === false
  ).length;
};

export default gameSlice.reducer;
