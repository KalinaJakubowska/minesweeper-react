import store from "./../../store";

export default (index) => {
  const { gameLineColumns } = store.getState().gameData;
  const idsAroundFieldTemplate = [
    gameLineColumns * -1 - 1,
    gameLineColumns * -1,
    gameLineColumns * -1 + 1,
    -1,
    1,
    gameLineColumns - 1,
    gameLineColumns,
    gameLineColumns + 1,
  ];
  return idsAroundFieldTemplate.map((id) => id + index);
};
