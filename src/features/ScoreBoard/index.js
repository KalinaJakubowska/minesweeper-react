import React from "react";
import { useSelector } from "react-redux";
import { selectGameLevel } from "../gameSlice";
import { selectBestResult } from "./scoreBoardSlice";
import { ScoreBoardWrapper, Header, BestResult } from "./styled";

const ScoreBoard = () => {
  const bestResult = useSelector(selectBestResult);
  const currentLevel = useSelector(selectGameLevel);

  return (
    <ScoreBoardWrapper>
      <Header>Best time</Header>
      <BestResult>{bestResult[currentLevel]?.toFixed(2) || "---"}</BestResult>
    </ScoreBoardWrapper>
  );
};

export default ScoreBoard;
