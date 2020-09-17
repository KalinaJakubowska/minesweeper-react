import React, { useState, useEffect, useRef } from 'react';
import Form from "./Form";
import Game from "./Game";
import Footer from "./Footer";
import Display from "./Display";
import { GlobalStyle } from "./GlobalStyle.js";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.js";
import { useStateItem } from "./useStateItem.js";
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGameData,
  selectGameFields,
  setGameFields,
  createNewField,
  revealField
} from './gameSlice';

function App() {
  const gameFields = useSelector(selectGameFields);

  const [gameLineColumns, setGameLineColumns] = useStateItem("gameLineColumns", 10);
  const [gameLineRows, setGameLineRows] = useStateItem("gameLineRows", 10);
  const [bombsNumber, setBombsNumber] = useStateItem("bombsNumber", 10);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [gameSize, setGameSize] = useState(gameLineColumns * gameLineRows);
  const [isItBeforeFirstLeftClick, setIsItBeforeFirstLeftClick] = useState(true);
  const [bombsLeft, setBombsLeft] = useState(10);
  const [timeData, setTimeData] = useState();
  const [time, setTime] = useState(0);
  const [bestResults, setBestResults] = useState([]);
  const intervalRef = useRef(null);
  const gameData = useSelector(selectGameData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isGameWon) {
      setBombsLeft(bombsNumber - gameFields.filter(({ rightClicked }) => rightClicked).length)
    }

    if (gameFields.filter(({ hidden }) => hidden).length === bombsNumber && !isGameLost) {
      setIsGameWon(true);
      setBombsLeft(0);
      revealAllBombs();
      setTimeData({ ...timeData, endDate: new Date() })
    }

    if (gameFields.filter(({ type }) => type === "bomb").find(({ hidden }) => hidden === false)
      && !isGameWon
      && !isGameLost) {
      setIsGameLost(true);
      revealAllBombs();
      setTimeData({ ...timeData, endDate: new Date() })
    }
  }, [gameFields])

  const getGameProperties = (bombsNumber, innerLineColumns, innerLineRows) => {
    setGameLineColumns(innerLineColumns + 2);
    setGameLineRows(innerLineRows + 2);
    setBombsNumber(bombsNumber);
    setIsGameLost(false);
    setIsGameWon(false);
    setIsItBeforeFirstLeftClick(true);
    setGameSize((innerLineColumns + 2) * (innerLineRows + 2));
    setTime(0);
    clearInterval(intervalRef.current);
  }

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
    if (isItBeforeFirstLeftClick && !gameFields[id].rightClicked) {
      generateBombsPlaces(id);
      setIsItBeforeFirstLeftClick(false);
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
    let newGameFields = [...gameFields]
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

  const generateFields = () => {
    dispatch(setGameFields([]));
    for (let i = 0; i < gameLineRows; i++) {
      for (let y = 0; y < gameLineColumns; y++) {
        if (y === 0 || y === (gameLineColumns - 1) || i === 0 || i === (gameLineRows - 1)) {
          dispatch(createNewField(["border", false]));
        } else {
          dispatch(createNewField(["field", true]));
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Display
        bombsLeft={bombsLeft}
        gameLineColumns={gameLineColumns}
        timeData={timeData}
        time={time}
        setTime={setTime}
        intervalRef={intervalRef}
        bestResults={bestResults}
        setBestResults={setBestResults}
      ></Display>
      <Game
        gameLineColumns={gameLineColumns}
        gameLineRows={gameLineRows}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        checkField={checkField}
        onDoubleClick={onDoubleClick}
      />
      <Form
        getGameProperties={getGameProperties}
        gameLineColumns={gameLineColumns}
        gameLineRows={gameLineRows}
        generateFields={generateFields} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
