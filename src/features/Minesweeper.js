import React, { useEffect } from "react";
import Form from "./Form";
import Game from "./Game";
import Footer from "./../common/Footer";
import Display from "./Display";
import { useDispatch } from "react-redux";
import { generateEmptyFields } from "./gameSlice";
import ScoreBoard from "./ScoreBoard";
import { Wrapper } from "./styled";

const Minesweeper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateEmptyFields());
  }, [dispatch]);

  return (
    <Wrapper>
      <div>
        <Display />
        <Game />
        <Form />
        <Footer />
      </div>
      <ScoreBoard />
    </Wrapper>
  );
};

export default Minesweeper;
