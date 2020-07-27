import React, { useState, useEffect } from "react";
import "./style.css";

const Form = ({ getGameProperties, setGameFields, gameLineColumns, gameLineRows }) => {
    const [innerLineColumns, setInnerLineColumns] = useState(8);
    const [innerLineRows, setInnerLineRows] = useState(8);
    const [bombsNumber, setBombsNumber] = useState(10);

    const createNewField = (type, hidden = true, bombsAround = 0, rightClicked = false) => {
        setGameFields(gameFields => [
            ...gameFields,
            {
                id: gameFields.length,
                type,
                hidden,
                bombsAround,
                rightClicked,
            }]
        );
    };

    const generateFields = () => {
        setGameFields([]);
        for (let i = 0; i < innerLineRows + 2; i++) {
            for (let y = 0; y < innerLineColumns + 2; y++) {
                if (y === 0 || y === (innerLineColumns + 1) || i === 0 || i === (innerLineRows + 1)) {
                    createNewField("border", false);
                } else {
                    createNewField("field", true, 0);
                }
            }
        }
    };
    useEffect(() => {
        generateFields();
    }, [bombsNumber, gameLineColumns, gameLineRows])

    const onFormSubmit = (event) => {
        event.preventDefault();
        getGameProperties(bombsNumber, innerLineColumns, innerLineRows);
        generateFields();
    }

    return (
        <form onSubmit={onFormSubmit} className="form">
            <button className="form__button">Rozpocznij nową grę</button>
            <fieldset className="form__fieldset">
                <legend className="form__legend">
                    Zaawansowane opcje
                    </legend>
                <label className="form__label">Liczba kolumn
                        <input
                        required
                        type="number"
                        step="1"
                        min="5"
                        max="25"
                        value={innerLineColumns}
                        onChange={({ target }) => setInnerLineColumns(+target.value)}
                        name="columnsNumber"
                        className="form__input" />
                </label>
                <label className="form__label">Liczba wierszy
                        <input
                        required
                        type="number"
                        step="1"
                        min="5"
                        max="20"
                        value={innerLineRows}
                        onChange={({ target }) => setInnerLineRows(+target.value)}
                        name="rowsNumber"
                        className="form__input" />
                </label>
                <label className="form__label">Liczba bomb
                        <input
                        required
                        type="number"
                        step="1"
                        min="5"
                        max="300"
                        value={bombsNumber}
                        onChange={({ target }) => setBombsNumber(+target.value)}
                        name="bombsNumber"
                        className="form__input" />
                </label>
                <span className="form__span"></span>
            </fieldset>
        </form>
    )
}
export default Form;