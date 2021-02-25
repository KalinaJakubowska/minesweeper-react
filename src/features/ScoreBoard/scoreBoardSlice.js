import { createSlice } from "@reduxjs/toolkit";

const scoreBoardSlice = createSlice({
  name: "scoreBoard",
  initialState: {
    bestResult: undefined,
  },
  reducers: {
    updateBestResult: (state, { payload: result }) => {
      if (!state.bestResult || +state.bestResult > +result) {
        state.bestResult = result;
      }
    },
  },
});

export const { updateBestResult } = scoreBoardSlice.actions;

export const selectScoreBoardData = (state) => state.scoreBoardData;
export const selectBestResult = (state) => state.scoreBoardData.bestResult;

export default scoreBoardSlice.reducer;
