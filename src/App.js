import React, { useState } from 'react';
import Form from "./Form";
import Game from "./Game";
import Footer from "./Footer";

function App() {
  const [gameFields, setGameFields] = useState([]);
  const [gameLineColumns, setGameLineColumns] = useState(10);
  const [gameLineRows, setGameLineRows] = useState(10);
  const [bombsNumber, setBombsNumber] = useState(10);
  const [isGameLost, setIsGameLost] = useState(false);
  const [gameSize, setGameSize] = useState(gameLineColumns * gameLineRows);
  const [isItBeforeFirstLeftClick, setIsItBeforeFirstLeftClick] = useState(true);

  const getGameProperties = (bombsNumber, innerLineColumns, innerLineRows) => {
    setGameLineColumns(innerLineColumns + 2);
    setGameLineRows(innerLineRows + 2);
    setBombsNumber(bombsNumber);
    setIsGameLost(false);
    setIsItBeforeFirstLeftClick(true);
    setGameSize((innerLineColumns + 2) * (innerLineRows + 2));
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

  const revealField = (id) => {
    setGameFields(gameFields =>
      [
        ...gameFields.slice(0, id),
        { ...gameFields[id], hidden: false },
        ...gameFields.slice(id + 1),
      ])
  };

  const checkField = (id) => {
    if (isItBeforeFirstLeftClick) {
      generateBombsPlaces(id);
      setIsItBeforeFirstLeftClick(false);
      return 0;
    }

    if (gameFields[id].type === "bomb") {
      setIsGameLost(true);
    } else if (gameFields[id].bombsAround === 0) {
      revealField(id);//reveal empty fields
    } else {
      revealField(id);
    }
  }

  const countBombsAroundFields = (newGameFields) => {
    for (let i = 0; i < gameSize; i++) {
      if (gameFields[i].type === "field") {

        const bombsAroundNumber = idsAroundSelectedField(i)
          .map(id => +(newGameFields[id].type === "bomb"))
          .reduce((acc, curr) => acc + curr);

        newGameFields = [
          ...newGameFields.slice(0, i),
          { ...newGameFields[i], bombsAround: bombsAroundNumber },
          ...newGameFields.slice(i + 1),
        ]
      }
    }
    setGameFields(newGameFields);
  };

  const generateBombsPlaces = (id) => {
    const emptyFields = idsAroundSelectedField(id);
    let newGameFields = [
      ...gameFields.slice(0, id),
      { ...gameFields[id], hidden: false },
      ...gameFields.slice(id + 1),
    ]
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
    countBombsAroundFields(newGameFields);
  };

  const createNewField = (type, hidden = true, bombsAround = 0, rightClicked = false) => {
    setGameFields(gameFields => [
      ...gameFields,
      {
        id: gameFields.length,
        type,
        hidden,
        bombsAround,
        rightClicked,
      }]
    );
  };

  const generateFields = () => {
    setGameFields([]);
    for (let i = 0; i < gameLineRows; i++) {
      for (let y = 0; y < gameLineColumns; y++) {
        if (y === 0 || y === (gameLineColumns - 1) || i === 0 || i === (gameLineRows - 1)) {
          createNewField("border", false);
        } else {
          createNewField("field", true, 0);
        }
      }
    }
  };



  return (
    <>
      <Game
        gameFields={gameFields}
        setGameFields={setGameFields}
        bombsNumber={bombsNumber}
        gameLineColumns={gameLineColumns}
        gameLineRows={gameLineRows}
        isGameLost={isGameLost}
        setIsGameLost={setIsGameLost}
        gameSize={gameSize}
        isItBeforeFirstLeftClick={isItBeforeFirstLeftClick}
        setIsItBeforeFirstLeftClick={setIsItBeforeFirstLeftClick}
        checkField={checkField}
      />
      <Form
        getGameProperties={getGameProperties}
        setGameFields={setGameFields}
        gameLineColumns={gameLineColumns}
        gameLineRows={gameLineRows}
        generateFields={generateFields} />
      <Footer />
    </>
  );
}

export default App;
