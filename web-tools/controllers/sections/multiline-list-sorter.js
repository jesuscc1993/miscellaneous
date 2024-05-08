const unsortedMultilineListInput = querySelector('#unsortedMultilineListInput');
const sortedMultilineListOutput = querySelector('#sortedMultilineListOutput');
const multilineListSorterDiscardDuplicates = querySelector(
  '#multilineListSorterDiscardDuplicates'
);

const sortMultilineList = () => {
  const unsortedMultilineList = unsortedMultilineListInput.value;
  const duplicateFree = multilineListSorterDiscardDuplicates.checked;

  const sortedLines = getSortedMultilineList(
    unsortedMultilineList,
    duplicateFree
  );
  sortedMultilineListOutput.value = sortedLines;

  replicateHeight(unsortedMultilineListInput, sortedMultilineListOutput);
};

const getSortedMultilineList = (inputString, duplicateFree) => {
  let array = inputString.split('\n');

  if (duplicateFree) {
    array = getDuplicateFreeArray(array);
  }

  return array.sort().join('\n');
};
