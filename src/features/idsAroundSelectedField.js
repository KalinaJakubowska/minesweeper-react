export default (index, columns) => {
  const idsAroundFieldTemplate = [
    columns * -1 - 1,
    columns * -1,
    columns * -1 + 1,
    -1,
    1,
    columns - 1,
    columns,
    columns + 1,
  ];
  return idsAroundFieldTemplate.map((id) => id + index);
};
