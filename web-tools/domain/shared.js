const getDuplicateFreeArray = (array) => {
  return array.filter((entry, i) => array.indexOf(entry) === i);
};

const stringify = (json) => {
  return JSON.stringify(json, undefined, 2);
};

const toNumber = (string) => {
  const value = Number(string);
  return isNaN(value) ? undefined : value;
};
