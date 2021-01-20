import { select, put, takeLatest } from "redux-saga/effects";
import {
  revealAllBombs,
  revealField,
  selectGameData,
  setIsGameLost,
  setIsGameWon,
} from "./gameSlice";

function* revealFieldHandler() {
  const { bombsNumber, gameFields } = yield select(selectGameData);

  if (
    gameFields
      .filter(({ type }) => type === "bomb")
      .find(({ hidden }) => hidden === false)
  ) {
    yield put(setIsGameLost(true));
    yield put(revealAllBombs());
  } else if (gameFields.filter(({ hidden }) => hidden).length === bombsNumber) {
    yield put(setIsGameWon(true));
    yield put(revealAllBombs());
  }
}

export function* watchRevealField() {
  yield takeLatest(revealField.type, revealFieldHandler);
}
