import { useDispatch, useSelector } from "react-redux";
import { GameButton, GameBoard, GameField } from "./styled";
import React from 'react';
import {
    selectGameData,
    selectGameFields,
    selectIsGameLost,
    selectIsGameWon,
    setGameFields,
    selectIsGameStarted,
    revealField,
    revealAllEmptyFieldsInGroup,
} from './../gameSlice';
import idsAroundSelectedField from "./idsAroundSelectedField";

const Game = () => {
    const isGameStarted = useSelector(selectIsGameStarted);
    const { gameLineColumns, gameLineRows, bombsNumber } = useSelector(selectGameData);
    const gameSize = gameLineColumns * gameLineRows;
    const gameFields = useSelector(selectGameFields);
    const isGameLost = useSelector(selectIsGameLost);
    const isGameWon = useSelector(selectIsGameWon);

    const dispatch = useDispatch();

    const checkField = (id) => {
        if (isGameStarted && !gameFields[id].rightClicked) {
            generateBombsPlaces(id);
        } else if (gameFields[id].rightClicked) {
            return;
        } else if (gameFields[id].bombsAround === 0
            && gameFields[id].type !== "bomb") {
            dispatch(revealAllEmptyFieldsInGroup({id}));
        } else {
            dispatch(revealField(id));
        }
    };

    const countBombsAroundField = (i, newGameFields = [...gameFields]) => {
        return idsAroundSelectedField(i, gameLineColumns)
            .map(id => +(newGameFields[id].type === "bomb"))
            .reduce((acc, curr) => acc + curr);
    };

    const countRightClickedAroundField = (id) => {
        return idsAroundSelectedField(id, gameLineColumns)
            .map(id => +(gameFields[id].rightClicked))
            .reduce((acc, curr) => acc + curr);
    };

    const onDoubleClick = (id) => {
        if (gameFields[id].type === "field"
            && countRightClickedAroundField(id) === gameFields[id].bombsAround
            && !gameFields[id].rightClicked) {
            dispatch(revealAllEmptyFieldsInGroup({id}));
        }
    };

    const countBombsAroundAllFields = (newGameFields, firstID) => {
        for (let i = 0; i < gameSize; i++) {
            if (newGameFields[i].type === "field") {

                newGameFields = [
                    ...newGameFields.slice(0, i),
                    {
                        ...newGameFields[i],
                        bombsAround: countBombsAroundField(i, newGameFields)
                    },
                    ...newGameFields.slice(i + 1),
                ]
            }
        }
        dispatch(revealAllEmptyFieldsInGroup({id: firstID, newGameFields}));
    };

    const generateBombsPlaces = (id) => {
        const emptyFields = idsAroundSelectedField(id, gameLineColumns);
        let newGameFields = [...gameFields];
        let newBomb;
        for (let i = 1; i <= bombsNumber; i++) {
            newBomb = Math.floor(Math.random() * gameSize);
            while (newGameFields[newBomb].type !== "field"
                || newBomb === id
                || emptyFields.includes(newBomb)) {
                newBomb = Math.floor(Math.random() * gameSize);
            }
            newGameFields =
                [
                    ...newGameFields.slice(0, newBomb),
                    { ...newGameFields[newBomb], type: "bomb" },
                    ...newGameFields.slice(newBomb + 1),
                ]
        }
        countBombsAroundAllFields(newGameFields, id);
    };

    const onRightClick = (event, id) => {
        event.preventDefault();

        dispatch(setGameFields([
            ...gameFields.slice(0, id),
            { ...gameFields[id], rightClicked: !gameFields[id].rightClicked },
            ...gameFields.slice(id + 1),
        ]));
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
                    won={isGameWon}
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