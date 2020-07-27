import React from "react";
import "./style.css";

const Game = ({
    gameFields,
    setGameFields,
    bombsNumber,
    gameLineColumns,
    gameLineRows,
    isGameLost,
    setIsGameLost,
    isGameWon,
    setIsGameWon,
    gameSize,
    isItBeforeFirstLeftClick,
    setIsItBeforeFirstLeftClick,
}) => {

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

    const checkIsGameWon = () => {
        if (gameFields.filter(({ hidden }) => hidden).length === bombsNumber) {
            setIsGameWon(true);
        }
    };

    const revealField = (id) => {
        setGameFields(gameFields =>
            [
                ...gameFields.slice(0, id),
                { ...gameFields[id], hidden: false },
                ...gameFields.slice(id + 1),
            ])

        checkIsGameWon();
    };

    const checkField = (id) => {
        if (isItBeforeFirstLeftClick) {
            generateBombsPlaces(id);
            setIsItBeforeFirstLeftClick(false);
        }


        if (gameFields[id].type === "bomb") {
            setIsGameLost(true);
        } else if (gameFields[id].bombsAround === 0) {
            revealField(id);//reveal empty fields
        } else {
            revealField(id);
        }
    }

    const generateBombsPlaces = (id) => {
        const emptyFields = idsAroundSelectedField(id);
        let newBombs = [];
        let newBomb;
        for (let i = 1; i <= bombsNumber; i++) {
            newBomb = Math.floor(Math.random() * gameSize);
            while (gameFields[newBomb].type !== "field"
                || newBomb === id
                || emptyFields.includes(newBomb)) {
                newBomb = Math.floor(Math.random() * gameSize);
            }
            newBombs.push(newBomb);
        }
        newBombs.map(bomb => {
            setGameFields(gameFields =>
                [
                    ...gameFields.slice(0, bomb),
                    { ...gameFields[bomb], type: "bomb" },
                    ...gameFields.slice(bomb + 1),
                ]
            );
        })
    };

    return (
        < div className="container container--game" >
            <div
                className="game"
                style={{
                    gridTemplateColumns: `repeat(${gameLineColumns}, 40px)`,
                    gridTemplateRows: `repeat(${gameLineRows}, 40px)`,
                }}
            >
                {gameFields.map(({ type, hidden, id, rightClicked }) => (
                    <div key={id} className={`game__field
                    ${type === "field" ? "" : " game__field--" + type}
                    ${isGameWon && type === "bomb" ? " game__field--greenBomb" : ""} 
                    `}>
                        <button
                            className={
                                `game__button
                                ${!hidden ? " game__button--hidden" : ""}
                                ${rightClicked ? " game__button--rightClicked" : ""}`}
                            onClick={() => checkField(id)}
                        >
                        </button>
                    </div>))
                }
            </div >
        </div >
    )
}
export default Game;