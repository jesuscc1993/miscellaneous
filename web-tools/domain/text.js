const lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

const splitSortAndJoin = (string, delimiter) => {
  return string.split(delimiter).sort().join(delimiter);
};

const uppercaseWords = (string) => {
  return string.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const uppercaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
