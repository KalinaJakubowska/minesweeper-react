import React, { useEffect } from "react";
import Form from "./Form";
import Game from "./Game";
import Footer from "./../common/Footer";
import Display from "./Display";
import { useDispatch } from "react-redux";
import { prepareGame } from "./gameSlice";
import ScoreBoard from "./ScoreBoard";
import { Wrapper } from "./styled";
import levelProperties from "./levelProperties";

const Minesweeper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(prepareGame(levelProperties.easy));
  }, [dispatch]);

  return (
    <Wrapper>
      <div>
        <Form />
        <Display />
        <Game />
        <Footer />
      </div>
      <ScoreBoard />
    </Wrapper>
  );
};

export default Minesweeper;
