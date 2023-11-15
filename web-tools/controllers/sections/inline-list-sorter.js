const unsortedInlineListInput = jQuery('#unsortedInlineListInput');
const sortedInlineListOutput = jQuery('#sortedInlineListOutput');
const inlineListSorterDiscardDuplicates = jQuery(
  '#inlineListSorterDiscardDuplicates'
);

const sortInlineList = () => {
  const unsortedInlineList = unsortedInlineListInput.val();

  const sortedLines = getSortedInlineList(unsortedInlineList);
  sortedInlineListOutput.val(sortedLines);

  replicateHeight(unsortedInlineListInput, sortedInlineListOutput);
};

const getSortedInlineListLine = (line) => {
  let array = line.split(LIST_SEPARATOR);

  if (inlineListSorterDiscardDuplicates.prop('checked')) {
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
