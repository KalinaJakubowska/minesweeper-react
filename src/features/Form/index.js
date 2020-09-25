import React from "react";
import { useDispatch } from "react-redux";
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
import { useStateItem } from "./../../useStateItem.js";
import { setGameFields, setGameProperties } from "./../gameSlice";
import { generateFields } from "./../generateFields";

const Form = () => {
    const [innerLineColumns, setInnerLineColumns] = useStateItem("innerLineColumns", 8);
    const [innerLineRows, setInnerLineRows] = useStateItem("innerLineRows", 8);
    const [bombsNumber, setBombsNumber] = useStateItem("bombsNumberForm", 10);
    const [isDisabled, setIsDisabled] = useStateItem("isDisabled", true);
    const gameLineColumns = innerLineColumns + 2;
    const gameLineRows = innerLineRows + 2;

    const dispatch = useDispatch();

    const startNewGame = () => {
        dispatch(setGameFields(generateFields(gameLineColumns, gameLineRows)));
    };

    const onFormSubmit = event => {
        event.preventDefault();
        dispatch(setGameProperties({ bombsNumber, gameLineColumns, gameLineRows }));
        startNewGame();
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
        <Wrapper onSubmit={onFormSubmit}>
            <Button>Rozpocznij nową grę</Button>
            <Fieldset>
                <Legend>
                    Zaawansowane opcje
                </Legend>
                <ButtonWrapper>
                    <Button onClick={() => onButtonClick(8, 8, 10, 1)}>Easy</Button>
                    <Button onClick={() => onButtonClick(16, 16, 40, 2)}>Medium</Button>
                    <Button onClick={() => onButtonClick(30, 16, 99, 3)}>Expert</Button>
                    <Button onClick={() => onButtonClick(8, 8, 10, 4)}>Custom</Button>
                </ButtonWrapper>

                <Label>Liczba kolumn
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
                    />
                </Label>
                <Label>Liczba wierszy
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
                    />
                </Label>
                <Label>Liczba bomb
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
                    />
                </Label>
                <ErrorInfoText />
            </Fieldset>
        </Wrapper>
    );
};
export default Form;