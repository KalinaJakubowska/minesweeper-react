import React from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Button, Fieldset, Legend, ButtonWrapper } from "./styled";
import { prepareGame } from "./../gameSlice";
import levelProperties from "./../levelProperties";

const Form = () => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Fieldset>
        <Legend>Options</Legend>
        <ButtonWrapper>
          <Button onClick={() => dispatch(prepareGame(levelProperties.easy))}>
            Easy
          </Button>
          <Button onClick={() => dispatch(prepareGame(levelProperties.medium))}>
            Medium
          </Button>
          <Button onClick={() => dispatch(prepareGame(levelProperties.expert))}>
            Expert
          </Button>
        </ButtonWrapper>
        <Button onClick={() => dispatch(prepareGame())}>Start new game</Button>
        {/*<Label>
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
        </Label>*/}
      </Fieldset>
    </Wrapper>
  );
};
export default Form;
