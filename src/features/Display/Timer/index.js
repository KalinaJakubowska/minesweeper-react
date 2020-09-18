import React, {useState, useEffect, useRef} from "react";
import { Wrapper } from "./styled.js";

const Timer = () => {

    const [timeData, setTimeData] = useState();
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);

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