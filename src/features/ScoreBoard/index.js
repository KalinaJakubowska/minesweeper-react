import React from "react";
import { useSelector } from "react-redux";
import { selectBestResult } from "./scoreBoardSlice";
import { ScoreBoardWrapper } from "./styled";

const ScoreBoard = () => {
  const bestResult = useSelector(selectBestResult);

  return <ScoreBoardWrapper>{bestResult}</ScoreBoardWrapper>;
};

export default ScoreBoard;
