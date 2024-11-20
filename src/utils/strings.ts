export const isLetter = (str: string): boolean => {
  if (str.length !== 1) {
    return false;
  }

  const lowercasedStrCharCode = str.toLocaleLowerCase().charCodeAt(0);
  return lowercasedStrCharCode >= 97 && lowercasedStrCharCode <= 122;
};
