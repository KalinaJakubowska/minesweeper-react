import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectGameData,
  selectIsGameLost,
  selectIsGameWon,
} from "../../gameSlice.js";
import { Wrapper } from "./styled.js";

const Timer = () => {
  const isGameWon = useSelector(selectIsGameWon);
  const isGameLost = useSelector(selectIsGameLost);
  const { firstID } = useSelector(selectGameData);
  const [timeData, setTimeData] = useState({ startDate: 0, endDate: 0 });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isGameWon || isGameLost) {
      clearInterval(intervalRef.current);
    }
  }, [isGameWon, isGameLost]);

  useEffect(() => {
    if (firstID) {
      const start = new Date();
      intervalRef.current = setInterval(() => {
        setTimeData({ startDate: start, endDate: new Date() });
      }, 10);
    } else {
      setTimeData({ startDate: 0, endDate: 0 });
    }

    return () => clearInterval(intervalRef.current);
  }, [firstID]);

  return (
    <Wrapper>
      {((timeData.endDate - timeData.startDate) / 1000).toFixed(2)}
    </Wrapper>
  );
};
export default Timer;
