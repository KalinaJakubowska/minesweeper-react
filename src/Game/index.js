import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameButton, GameBoard, GameField } from "./styled";
import { selectGameFields, selectIsGameLost, setGameFields } from "../gameSlice"

const Game = ({
    gameLineColumns,
    gameLineRows,
    isGameWon,
    checkField,
    onDoubleClick,
}) => {
    const gameFields = useSelector(selectGameFields);
    const isGameLost = useSelector(selectIsGameLost);
    const dispatch = useDispatch();

    const onRightClick = (event, id) => {
        event.preventDefault();

        dispatch(setGameFields([
            ...gameFields.slice(0, id),
            { ...gameFields[id], rightClicked: !gameFields[id].rightClicked },
            ...gameFields.slice(id + 1),
        ]
        ))
    };

    return (
        <GameBoard
            columns={gameLineColumns}
            rows={gameLineRows}
        >
            {gameFields.map(({ bombsAround, type, hidden, id, rightClicked }) => (
                <GameField
                    onDoubleClick={() => onDoubleClick(id)}
                    onContextMenu={(event) => event.preventDefault()}
                    key={id}
                    type={type}
                    won={isGameWon && !isGameLost}
                >
                    <GameButton
                        hidden={!hidden}
                        rightClicked={rightClicked}
                        onClick={() => checkField(id)}
                        onContextMenu={(event) => onRightClick(event, id)}
                        disabled={isGameLost}
                    >
                    </GameButton>
                    {(bombsAround === 0 || type === "border") || bombsAround}
                </GameField>))
            }
        </GameBoard>
    );
};

export default Game;