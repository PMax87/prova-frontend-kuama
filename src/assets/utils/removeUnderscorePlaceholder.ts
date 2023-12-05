export const removeUnderscore = (item: string) => {
  const newPlaceholder = item.replace(/_/g, " ");
  return newPlaceholder;
};
