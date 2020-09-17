import React from "react";
import Timer from "./Timer";
import { Wrapper, Item } from "./styled.js";
import { useSelector } from "react-redux";
import { selectGameData } from "../gameSlice";

const Display = ({
    bombsLeft,
    timeData,
    time,
    setTime,
    intervalRef
}) => {
    const { gameLineColumns } = useSelector(selectGameData);

    return (
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
    );
}

export default Display;