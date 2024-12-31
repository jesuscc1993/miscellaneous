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

const getSortedInlineListLine = (line, separator) => {
  let array = line.split(separator);

  if (inlineListSorterDiscardDuplicates.checked) {
    array = getDuplicateFreeArray(array);
  }

  return array
    .sort()
    .join(`${separator === LIST_COMMA_SEPARATOR ? COMMA : ''} `);
};

const getSortedInlineList = (inputString) => {
  const separator = getSeparator(inputString);

  return inputString
    .replace(new RegExp(` +(${separator}) +`, 'g'), '$1')
    .split(LINE_DELIMITER)
    .map((line) => getSortedInlineListLine(line, separator))
    .join(LINE_DELIMITER);
};

const getSeparator = (inputString) => {
  return inputString.match(LIST_COMMA_SEPARATOR)
    ? LIST_COMMA_SEPARATOR
    : LIST_SPACE_SEPARATOR;
};
