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
    gameSize,
    isItBeforeFirstLeftClick,
    setIsItBeforeFirstLeftClick,
    checkField,
}) => {

    return (
        < div className="container container--game" >
            <div
                className="game"
                style={{
                    gridTemplateColumns: `repeat(${gameLineColumns}, 40px)`,
                    gridTemplateRows: `repeat(${gameLineRows}, 40px)`,
                }}
            >
                {gameFields.map(({ bombsAround, type, hidden, id, rightClicked }) => (
                    <div key={id} className={`game__field
                        ${type === "field" ? "" : " game__field--" + type}
                        ${isGameWon
                            && type === "bomb"
                            && !isGameLost
                            ? " game__field--greenBomb"
                            : ""
                        }`
                    }>
                        <button
                            className={
                                `game__button
                                ${!hidden ? " game__button--hidden" : ""}
                                ${rightClicked ? " game__button--rightClicked" : ""}`}
                            onClick={() => checkField(id)}
                            disabled={isGameLost}
                        >
                        </button>
                        {bombsAround === 0 || type === "border" ? "" : bombsAround}
                    </div>))
                }
            </div >
        </div >
    )
}
export default Game;