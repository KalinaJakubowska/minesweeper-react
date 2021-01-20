import { all } from "redux-saga/effects";
import { watchRevealField } from "./features/gameSaga";

export default function* rootSaga() {
  yield all([watchRevealField()]);
}
