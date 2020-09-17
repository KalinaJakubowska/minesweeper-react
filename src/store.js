import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";

const store = configureStore({
    reducer: {
        gameData: gameReducer,
    },
});

export default store;