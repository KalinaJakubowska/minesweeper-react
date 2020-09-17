import React from "react";
import {
    Wrapper,
    Button,
    Fieldset,
    Legend,
    Label,
    Input,
    ErrorInfoText,
    ButtonWrapper,
} from "./styled";
import { useStateItem } from "./../useStateItem.js";

const Form = ({ getGameProperties, generateFields }) => {
    const [innerLineColumns, setInnerLineColumns] = useStateItem("innerLineColumns", 8);
    const [innerLineRows, setInnerLineRows] = useStateItem("innerLineRows", 8);
    const [bombsNumber, setBombsNumber] = useStateItem("bombsNumberForm", 10);
    const [isDisabled, setIsDisabled] = useStateItem("isDisabled", true);

    const onFormSubmit = (event) => {
        event.preventDefault();
        getGameProperties(bombsNumber, innerLineColumns, innerLineRows);
        generateFields();
    };

    const onButtonClick = (columns, rows, bombs, level) => {
        if (level === 4) {
            setIsDisabled(false);
            return 0;
        }
        setIsDisabled(true);
        setInnerLineColumns(columns);
        setInnerLineRows(rows);
        setBombsNumber(bombs);
    };

    return (
        <Wrapper onSubmit={onFormSubmit} className="form">
            <Button className="form__button">Rozpocznij nową grę</Button>
            <Fieldset className="form__fieldset">
                <Legend className="form__legend">
                    Zaawansowane opcje
                </Legend>
                <ButtonWrapper>
                    <Button onClick={() => onButtonClick(8, 8, 10, 1)}>Easy</Button>
                    <Button onClick={() => onButtonClick(16, 16, 40, 2)}>Medium</Button>
                    <Button onClick={() => onButtonClick(30, 16, 99, 3)}>Expert</Button>
                    <Button onClick={() => onButtonClick(8, 8, 10, 4)}>Custom</Button>
                </ButtonWrapper>

                <Label className="form__label">Liczba kolumn
                    <Input
                        disabled={isDisabled}
                        required
                        type="number"
                        step="1"
                        min="5"
                        max="30"
                        value={innerLineColumns}
                        onChange={({ target }) => setInnerLineColumns(+target.value)}
                        name="columnsNumber"
                        className="form__input"
                    />
                </Label>
                <Label className="form__label">Liczba wierszy
                    <Input
                        disabled={isDisabled}
                        required
                        type="number"
                        step="1"
                        min="5"
                        max="16"
                        value={innerLineRows}
                        onChange={({ target }) => setInnerLineRows(+target.value)}
                        name="rowsNumber"
                        className="form__input"
                    />
                </Label>
                <Label className="form__label">Liczba bomb
                    <Input
                        disabled={isDisabled}
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
    );
};
export default Form;