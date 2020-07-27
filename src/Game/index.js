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
    setIsGameWon
}) => {

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
        if (gameFields[id].type === "bomb") {
            setIsGameLost(true);
        } else if (gameFields[id].bombsAround === 0) {
            revealField(id);//reveal empty fields
        } else {
            revealField(id);
        }
    }

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
                    js-field`}>
                        <button
                            className={
                                `game__button
                                ${!hidden ? " game__button--hidden" : ""}
                                ${rightClicked ? " game__button--rightClicked" : ""} js-gameButton`}
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