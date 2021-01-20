import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import gameReducer from "./features/gameSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    gameData: gameReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
