import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectIsGameLost, selectIsGameStarted, selectIsGameWon } from "../../gameSlice.js";
import { Wrapper } from "./styled.js";

const Timer = () => {
    const isGameWon = useSelector(selectIsGameWon);
    const isGameLost = useSelector(selectIsGameLost);
    const isGameStarted = useSelector(selectIsGameStarted);
    const [timeData, setTimeData] = useState({ startDate: 0, endDate: 0 });
    const intervalRef = useRef(null);


    useEffect(() => {
        if (isGameWon || isGameLost) {
            clearInterval(intervalRef.current);
        }
    }, [isGameWon, isGameLost]);

    useEffect(() => {
        if (!isGameStarted) {
            const start = new Date();
            intervalRef.current = setInterval(() => {
                setTimeData({ startDate: start, endDate: new Date() })
            }, 10)
        } else {
            setTimeData({ startDate: 0, endDate: 0 });
        }

        return () => clearInterval(intervalRef.current);
    }, [isGameStarted]);

    return (
        <Wrapper>{((timeData.endDate - timeData.startDate) / 1000).toFixed(2)}</Wrapper>
    );
}
export default Timer;