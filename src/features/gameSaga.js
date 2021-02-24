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
  prepareGame,
  setGameFields,
} from "./gameSlice";

const generateEmptyFields = (rows, columns) => {
  let newGameFields = [];
  const createNewField = ({ type, hidden }) => {
    newGameFields.push({
      id: newGameFields.length,
      type,
      hidden,
      bombsAround: 0,
      rightClicked: false,
    });
  };

  for (let i = 0; i < rows; i++) {
    for (let y = 0; y < columns; y++) {
      if (y === 0 || y === columns - 1 || i === 0 || i === rows - 1) {
        createNewField({ type: "border", hidden: false });
      } else {
        createNewField({ type: "field", hidden: true });
      }
    }
  }

  return newGameFields;
};

function* revealFieldHandler() {
  const { bombsNumber, gameFields } = yield select(selectGameData);

  if (
    gameFields
      .filter(({ type }) => type === "bomb")
      .find(({ hidden }) => !hidden)
  ) {
    yield put(setIsGameLost(true));
    yield put(revealAllBombs());
  } else if (gameFields.filter(({ hidden }) => hidden).length === bombsNumber) {
    yield put(setIsGameWon(true));
    yield put(revealAllBombs());
  }
}

function* startGame() {
  const firstID = yield select(selectFirstID);
  yield put(generateFieldsContent(firstID));
  yield put(revealAllEmptyFieldsInGroup({ id: firstID }));
}

function* prepareGameHandler(action) {
  const rows = yield action.payload.rows;
  const columns = yield action.payload.columns;

  const newGameFields = yield generateEmptyFields(rows, columns);
  yield put(setGameFields(newGameFields));
}

export function* watchRevealField() {
  yield takeLatest(revealField.type, revealFieldHandler);
  yield takeLatest(revealAllEmptyFieldsInGroup.type, revealFieldHandler);
}

export function* watchSetFirstID() {
  yield takeLatest(setFirstID.type, startGame);
}

export function* watchPrepareGame() {
  yield takeLatest(prepareGame.type, prepareGameHandler);
}
