export const removeUnderscore = (item) => {
  let newPlaceholder = "";

  for (let i = 0; i < item.length; i++) {
    newPlaceholder = item[i].replace("_", " ");
    console.log(item[i]);
  }
  return newPlaceholder;
};
