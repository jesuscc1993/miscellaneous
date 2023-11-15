const stringBuilderInput = jQuery('#stringBuilderInput');
const stringBuilderOutput = jQuery('#stringBuilderOutput');
const stringBuilderKeepLineBreaks = jQuery('#stringBuilderKeepLineBreaks');

const buildString = () => {
  const stringInput = stringBuilderInput.val();

  const builtString = getBuiltString(stringInput);
  stringBuilderOutput.val(builtString);

  replicateHeight(stringBuilderInput, stringBuilderOutput);
};

const getBuiltString = (input) => {
  let lineBreakCharacter = '';

  if (stringBuilderKeepLineBreaks.prop('checked')) {
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
