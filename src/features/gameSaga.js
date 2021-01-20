import { select, put, takeLatest } from "redux-saga/effects";
import {
  revealAllBombs,
  revealField,
  selectGameData,
  selectIsGameLost,
  selectIsGameWon,
  setIsGameLost,
  setIsGameWon,
} from "./gameSlice";

function* revealFieldHandler() {
  const isGameLost = yield select(selectIsGameLost);
  const isGameWon = yield select(selectIsGameWon);
  const { bombsNumber, gameFields } = yield select(selectGameData);

  if (
    gameFields.filter(({ hidden }) => hidden).length === bombsNumber &&
    !isGameLost
  ) {
    yield put(setIsGameWon(true));
    yield put(revealAllBombs());
  }

  if (
    gameFields
      .filter(({ type }) => type === "bomb")
      .find(({ hidden }) => hidden === false) &&
    !isGameWon &&
    !isGameLost
  ) {
    yield put(setIsGameLost(true));
    yield put(revealAllBombs());
  }
}

export function* watchRevealField() {
  yield takeLatest(revealField.type, revealFieldHandler);
}
