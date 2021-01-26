export default (index, gameLineColumns) => {
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
