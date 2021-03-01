import { createSlice } from "@reduxjs/toolkit";

const scoreBoardSlice = createSlice({
  name: "scoreBoard",
  initialState: {
    bestResult: localStorage.getItem("bestResult")
      ? JSON.parse(localStorage.getItem("bestResult"))
      : { easy: undefined, medium: undefined, expert: undefined },
  },
  reducers: {
    updateBestResult: (state, { payload: { result, level } }) => {
      switch (level) {
        case "easy":
          if (!state.bestResult.easy || +state.bestResult.easy > +result) {
            state.bestResult.easy = +result;
          }
          break;
        case "medium":
          if (!state.bestResult.medium || +state.bestResult.medium > +result) {
            state.bestResult.medium = +result;
          }
          break;
        case "expert":
          if (!state.bestResult.expert || +state.bestResult.expert > +result) {
            state.bestResult.expert = +result;
          }
          break;
        default:
          break;
      }
    },
  },
});

export const { updateBestResult } = scoreBoardSlice.actions;

export const selectScoreBoardData = (state) => state.scoreBoardData;
export const selectBestResult = (state) => state.scoreBoardData.bestResult;

export default scoreBoardSlice.reducer;
