import React from "react";
import "./style.css";

const Game = ({ gameFields, gameLineColumns, gameLineRows, isGameLost, isGameWon, revealField}) => {

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
                            onClick={() => revealField(id)}
                        >
                        </button>
                    </div>))
                }
        </div >
        </div >
    )
}
export default Game;