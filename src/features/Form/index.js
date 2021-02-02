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
import { generateEmptyFields, setGameProperties } from "./../gameSlice";
import levelProperties from "./levelProperties";

const Form = () => {
  const [innerLineColumns, setInnerLineColumns] = useStateItem(
    "innerLineColumns",
    8
  );
  const [innerLineRows, setInnerLineRows] = useStateItem("innerLineRows", 8);
  const [bombsNumber, setBombsNumber] = useStateItem("bombsNumberForm", 10);
  const gameLineColumns = innerLineColumns + 2;
  const gameLineRows = innerLineRows + 2;

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(setGameProperties({ bombsNumber, gameLineColumns, gameLineRows }));
    dispatch(generateEmptyFields());
  };

  const onButtonClick = ({ columns, rows, bombs }) => {
    setInnerLineColumns(columns);
    setInnerLineRows(rows);
    setBombsNumber(bombs);
  };

  return (
    <Wrapper onSubmit={onFormSubmit}>
      <Button>Start new game</Button>
      <Fieldset>
        <Legend>Options</Legend>
        <ButtonWrapper>
          <Button onClick={() => onButtonClick(levelProperties.easy)}>
            Easy
          </Button>
          <Button onClick={() => onButtonClick(levelProperties.medium)}>
            Medium
          </Button>
          <Button onClick={() => onButtonClick(levelProperties.expert)}>
            Expert
          </Button>
        </ButtonWrapper>

        <Label>
          Columns
          <Input
            disabled
            required
            type="number"
            value={innerLineColumns}
            name="columnsNumber"
          />
        </Label>
        <Label>
          Rows
          <Input
            disabled
            required
            type="number"
            value={innerLineRows}
            name="rowsNumber"
          />
        </Label>
        <Label>
          Bombs
          <Input
            disabled
            required
            type="number"
            value={bombsNumber}
            name="bombsNumber"
          />
        </Label>
        <ErrorInfoText />
      </Fieldset>
    </Wrapper>
  );
};
export default Form;
