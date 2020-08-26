import React from "react";
import Timer from "./Timer";
import { Wrapper, Item } from "./styled.js";

const Display = ({ bombsLeft, gameLineColumns, timeData }) => (
    <Wrapper columns={gameLineColumns}>
        <Item>{bombsLeft}</Item>
        <Timer timeData={timeData} />
        <Item>X</Item>
    </Wrapper>
)

export default Display;