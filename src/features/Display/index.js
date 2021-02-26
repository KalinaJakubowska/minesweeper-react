import React from "react";
import Timer from "./Timer";
import { Wrapper, Item } from "./styled.js";
import { useSelector } from "react-redux";
import { selectGameData, selectBombsLeft } from "../gameSlice";

const Display = () => {
    const { columns } = useSelector(selectGameData);

    const bombsLeft = useSelector(selectBombsLeft);

    return (
        <Wrapper columns={columns}>
            <Item>{bombsLeft}</Item>
            <Timer />
            <Item />
        </Wrapper>
    );
};

export default Display;