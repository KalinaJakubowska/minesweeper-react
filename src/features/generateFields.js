let gameFields = [];

const createNewField = ({ type, hidden }) => {
  gameFields.push({
    id: gameFields.length,
    type,
    hidden,
    bombsAround: 0,
    rightClicked: false,
  });
};

export const generateFields = (gameLineColumns, gameLineRows) => {
  gameFields = [];
  for (let i = 0; i < gameLineRows; i++) {
    for (let y = 0; y < gameLineColumns; y++) {
      if (
        y === 0 ||
        y === gameLineColumns - 1 ||
        i === 0 ||
        i === gameLineRows - 1
      ) {
        createNewField({ type: "border", hidden: false });
      } else {
        createNewField({ type: "field", hidden: true });
      }
    }
  }

  return gameFields;
};
