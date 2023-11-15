const unsortedJsonInput = jQuery('#unsortedJsonInput');
const sortedJsonOutput = jQuery('#sortedJsonOutput');
const jsonSorterDiscardDuplicates = jQuery('#jsonSorterDiscardDuplicates');

const sortJson = () => {
  const unsortedJson = unsortedJsonInput.val();

  try {
    const sortedJson = getSortedJson(unsortedJson);
    sortedJsonOutput.val(sortedJson);
  } catch {
    sortedJsonOutput.val('');
  }

  replicateHeight(unsortedJsonInput, sortedJsonOutput);
};

const getSortedJson = (inputString) => {
  const json = JSON.parse(inputString);
  const sortedJson = getPropertiesRecursivelySorted(json);
  return stringify(sortedJson, undefined, 2);
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
