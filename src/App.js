import React, { useState, useEffect, useRef } from 'react';
import Form from "./features/Form";
import Game from "./features/Game";
import Footer from "./common/Footer";
import Display from "./features/Display";
import { GlobalStyle } from "./GlobalStyle.js";
import { ThemeProvider } from "styled-components";
import { theme } from "./common/Footer/theme.js";
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGameData,
  selectGameFields,
  selectIsGameLost,
  selectIsGameWon,
  setGameFields,
  setIsGameLost,
  selectIsGameStarted,
  setIsGameWon,
  revealField,
} from './features/gameSlice';
import { generateFields } from './features/generateFields';

function App() {
  const gameFields = useSelector(selectGameFields);
  const isGameLost = useSelector(selectIsGameLost);
  const isGameWon = useSelector(selectIsGameWon);
  const isGameStarted = useSelector(selectIsGameStarted);
  const { gameLineColumns, gameLineRows, bombsNumber } = useSelector(selectGameData);

  const [timeData, setTimeData] = useState();
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const gameSize = gameLineColumns * gameLineRows;

  const dispatch = useDispatch();

  const startNewGame = () => {
    dispatch(setGameFields(generateFields(gameLineColumns, gameLineRows)));
  };

  useEffect(() => {
    dispatch(setGameFields(generateFields(gameLineColumns, gameLineRows)));
  }, [bombsNumber, gameLineColumns, gameLineRows])

  useEffect(() => {
    if (gameFields.filter(({ hidden }) => hidden).length === bombsNumber && !isGameLost) {
      dispatch(setIsGameWon(true));
      revealAllBombs();
      setTimeData({ ...timeData, endDate: new Date() })
    }

    if (gameFields.filter(({ type }) => type === "bomb").find(({ hidden }) => hidden === false)
      && !isGameWon
      && !isGameLost) {
      dispatch(setIsGameLost(true));
      revealAllBombs();
      setTimeData({ ...timeData, endDate: new Date() })
    }
  }, [gameFields]);

  const idsAroundSelectedField = (index) => {
    const idsAroundFieldTemplate = [
      (gameLineColumns * (-1) - 1),
      (gameLineColumns * (-1)),
      (gameLineColumns * (-1) + 1),
      -1,
      1,
      (gameLineColumns - 1),
      (gameLineColumns),
      (gameLineColumns + 1)
    ];
    return idsAroundFieldTemplate.map(id => id + index);
  };

  const revealAllEmptyFieldsInGroup = (id, newGameFields = [...gameFields]) => {
    const revealFieldAndFieldsAround = (fieldIndex) => {
      if (newGameFields[fieldIndex].rightClicked === false) {
        newGameFields = [
          ...newGameFields.slice(0, fieldIndex),
          { ...newGameFields[fieldIndex], hidden: false },
          ...newGameFields.slice(fieldIndex + 1),
        ]
      }

      for (const id of idsAroundSelectedField(fieldIndex)) {
        if (newGameFields[id].type === "field"
          && newGameFields[id].bombsAround === 0
          && newGameFields[id].hidden === true
          && newGameFields[id].rightClicked === false) {
          revealFieldAndFieldsAround(id);

        } else if (newGameFields[id].hidden === true
          && newGameFields[id].rightClicked === false) {

          newGameFields = [
            ...newGameFields.slice(0, id),
            { ...newGameFields[id], hidden: false },
            ...newGameFields.slice(id + 1),
          ]
        }
      }
    };
    revealFieldAndFieldsAround(id);
    dispatch(setGameFields(newGameFields));
  };

  const revealAllBombs = () => {
    for (let i = 0; i < gameSize; i++) {
      if (gameFields[i].type === "bomb") {
        dispatch(revealField(i));
      }
    }
  };

  const checkField = (id) => {
    if (isGameStarted && !gameFields[id].rightClicked) {
      generateBombsPlaces(id);
      setTimeData({ startDate: new Date() });
      return 0;
    }
    if (gameFields[id].rightClicked) {
      return 0;
    }

    if (gameFields[id].bombsAround === 0
      && gameFields[id].type !== "bomb") {
      revealAllEmptyFieldsInGroup(id);
    } else {
      dispatch(revealField(id));
    }
  };

  const countBombsAroundField = (i, newGameFields = [...gameFields]) => {
    return idsAroundSelectedField(i)
      .map(id => +(newGameFields[id].type === "bomb"))
      .reduce((acc, curr) => acc + curr);
  };

  const countRightClickedAroundField = (id) => {
    return idsAroundSelectedField(id)
      .map(id => +(gameFields[id].rightClicked))
      .reduce((acc, curr) => acc + curr);
  };

  const onDoubleClick = (id) => {
    if (gameFields[id].type === "field"
      && countRightClickedAroundField(id) === gameFields[id].bombsAround
      && !gameFields[id].rightClicked) {
      revealAllEmptyFieldsInGroup(id);
    }
  };

  const countBombsAroundAllFields = (newGameFields, firstID) => {
    for (let i = 0; i < gameSize; i++) {
      if (newGameFields[i].type === "field") {

        newGameFields = [
          ...newGameFields.slice(0, i),
          {
            ...newGameFields[i],
            bombsAround: countBombsAroundField(i, newGameFields)
          },
          ...newGameFields.slice(i + 1),
        ]
      }
    }
    revealAllEmptyFieldsInGroup(firstID, newGameFields);
  };

  const generateBombsPlaces = (id) => {
    const emptyFields = idsAroundSelectedField(id);
    let newGameFields = [...gameFields];
    let newBomb;
    for (let i = 1; i <= bombsNumber; i++) {
      newBomb = Math.floor(Math.random() * gameSize);
      while (newGameFields[newBomb].type !== "field"
        || newBomb === id
        || emptyFields.includes(newBomb)) {
        newBomb = Math.floor(Math.random() * gameSize);
      }
      newGameFields =
        [
          ...newGameFields.slice(0, newBomb),
          { ...newGameFields[newBomb], type: "bomb" },
          ...newGameFields.slice(newBomb + 1),
        ]
    }
    countBombsAroundAllFields(newGameFields, id);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Display
        timeData={timeData}
        time={time}
        setTime={setTime}
        intervalRef={intervalRef}
      ></Display>
      <Game
        checkField={checkField}
        onDoubleClick={onDoubleClick}
      />
      <Form
        startNewGame={startNewGame} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
