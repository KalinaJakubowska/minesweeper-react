import React, { useState } from 'react';
import Form from "./Form";
import Game from "./Game";
import Footer from "./Footer";

function App() {
  const [gameFields, setGameFields] = useState([]);
  const [gameLineColumns, setGameLineColumns] = useState(10);
  const [gameLineRows, setGameLineRows] = useState(10);
  const [bombsNumber, setBombsNumber] = useState(10);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);

  const getGameProperties = (bombsNumber, innerLineColumns, innerLineRows) => {
    setGameLineColumns(innerLineColumns + 2);
    setGameLineRows(innerLineRows + 2);
    setBombsNumber(bombsNumber);
    setIsGameWon(false);
    setIsGameLost(false);
  }

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
        isGameWon={isGameWon}
        setIsGameWon={setIsGameWon}
      />
      <Form
        getGameProperties={getGameProperties}
        setGameFields={setGameFields}
        gameLineColumns={gameLineColumns}
        gameLineRows={gameLineRows} />
      <Footer />
    </>
  );
}

export default App;
