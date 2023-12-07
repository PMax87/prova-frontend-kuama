export const removeUnderscore = (item: string): string => {
  const tempPlaceholder = item.replace(/_/g, " ");
  let newPlaceHolder = "";

  for (let i = 0; i < tempPlaceholder.length; i++) {
    if (i === 0) {
      newPlaceHolder += tempPlaceholder.charAt(i).toUpperCase();
    } else {
      newPlaceHolder += tempPlaceholder.charAt(i);
    }
  }

  return newPlaceHolder;
};
