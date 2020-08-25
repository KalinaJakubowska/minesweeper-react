import React, { useState, useEffect } from "react";
import { Wrapper, Button, Fieldset, Legend, Label, Input, ErrorInfoText } from "./styled";

const Form = ({ getGameProperties, gameLineColumns, gameLineRows, generateFields }) => {
    const [innerLineColumns, setInnerLineColumns] = useState(8);
    const [innerLineRows, setInnerLineRows] = useState(8);
    const [bombsNumber, setBombsNumber] = useState(10);

    useEffect(() => {
        generateFields();
    }, [bombsNumber, gameLineColumns, gameLineRows])

    const onFormSubmit = (event) => {
        event.preventDefault();
        getGameProperties(bombsNumber, innerLineColumns, innerLineRows);
        generateFields();
    }

    return (
        <Wrapper onSubmit={onFormSubmit} className="form">
            <Button className="form__button">Rozpocznij nową grę</Button>
            <Fieldset className="form__fieldset">
                <Legend className="form__legend">
                    Zaawansowane opcje
                </Legend>
                <Label className="form__label">Liczba kolumn
                    <Input
                        required
                        type="number"
                        step="1"
                        min="5"
                        max="25"
                        value={innerLineColumns}
                        onChange={({ target }) => setInnerLineColumns(+target.value)}
                        name="columnsNumber"
                        className="form__input"
                    />
                </Label>
                <Label className="form__label">Liczba wierszy
                    <Input
                        required
                        type="number"
                        step="1"
                        min="5"
                        max="20"
                        value={innerLineRows}
                        onChange={({ target }) => setInnerLineRows(+target.value)}
                        name="rowsNumber"
                        className="form__input"
                    />
                </Label>
                <Label className="form__label">Liczba bomb
                    <Input
                        required
                        type="number"
                        step="1"
                        min="5"
                        max="300"
                        value={bombsNumber}
                        onChange={({ target }) => setBombsNumber(+target.value)}
                        name="bombsNumber"
                        className="form__input"
                    />
                </Label>
                <ErrorInfoText className="form__span"></ErrorInfoText>
            </Fieldset>
        </Wrapper>
    )
}
export default Form;