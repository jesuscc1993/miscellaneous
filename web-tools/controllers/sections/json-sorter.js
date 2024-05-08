const unsortedJsonInput = querySelector('#unsortedJsonInput');
const sortedJsonOutput = querySelector('#sortedJsonOutput');
const jsonSorterDiscardDuplicates = querySelector(
  '#jsonSorterDiscardDuplicates'
);

const sortJson = () => {
  const unsortedJson = unsortedJsonInput.value;

  try {
    const sortedJson = getSortedJson(unsortedJson);
    sortedJsonOutput.value = sortedJson;
  } catch {
    sortedJsonOutput.value = INVALID_JSON_MESSAGE;
  }

  replicateHeight(unsortedJsonInput, sortedJsonOutput);
};

const getSortedJson = (inputString) => {
  const json = stringToJson(inputString);
  const sortedJson = getPropertiesRecursivelySorted(json);
  return stringify(sortedJson);
};

const getPropertiesRecursivelySorted = (json) => {
  const sortedJson = {};

  Object.keys(json)
    .sort()
    .forEach((key) => {
      const value = json[key];
      sortedJson[key] = Array.isArray(value)
        ? value.sort()
        : typeof value === 'object'
        ? getPropertiesRecursivelySorted(value)
        : value;
    });

  return sortedJson;
};
