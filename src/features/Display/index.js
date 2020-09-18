import React, { useState, useRef } from "react";
import Timer from "./Timer";
import { Wrapper, Item } from "./styled.js";
import { useSelector } from "react-redux";
import { selectGameData, selectBombsLeft } from "../gameSlice";

const Display = () => {
    const { gameLineColumns } = useSelector(selectGameData);

    const bombsLeft = useSelector(selectBombsLeft);

    return (
        <Wrapper columns={gameLineColumns}>
            <Item>{bombsLeft}</Item>
            <Timer />
            <Item>X</Item>
        </Wrapper>
    );
};

export default Display;