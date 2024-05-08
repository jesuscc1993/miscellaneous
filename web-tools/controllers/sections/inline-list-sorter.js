const unsortedInlineListInput = querySelector('#unsortedInlineListInput');
const sortedInlineListOutput = querySelector('#sortedInlineListOutput');
const inlineListSorterDiscardDuplicates = querySelector(
  '#inlineListSorterDiscardDuplicates'
);

const sortInlineList = () => {
  const unsortedInlineList = unsortedInlineListInput.value;

  const sortedLines = getSortedInlineList(unsortedInlineList);
  sortedInlineListOutput.value = sortedLines;

  replicateHeight(unsortedInlineListInput, sortedInlineListOutput);
};

const getSortedInlineListLine = (line) => {
  let array = line.split(LIST_SEPARATOR);

  if (inlineListSorterDiscardDuplicates.checked) {
    array = getDuplicateFreeArray(array);
  }

  return array.sort().join(', ');
};

const getSortedInlineList = (inputString) => {
  return inputString
    .replace(new RegExp(` +(${LIST_SEPARATOR}) +`, 'g'), '$1')
    .split(LINE_DELIMITER)
    .map(getSortedInlineListLine)
    .join(LINE_DELIMITER);
};
