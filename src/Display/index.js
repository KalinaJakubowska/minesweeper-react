import React from "react";
import Timer from "./Timer";
import { Wrapper, Item } from "./styled.js";

const Display = ({
    bombsLeft,
    gameLineColumns,
    timeData,
    time,
    setTime,
    intervalRef }) => (
        <Wrapper columns={gameLineColumns}>
            <Item>{bombsLeft}</Item>
            <Timer
                timeData={timeData}
                time={time}
                setTime={setTime}
                intervalRef={intervalRef}
            />
            <Item>X</Item>
        </Wrapper>
    )

export default Display;