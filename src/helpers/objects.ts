export const changeNameKeyFromArray = (
  array: Array<never>,
  oldKey: string,
  newKey: string
) => {
  let newArray = array.slice(0);
  for (let i = 0; i < newArray.length; i++) {
    newArray[i][newKey] = newArray[i][oldKey];
    delete newArray[i][oldKey];
  }
  return newArray;
};
