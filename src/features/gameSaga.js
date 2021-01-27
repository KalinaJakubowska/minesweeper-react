import { select, put, takeLatest } from "redux-saga/effects";
import {
  revealAllBombs,
  revealField,
  selectGameData,
  setIsGameLost,
  setIsGameWon,
  revealAllEmptyFieldsInGroup,
  setFirstID,
  generateFieldsContent,
  selectFirstID,
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
  yield takeLatest(revealAllEmptyFieldsInGroup.type, revealFieldHandler);
}

function* startGame() {
  const firstID = yield select(selectFirstID);
  yield put(generateFieldsContent(firstID));
  yield put(revealAllEmptyFieldsInGroup({ id: firstID }));
}

export function* watchSetFirstID() {
  yield takeLatest(setFirstID.type, startGame);
}
