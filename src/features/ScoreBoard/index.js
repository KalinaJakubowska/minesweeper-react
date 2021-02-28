import React from "react";
import { useSelector } from "react-redux";
import { selectGameLevel } from "../gameSlice";
import { selectBestResult } from "./scoreBoardSlice";
import { ScoreBoardWrapper } from "./styled";

const ScoreBoard = () => {
  const bestResult = useSelector(selectBestResult);
  const currentLevel = useSelector(selectGameLevel);

  return (
    <ScoreBoardWrapper>
      {bestResult[currentLevel]?.toFixed(2)}
    </ScoreBoardWrapper>
  );
};

export default ScoreBoard;
