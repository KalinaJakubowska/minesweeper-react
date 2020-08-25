import React from "react";
import Timer from "./Timer";
import { Wrapper } from "./styled.js";

const Display = ({ bombsLeft, gameLineColumns }) => (
    <Wrapper columns={gameLineColumns}>
        <p>{bombsLeft}</p>
        <p>You won/lost</p>
        <Timer>timer</Timer>
    </Wrapper>
)

export default Display;