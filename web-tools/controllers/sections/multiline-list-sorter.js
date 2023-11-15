const unsortedMultilineListInput = jQuery('#unsortedMultilineListInput');
const sortedMultilineListOutput = jQuery('#sortedMultilineListOutput');
const multilineListSorterDiscardDuplicates = jQuery(
  '#multilineListSorterDiscardDuplicates'
);

const sortMultilineList = () => {
  const unsortedMultilineList = unsortedMultilineListInput.val();

  const sortedLines = getSortedMultilineList(unsortedMultilineList);
  sortedMultilineListOutput.val(sortedLines);

  replicateHeight(unsortedMultilineListInput, sortedMultilineListOutput);
};

const getSortedMultilineList = (inputString) => {
  let array = inputString.split(LINE_DELIMITER);

  if (multilineListSorterDiscardDuplicates.prop('checked')) {
    array = getDuplicateFreeArray(array);
  }

  return array.sort().join('\n');
};
