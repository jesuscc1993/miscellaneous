const stringBuilderInput = querySelector('#stringBuilderInput');
const stringBuilderOutput = querySelector('#stringBuilderOutput');
const stringBuilderKeepLineBreaks = querySelector(
  '#stringBuilderKeepLineBreaks'
);

const buildString = () => {
  const stringInput = stringBuilderInput.value;
  const keepLineBreaks = stringBuilderKeepLineBreaks.checked;

  const builtString = getBuiltString(stringInput, keepLineBreaks);
  stringBuilderOutput.value = builtString;

  replicateHeight(stringBuilderInput, stringBuilderOutput);
};

const getBuiltString = (input, keepLineBreaks) => {
  let lineBreakCharacter = '';

  if (keepLineBreaks) {
    lineBreakCharacter = '\\n';
  }

  return input
    ? input
        .replace(/"/g, '\\"')
        .replace(/\n/g, lineBreakCharacter + '" +\n"')
        .replace(/\n"" \+/g, '\n')
        .replace(/^|$/g, '"')
    : '';
};
