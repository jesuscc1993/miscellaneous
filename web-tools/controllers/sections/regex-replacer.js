const regexReplacerInput = jQuery('#regexReplacerInput');
const regexReplacerOutput = jQuery('#regexReplacerOutput');
const regexpInput = jQuery('#regexpInput');
const regexpOptions = jQuery('#regexpOptionsInput');
const regexReplacementInput = jQuery('#regexReplacementInput');

const applyRegexReplacement = () => {
  const inputString = regexReplacerInput.val();
  const regexp = new RegExp(regexpInput.val(), regexpOptions.val() || 'gm');
  const replacement = regexReplacementInput.val();

  const replacedString = replaceByRegex(inputString, regexp, replacement);
  regexReplacerOutput.val(replacedString);

  replicateHeight(regexReplacerInput, regexReplacerOutput);
};

const replaceByRegex = (string, regexp, replacement) => {
  return string.replace(regexp, replacement);
};
