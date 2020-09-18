let gameFields = []

const createNewField = (payload) => {
    gameFields.push(
        {
            id: gameFields.length,
            type: payload[0],
            hidden: payload[1],
            bombsAround: 0,
            rightClicked: false,
        }
    );
};

export const generateFields = (gameLineColumns, gameLineRows) => {
    gameFields = [];
    for (let i = 0; i < gameLineRows; i++) {
        for (let y = 0; y < gameLineColumns; y++) {
            if (y === 0 || y === (gameLineColumns - 1) || i === 0 || i === (gameLineRows - 1)) {
                createNewField(["border", false]);
            } else {
                createNewField(["field", true]);
            }
        }
    };

    return gameFields;
};