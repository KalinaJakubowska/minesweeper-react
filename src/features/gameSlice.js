import { createSlice } from "@reduxjs/toolkit";
import idsAroundSelectedField from "./idsAroundSelectedField";
import levelProperties from "./levelProperties";

const gameSlice = createSlice({
  name: "gameData",
  initialState: {
    gameFields: [],
    gameLevel: localStorage.getItem("gameLevel") || "easy",
    columns:
      levelProperties[localStorage.getItem("gameLevel")]?.columns ||
      levelProperties["easy"].columns,
    rows:
      levelProperties[localStorage.getItem("gameLevel")]?.rows ||
      levelProperties["easy"].rows,
    bombsNumber:
      levelProperties[localStorage.getItem("gameLevel")]?.bombs ||
      levelProperties["easy"].bombs,
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
    prepareGame: (state, { payload: currentLevelProperties }) => {
      if (currentLevelProperties) {
        state.gameLevel = currentLevelProperties.name;
        state.columns = currentLevelProperties.columns;
        state.rows = currentLevelProperties.rows;
        state.bombsNumber = currentLevelProperties.bombs;
      }
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
      { gameFields, columns },
      { payload: { id } }
    ) => {
      const revealFieldAndFieldsAround = (fieldIndex) => {
        if (!gameFields[fieldIndex].rightClicked) {
          gameFields[fieldIndex].hidden = false;
        }

        for (const id of idsAroundSelectedField(fieldIndex, columns)) {
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
      const gameSize = state.columns * state.rows;

      const countBombsAroundAllFields = () => {
        const countBombsAroundField = (i) => {
          return idsAroundSelectedField(i, state.columns)
            .map((id) => +(state.gameFields[id].type === "bomb"))
            .reduce((acc, curr) => acc + curr);
        };

        for (let i = 0; i < gameSize; i++) {
          if (state.gameFields[i].type === "field") {
            state.gameFields[i].bombsAround = countBombsAroundField(i);
          }
        }
      };

      const emptyFields = idsAroundSelectedField(payload, state.columns);

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
export const selectGameLevel = (state) => state.gameData.gameLevel;
export const selectBombsLeft = (state) => {
  return selectIsGameWon(state)
    ? 0
    : selectGameData(state).bombsNumber -
        selectGameFields(state).filter(({ rightClicked }) => rightClicked)
          .length;
};

export default gameSlice.reducer;
