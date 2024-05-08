const regexReplacerInput = querySelector('#regexReplacerInput');
const regexReplacerOutput = querySelector('#regexReplacerOutput');
const regexpInput = querySelector('#regexpInput');
const regexpOptions = querySelector('#regexpOptionsInput');
const regexReplacementInput = querySelector('#regexReplacementInput');

const applyRegexReplacement = () => {
  const inputString = regexReplacerInput.value;
  const regexp = new RegExp(regexpInput.value, regexpOptions.value || 'gm');
  const replacement = regexReplacementInput.value;

  const replacedString = replaceByRegex(inputString, regexp, replacement);
  regexReplacerOutput.value = replacedString;

  replicateHeight(regexReplacerInput, regexReplacerOutput);
};

const replaceByRegex = (string, regexp, replacement) => {
  return string.replace(regexp, replacement);
};
