import React, { useState } from 'react';
import Form from "./Form";
import Game from "./Game";
import Footer from "./Footer";

function App() {
  const [gameFields, setGameFields] = useState([]);

  const [gameLineColumns, setGameLineColumns] = useState(10);
  const [gameLineRows, setGameLineRows] = useState(10);
  // const [bombsNumber, setBombsNumber] = useState(10);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);


  const revealField = (id) => {
    setGameFields(gameFields =>
      [
        ...gameFields.slice(0, id),
        { ...gameFields[id], hidden: false },
        ...gameFields.slice(id + 1),
      ])
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
    )
  };

  const generateFields = () => {
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

  const getGameProperties = (bombs, innerLineColumns, innerLineRows) => {
    setGameLineColumns(innerLineColumns + 2);
    setGameLineRows(innerLineRows + 2);
    // setBombsNumber(bombs);
    setGameFields([]);
    setIsGameWon(false);
    setIsGameLost(false);
  }

  return (
    <>
      <Game gameFields={gameFields}
        gameLineColumns={gameLineColumns}
        gameLineRows={gameLineRows}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        revealField={revealField}
      />
      <Form getGameProperties={getGameProperties} generateFields={generateFields} />
      <Footer />
    </>
  );
}

export default App;
