import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import gameReducer from "./features/gameSlice";
import scoreBoardReducer from "./features/ScoreBoard/scoreBoardSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    gameData: gameReducer,
    scoreBoardData: scoreBoardReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  localStorage.setItem("gameLevel", store.getState().gameData.gameLevel);
});

export default store;
