import { useDispatch, useSelector } from "react-redux";
import { GameButton, GameBoard, GameField } from "./styled";
import React from "react";
import {
  selectGameData,
  selectGameFields,
  selectIsGameLost,
  selectIsGameWon,
  setGameFields,
  revealField,
  revealAllEmptyFieldsInGroup,
  setFirstID,
} from "./../gameSlice";
import idsAroundSelectedField from "../idsAroundSelectedField";

const Game = () => {
  const { columns, rows, firstID } = useSelector(
    selectGameData
  );
  const gameFields = useSelector(selectGameFields);
  const isGameLost = useSelector(selectIsGameLost);
  const isGameWon = useSelector(selectIsGameWon);

  const dispatch = useDispatch();

  const onDoubleClick = (id) => {
    const countRightClickedAroundField = (id) => {
      return idsAroundSelectedField(id, columns)
        .map((id) => +gameFields[id].rightClicked)
        .reduce((acc, curr) => acc + curr);
    };

    if (
      gameFields[id].type === "field" &&
      countRightClickedAroundField(id) === gameFields[id].bombsAround &&
      !gameFields[id].rightClicked
    ) {
      dispatch(revealAllEmptyFieldsInGroup({ id }));
    }
  };

  const onRightClick = (event, id) => {
    event.preventDefault();

    dispatch(
      setGameFields([
        ...gameFields.slice(0, id),
        { ...gameFields[id], rightClicked: !gameFields[id].rightClicked },
        ...gameFields.slice(id + 1),
      ])
    );
  };

  const checkField = (id) => {
    if (!firstID && !gameFields[id].rightClicked) {
      dispatch(setFirstID(id));
    } else if (gameFields[id].rightClicked) {
      return;
    } else if (
      gameFields[id].bombsAround === 0 &&
      gameFields[id].type !== "bomb"
    ) {
      dispatch(revealAllEmptyFieldsInGroup({ id }));
    } else {
      dispatch(revealField(id));
    }
  };

  return (
    <GameBoard columns={columns} rows={rows}>
      {gameFields.map(({ bombsAround, type, hidden, id, rightClicked }) => (
        <GameField
          onDoubleClick={() => onDoubleClick(id)}
          onContextMenu={(event) => event.preventDefault()}
          key={id}
          type={type}
          won={isGameWon}
        >
          <GameButton
            hidden={!hidden}
            rightClicked={rightClicked}
            onClick={() => checkField(id)}
            onContextMenu={(event) => onRightClick(event, id)}
            disabled={isGameLost}
          ></GameButton>
          {bombsAround === 0 || type === "border" || bombsAround}
        </GameField>
      ))}
    </GameBoard>
  );
};

export default Game;
