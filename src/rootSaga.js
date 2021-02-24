import { all } from "redux-saga/effects";
import { watchRevealField, watchSetFirstID, watchPrepareGame } from "./features/gameSaga";

export default function* rootSaga() {
  yield all([watchRevealField(), watchSetFirstID(), watchPrepareGame()]);
}
