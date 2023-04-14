// Constants
let LIST_SEPARATOR = ', ';
let LINE_DELIMITER = '\n';

// ==================================================================================================================
// Miscellaneous
// ==================================================================================================================

if (typeof autosize === 'function') {
  autosize($('textarea'));
}

$(document).ready(() => {
  $('body').fadeIn();
});

function clearInputs(inputSelectors) {
  if (inputSelectors) {
    const inputs = $(inputSelectors.join(','));
    if (inputs.length) {
      inputs.val('');
    }
  }
}

function replicateHeight(inputElement, outputElement) {
  outputElement.css({ height: inputElement.css('height') });
}

function splitSortAndJoin(inputString, delimiter) {
  return inputString.split(delimiter).sort().join(delimiter);
}

function stringify(json) {
  return JSON.stringify(json, undefined, 2);
}

// ==================================================================================================================
// Section anchors
// ==================================================================================================================

$('.anchor-list a').each((i, anchor) => {
  $(anchor).click((event) => {
    event.preventDefault();
    let target = $(anchor).attr('href');
    window.history.pushState('', '', target);
    $(target).get(0).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ==================================================================================================================
// String builder
// ==================================================================================================================

let stringBuilderInput = $('#stringBuilderInput');
let stringBuilderOutput = $('#stringBuilderOutput');
let stringBuilderKeepLineBreaks = $('#stringBuilderKeepLineBreaks');

function buildString() {
  stringBuilderOutput.val(getBuiltString(stringBuilderInput.val()));
  replicateHeight(stringBuilderInput, stringBuilderOutput);
}

function getBuiltString(input) {
  let lineBreakCharacter = '';

  if (stringBuilderKeepLineBreaks.prop('checked')) {
    lineBreakCharacter = '\\n';
  }

  return input
    ? `"${input
        .replace(/"/g, '\\"')
        .replace(/\n/g, lineBreakCharacter + '" +\n"')
        .replace(/\n"" \+/g, '\n')}"`
    : '';
}

// ==================================================================================================================
// Inline list sorter
// ==================================================================================================================

let unsortedInlineListInput = $('#unsortedInlineListInput');
let sortedInlineListOutput = $('#sortedInlineListOutput');
let inlineListSorterDiscardDuplicates = $('#inlineListSorterDiscardDuplicates');

function sortInlineList() {
  const sortedLines = getSortedInlineList(unsortedInlineListInput.val());
  sortedInlineListOutput.val(sortedLines);
  replicateHeight(unsortedInlineListInput, sortedInlineListOutput);
}

function getSortedInlineListLine(line) {
  let array = line.split(LIST_SEPARATOR);

  if (inlineListSorterDiscardDuplicates.prop('checked')) {
    array = getDuplicateFreeArray(array);
  }

  return array.sort().join(LIST_SEPARATOR);
}

function getSortedInlineList(inputString) {
  return inputString
    .replace(new RegExp(` +(${LIST_SEPARATOR}) +`, 'g'), '$1')
    .split(LINE_DELIMITER)
    .map(getSortedInlineListLine)
    .join(LINE_DELIMITER);
}

// ==================================================================================================================
// Multiline list sorter
// ==================================================================================================================

let unsortedMultilineListInput = $('#unsortedMultilineListInput');
let sortedMultilineListOutput = $('#sortedMultilineListOutput');
let multilineListSorterDiscardDuplicates = $(
  '#multilineListSorterDiscardDuplicates'
);

function sortMultilineList() {
  const sortedLines = getSortedMultilineList(unsortedMultilineListInput.val());
  sortedMultilineListOutput.val(sortedLines);
  replicateHeight(unsortedMultilineListInput, sortedMultilineListOutput);
}

function getSortedMultilineList(inputString) {
  let array = inputString.split(LINE_DELIMITER);

  if (multilineListSorterDiscardDuplicates.prop('checked')) {
    array = getDuplicateFreeArray(array);
  }

  return array.sort().join(LINE_DELIMITER);
}

// ==================================================================================================================
// JSON sorter
// ==================================================================================================================

let unsortedJsonInput = $('#unsortedJsonInput');
let sortedJsonOutput = $('#sortedJsonOutput');
let jsonSorterDiscardDuplicates = $('#jsonSorterDiscardDuplicates');

function sortJson() {
  let sortedJson = getSortedJson(unsortedJsonInput.val());

  sortedJsonOutput.val(sortedJson);
  replicateHeight(unsortedJsonInput, sortedJsonOutput);
}

function getSortedJson(inputString) {
  let json = JSON.parse(inputString);
  const sortedJson = getPropertiesRecursivelySorted(json);
  return stringify(sortedJson, undefined, 2);
}

function getPropertiesRecursivelySorted(json) {
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
}

// ==================================================================================================================
// Case transformer
// ==================================================================================================================

let sentenceCaseInput = $('#sentenceCaseInput');
let lowercaseInput = $('#lowercaseInput');
let uppercaseInput = $('#uppercaseInput');
let capitalCaseInput = $('#capitalCaseInput');
let camelCaseInput = $('#camelCaseInput');
let snakeCaseInput = $('#snakeCaseInput');
let kebabCaseInput = $('#kebabCaseInput');

function transformFromSentenceCase() {
  lowercaseInput.val(sentenceCaseInput.val().toLowerCase());
  uppercaseInput.val(sentenceCaseInput.val().toUpperCase());
  capitalCaseInput.val(transformSentenceToCapitalCase(sentenceCaseInput.val()));
  camelCaseInput.val(transformSentenceToCamelCase(sentenceCaseInput.val()));
  snakeCaseInput.val(transformSentenceToSnakeCase(sentenceCaseInput.val()));
  kebabCaseInput.val(transformSentenceToKebabCase(sentenceCaseInput.val()));
}

function transformFromCapitalCase() {
  sentenceCaseInput.val(transformCapitalToSentenceCase(capitalCaseInput.val()));
  transformFromSentenceCase();
}

function transformFromLowercase() {
  sentenceCaseInput.val(transformCapitalToSentenceCase(lowercaseInput.val()));
  transformFromSentenceCase();
}

function transformFromUppercase() {
  sentenceCaseInput.val(transformCapitalToSentenceCase(uppercaseInput.val()));
  transformFromSentenceCase();
}

function transformFromCamelCase() {
  sentenceCaseInput.val(transformCamelToSentenceCase(camelCaseInput.val()));
  transformFromSentenceCase();
}

function transformFromSnakeCase() {
  sentenceCaseInput.val(transformSnakeToSentenceCase(snakeCaseInput.val()));
  transformFromSentenceCase();
}

function transformFromKebabCase() {
  sentenceCaseInput.val(transformKebabToSentenceCase(kebabCaseInput.val()));
  transformFromSentenceCase();
}

// Input

function transformCapitalToSentenceCase(inputCase) {
  return toSentenceCase(inputCase);
}

function transformCamelToSentenceCase(inputCase) {
  return toSentenceCase(inputCase.replace(/([A-Z])/g, ' $1'));
}

function transformSnakeToSentenceCase(inputCase) {
  return toSentenceCase(inputCase.replace(/_/g, ' '));
}

function transformKebabToSentenceCase(inputCase) {
  return toSentenceCase(inputCase.replace(/-/g, ' '));
}

// Output

function transformSentenceToCapitalCase(inputCase) {
  return uppercaseWords(inputCase.toLowerCase());
}

function transformSentenceToCamelCase(inputCase) {
  return lowercaseFirstLetter(uppercaseWords(inputCase.toLowerCase())).replace(
    / /g,
    ''
  );
}

function transformSentenceToSnakeCase(inputCase) {
  return inputCase.toLowerCase().replace(/ /g, '_');
}

function transformSentenceToKebabCase(inputCase) {
  return inputCase.toLowerCase().replace(/ /g, '-');
}

function toSentenceCase(string) {
  return uppercaseFirstLetter(string.toLowerCase());
}

// ==================================================================================================================
// Rule of three
// ==================================================================================================================

let axInput = $('#ruleOfThreeAxInput');
let ayInput = $('#ruleOfThreeAyInput');
let bxInput = $('#ruleOfThreeBxInput');
let byInput = $('#ruleOfThreeByInput');

function calculateRuleOfThree() {
  let ax = axInput.val();
  let ay = ayInput.val();
  let bx = bxInput.val();

  let ruleOfThree = getRuleOfThree(ax, ay, bx);
  if (ruleOfThree) {
    byInput.val(ruleOfThree);
  }
}

function getRuleOfThree(ax, ay, bx) {
  return isNumber(ax) && isNumber(ay) && isNumber(bx)
    ? (bx * ay) / ax
    : undefined;
}

// ==================================================================================================================
// Regex replacer
// ==================================================================================================================

let regexReplacerInput = $('#regexReplacerInput');
let regexReplacerOutput = $('#regexReplacerOutput');
let regexpInput = $('#regexpInput');
let regexpOptions = $('#regexpOptionsInput');
let regexReplacementInput = $('#regexReplacementInput');

function applyRegexReplacement() {
  let inputString = regexReplacerInput.val(),
    regexp = new RegExp(regexpInput.val(), regexpOptions.val() || 'gm'),
    replacement = regexReplacementInput.val();

  regexReplacerOutput.val(replaceByRegex(inputString, regexp, replacement));
  replicateHeight(regexReplacerInput, regexReplacerOutput);
}

function replaceByRegex(string, regexp, replacement) {
  return string.replace(regexp, replacement);
}

// ==================================================================================================================
// Markdown / JIRA table to JSON
// ==================================================================================================================

let tableToJsonInput = $('#tableToJsonInput');
let tableToJsonOutput = $('#tableToJsonOutput');

function tableToJson() {
  tableToJsonOutput.val(replaceTableWithJson(tableToJsonInput.val()));
  replicateHeight(tableToJsonInput, tableToJsonOutput);
}

function replaceTableWithJson(string) {
  return string
    .replace(/^\|/gm, '"')
    .replace(/\|$/gm, '",')
    .replace(/\s*\|\s*/gm, '": "');
}

// ------------------------------------------------------------------------------------------------------------------
// Generic
// ------------------------------------------------------------------------------------------------------------------

function isNumber(string) {
  return string && !isNaN(parseInt(string));
}

function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function uppercaseWords(string) {
  return string.replace(/\b\w/g, function (letter) {
    return letter.toUpperCase();
  });
}

function getDuplicateFreeArray(array) {
  return array.filter(function (entry, i) {
    return array.indexOf(entry) === i;
  });
}
