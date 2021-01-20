import { useDispatch, useSelector } from "react-redux";
import { GameButton, GameBoard, GameField } from "./styled";
import React, { useEffect } from 'react';
import {
    selectGameData,
    selectGameFields,
    selectIsGameLost,
    selectIsGameWon,
    setGameFields,
    selectIsGameStarted,
    revealField,
    generateFields,
} from './../gameSlice';

const Game = () => {
    const isGameStarted = useSelector(selectIsGameStarted);
    const { gameLineColumns, gameLineRows, bombsNumber } = useSelector(selectGameData);
    const gameSize = gameLineColumns * gameLineRows;
    const gameFields = useSelector(selectGameFields);
    const isGameLost = useSelector(selectIsGameLost);
    const isGameWon = useSelector(selectIsGameWon);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(generateFields());
    }, [dispatch]);

    useEffect(() => {
    }, [gameFields, dispatch]);


    const idsAroundSelectedField = (index) => {
        const idsAroundFieldTemplate = [
            (gameLineColumns * (-1) - 1),
            (gameLineColumns * (-1)),
            (gameLineColumns * (-1) + 1),
            -1,
            1,
            (gameLineColumns - 1),
            (gameLineColumns),
            (gameLineColumns + 1)
        ];
        return idsAroundFieldTemplate.map(id => id + index);
    };

    const revealAllEmptyFieldsInGroup = (id, newGameFields = [...gameFields]) => {
        const revealFieldAndFieldsAround = (fieldIndex) => {
            if (newGameFields[fieldIndex].rightClicked === false) {
                newGameFields = [
                    ...newGameFields.slice(0, fieldIndex),
                    { ...newGameFields[fieldIndex], hidden: false },
                    ...newGameFields.slice(fieldIndex + 1),
                ]
            }

            for (const id of idsAroundSelectedField(fieldIndex)) {
                if (newGameFields[id].type === "field"
                    && newGameFields[id].bombsAround === 0
                    && newGameFields[id].hidden === true
                    && newGameFields[id].rightClicked === false) {
                    revealFieldAndFieldsAround(id);

                } else if (newGameFields[id].hidden === true
                    && newGameFields[id].rightClicked === false) {

                    newGameFields = [
                        ...newGameFields.slice(0, id),
                        { ...newGameFields[id], hidden: false },
                        ...newGameFields.slice(id + 1),
                    ]
                }
            }
        };
        revealFieldAndFieldsAround(id);
        dispatch(setGameFields(newGameFields));
    };

    const checkField = (id) => {
        if (isGameStarted && !gameFields[id].rightClicked) {
            generateBombsPlaces(id);
            return 0;
        }
        if (gameFields[id].rightClicked) {
            return 0;
        }

        if (gameFields[id].bombsAround === 0
            && gameFields[id].type !== "bomb") {
            revealAllEmptyFieldsInGroup(id);
        } else {
            dispatch(revealField(id));
        }
    };

    const countBombsAroundField = (i, newGameFields = [...gameFields]) => {
        return idsAroundSelectedField(i)
            .map(id => +(newGameFields[id].type === "bomb"))
            .reduce((acc, curr) => acc + curr);
    };

    const countRightClickedAroundField = (id) => {
        return idsAroundSelectedField(id)
            .map(id => +(gameFields[id].rightClicked))
            .reduce((acc, curr) => acc + curr);
    };

    const onDoubleClick = (id) => {
        if (gameFields[id].type === "field"
            && countRightClickedAroundField(id) === gameFields[id].bombsAround
            && !gameFields[id].rightClicked) {
            revealAllEmptyFieldsInGroup(id);
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
        revealAllEmptyFieldsInGroup(firstID, newGameFields);
    };

    const generateBombsPlaces = (id) => {
        const emptyFields = idsAroundSelectedField(id);
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