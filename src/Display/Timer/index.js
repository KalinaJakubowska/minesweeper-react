import React, {useEffect} from "react";
import { Wrapper } from "./styled.js";

const Timer = ({
    isGameLost,
    isGameWon,
    timeData,
    time,
    setTime,
    intervalRef }) => {

    useEffect(() => {
        clearInterval(intervalRef.current);
    }, [isGameLost, isGameWon])

    useEffect(() => {
        if (timeData) {
            if (timeData.endDate) {
                clearInterval(intervalRef.current);
                setTime(timeData.endDate - timeData.startDate)
            } else {
                intervalRef.current = setInterval(() => {
                    setTime(new Date() - timeData.startDate)
                }, 10)
            }
        }

        return () => clearInterval(intervalRef.current);
    }, [timeData])

    return (
        <Wrapper>{(time / 1000).toFixed(2)}</Wrapper>
    );
}
export default Timer;