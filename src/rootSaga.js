import { all } from "redux-saga/effects";
import { watchRevealField, watchSetFirstID } from "./features/gameSaga";

export default function* rootSaga() {
  yield all([watchRevealField(), watchSetFirstID()]);
}
