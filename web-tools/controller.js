// Constants
const LIST_SEPARATOR = /,\s*/;
const LINE_DELIMITER = /\n/;

// ==================================================================================================================
// Miscellaneous
// ==================================================================================================================

if (typeof autosize === 'function') {
  autosize(jQuery('textarea'));
}

jQuery(document).ready(() => {
  jQuery('body').fadeIn();
});

const pasteInput = async (inputSelector) => {
  const input = jQuery(inputSelector);
  input.val(await navigator.clipboard.readText());
  input.blur();
};

const copyOutput = async (inputSelector) => {
  const input = jQuery(inputSelector);
  navigator.clipboard.writeText(input.val());
};

const clearInputs = (inputSelectors) => {
  const inputs = jQuery(inputSelectors.join(','));
  if (inputs.length) inputs.val('');
};

const replicateHeight = (inputElement, outputElement) => {
  outputElement.css({ height: inputElement.css('height') });
};

const splitSortAndJoin = (inputString, delimiter) => {
  return inputString.split(delimiter).sort().join(delimiter);
};

const stringify = (json) => {
  return JSON.stringify(json, undefined, 2);
};

// ==================================================================================================================
// Section anchors
// ==================================================================================================================

jQuery('.anchor-list a').each((i, anchor) => {
  jQuery(anchor).click((event) => {
    event.preventDefault();

    const target = jQuery(anchor).attr('href');
    jQuery(target)
      .get(0)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.history.pushState('', '', target);
  });
});

// ==================================================================================================================
// String builder
// ==================================================================================================================

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

// ==================================================================================================================
// Inline list sorter
// ==================================================================================================================

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

// ==================================================================================================================
// Multiline list sorter
// ==================================================================================================================

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

// ==================================================================================================================
// JSON sorter
// ==================================================================================================================

const unsortedJsonInput = jQuery('#unsortedJsonInput');
const sortedJsonOutput = jQuery('#sortedJsonOutput');
const jsonSorterDiscardDuplicates = jQuery('#jsonSorterDiscardDuplicates');

const sortJson = () => {
  const unsortedJson = unsortedJsonInput.val();

  try {
    const sortedJson = getSortedJson(unsortedJson);
    sortedJsonOutput.val(sortedJson);
  } catch {
    sortedJsonOutput.val('');
  }

  replicateHeight(unsortedJsonInput, sortedJsonOutput);
};

const getSortedJson = (inputString) => {
  const json = JSON.parse(inputString);
  const sortedJson = getPropertiesRecursivelySorted(json);
  return stringify(sortedJson, undefined, 2);
};

const getPropertiesRecursivelySorted = (json) => {
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
};

// ==================================================================================================================
// JSON to *.properties
// ==================================================================================================================

const jsonToPropertiesInput = jQuery('#jsonToPropertiesInput');
const jsonToPropertiesOutput = jQuery('#jsonToPropertiesOutput');

const jsonToProperties = () => {
  const json = jsonToPropertiesInput.val();

  const properties = replaceJsonWithProperties(json);
  jsonToPropertiesOutput.val(properties);

  replicateHeight(jsonToPropertiesInput, jsonToPropertiesOutput);
};

const replaceJsonWithProperties = (string) => {
  return string
    .replace(/(^{\s*|\s*}$)/g, '')
    .replace(/"(.*?)": "(.*)",?/g, '$1=$2');
};

// ==================================================================================================================
// Case transformer
// ==================================================================================================================

const sentenceCaseInput = jQuery('#sentenceCaseInput');
const lowercaseInput = jQuery('#lowercaseInput');
const uppercaseInput = jQuery('#uppercaseInput');
const capitalCaseInput = jQuery('#capitalCaseInput');
const camelCaseInput = jQuery('#camelCaseInput');
const snakeCaseInput = jQuery('#snakeCaseInput');
const kebabCaseInput = jQuery('#kebabCaseInput');

const transformFromSentenceCase = () => {
  lowercaseInput.val(sentenceCaseInput.val().toLowerCase());
  uppercaseInput.val(sentenceCaseInput.val().toUpperCase());
  capitalCaseInput.val(transformSentenceToCapitalCase(sentenceCaseInput.val()));
  camelCaseInput.val(transformSentenceToCamelCase(sentenceCaseInput.val()));
  snakeCaseInput.val(transformSentenceToSnakeCase(sentenceCaseInput.val()));
  kebabCaseInput.val(transformSentenceToKebabCase(sentenceCaseInput.val()));
};

const transformFromCapitalCase = () => {
  sentenceCaseInput.val(transformCapitalToSentenceCase(capitalCaseInput.val()));
  transformFromSentenceCase();
};

const transformFromLowercase = () => {
  sentenceCaseInput.val(transformCapitalToSentenceCase(lowercaseInput.val()));
  transformFromSentenceCase();
};

const transformFromUppercase = () => {
  sentenceCaseInput.val(transformCapitalToSentenceCase(uppercaseInput.val()));
  transformFromSentenceCase();
};

const transformFromCamelCase = () => {
  sentenceCaseInput.val(transformCamelToSentenceCase(camelCaseInput.val()));
  transformFromSentenceCase();
};

const transformFromSnakeCase = () => {
  sentenceCaseInput.val(transformSnakeToSentenceCase(snakeCaseInput.val()));
  transformFromSentenceCase();
};

const transformFromKebabCase = () => {
  sentenceCaseInput.val(transformKebabToSentenceCase(kebabCaseInput.val()));
  transformFromSentenceCase();
};

// Input

const transformCapitalToSentenceCase = (inputCase) => {
  return toSentenceCase(inputCase);
};

const transformCamelToSentenceCase = (inputCase) => {
  return toSentenceCase(inputCase.replace(/([A-Z])/g, ' $1'));
};

const transformSnakeToSentenceCase = (inputCase) => {
  return toSentenceCase(inputCase.replace(/_/g, ' '));
};

const transformKebabToSentenceCase = (inputCase) => {
  return toSentenceCase(inputCase.replace(/-/g, ' '));
};

// Output

const transformSentenceToCapitalCase = (inputCase) => {
  return uppercaseWords(inputCase.toLowerCase());
};

const transformSentenceToCamelCase = (inputCase) => {
  return lowercaseFirstLetter(uppercaseWords(inputCase.toLowerCase())).replace(
    / /g,
    ''
  );
};

const transformSentenceToSnakeCase = (inputCase) => {
  return inputCase.toLowerCase().replace(/ /g, '_');
};

const transformSentenceToKebabCase = (inputCase) => {
  return inputCase.toLowerCase().replace(/ /g, '-');
};

const toSentenceCase = (string) => {
  return uppercaseFirstLetter(string.toLowerCase());
};

// ==================================================================================================================
// Rule of three
// ==================================================================================================================

const axInput = jQuery('#ruleOfThreeAxInput');
const ayInput = jQuery('#ruleOfThreeAyInput');
const bxInput = jQuery('#ruleOfThreeBxInput');
const byInput = jQuery('#ruleOfThreeByInput');

const calculateRuleOfThree = () => {
  const ax = toNumber(axInput.val());
  const ay = toNumber(ayInput.val());
  const bx = toNumber(bxInput.val());

  const ruleOfThree = getRuleOfThree(ax, ay, bx);
  byInput.val(ruleOfThree);
};

const getRuleOfThree = (ax, ay, bx) => {
  return ax && ay && bx ? (bx * ay) / ax : undefined;
};

// ==================================================================================================================
// Regex replacer
// ==================================================================================================================

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

// ==================================================================================================================
// MD table to JSON
// ==================================================================================================================

const tableToJsonInput = jQuery('#tableToJsonInput');
const tableToJsonOutput = jQuery('#tableToJsonOutput');

const tableToJson = () => {
  const table = tableToJsonInput.val();

  const json = replaceTableWithJson(table);
  tableToJsonOutput.val(json);

  replicateHeight(tableToJsonInput, tableToJsonOutput);
};

const replaceTableWithJson = (string) => {
  return string
    .replace(/"/gm, '\\"')
    .replace(/\\{/gm, '{')
    .replace(/^\|\s*/gm, '"')
    .replace(/\s*\|$/gm, '",')
    .replace(/\s*\|\s*/gm, '": "');
};

// ==================================================================================================================
// MD table to CSV
// ==================================================================================================================

const tableToCsvInput = jQuery('#tableToCsvInput');
const tableToCsvOutput = jQuery('#tableToCsvOutput');

const tableToCsv = () => {
  const table = tableToCsvInput.val();

  const csv = table.includes(';')
    ? replaceTableWithEscapedCsv(table)
    : replaceTableWithCsv(table);
  tableToCsvOutput.val(csv);

  replicateHeight(tableToCsvInput, tableToCsvOutput);
};

const replaceTableWithCsv = (string) => {
  return string
    .replace(/\\{/gm, '{')
    .replace(/^\|\s*/gm, '')
    .replace(/\s*\|$/gm, '')
    .replace(/\s*\|\s*/gm, ';');
};

const replaceTableWithEscapedCsv = (string) => {
  return string
    .replace(/\\{/gm, '{')
    .replace(/"/gm, '""')
    .replace(/^\|\s*/gm, '"')
    .replace(/\s*\|$/gm, '"')
    .replace(/\s*\|\s*/gm, '";"');
};

// ==================================================================================================================
// Triangular sum
// ==================================================================================================================

const triangularSumStartInput = jQuery('#triangularSumStartInput');
const triangularSumEndInput = jQuery('#triangularSumEndInput');
const triangularSumOutput = jQuery('#triangularSumOutput');

const calculateTriangularSum = () => {
  const start = toNumber(triangularSumStartInput.val()) || 1;
  const end = toNumber(triangularSumEndInput.val());

  const triangularSum = getTriangularSum(start, end);
  triangularSumOutput.val(triangularSum);
};

const getTriangularSum = (start, end) => {
  if (!(start && end && start <= end)) return undefined;
  const min = ((start - 1) * (start - 1 + 1)) / 2;
  const max = (end * (end + 1)) / 2;
  return max - min;
};

// ==================================================================================================================
// HTML cleaner
// ==================================================================================================================

const htmlCleanerInput = jQuery('#htmlCleanerInput');
const htmlCleanerOutput = jQuery('#htmlCleanerOutput');

const htmlCleaner = () => {
  const inputHTML = htmlCleanerInput.val();

  const outputString = getCleanHTML(inputHTML);
  htmlCleanerOutput.val(outputString);

  replicateHeight(htmlCleanerInput, htmlCleanerOutput);
};

const getCleanHTML = (input) => {
  return input
    ? input
        .replace(/<p>&nbsp;<\/p>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/<\/strong\n*\s*>\n*\s*<strong\n*\s*>/g, '')
        .replace(/<\/em\n*\s*>\n*\s*<em\n*\s*>/g, '')
        .replace(/\n+/g, '\n')
        .replace(/ {2,}/g, ' ')
    : '';
};

// ==================================================================================================================
// HTML to string
// ==================================================================================================================

const htmlToStringInput = jQuery('#htmlToStringInput');
const htmlToStringOutput = jQuery('#htmlToStringOutput');
const htmlToStringDoubleQuotes = jQuery('#htmlToStringDoubleQuotes');

const htmlToString = () => {
  const inputHTML = htmlToStringInput.val();
  const useDoubleQuotes = htmlToStringDoubleQuotes.prop('checked');

  const outputString = getHTMLAsString(inputHTML, useDoubleQuotes);
  htmlToStringOutput.val(outputString);

  replicateHeight(htmlToStringInput, htmlToStringOutput);
};

const getHTMLAsString = (input, useDoubleQuotes) => {
  const quote = useDoubleQuotes ? '"' : "'";

  return input
    ? input
        .replace(new RegExp(quote, 'g'), `\\${quote}`)
        .replace(/\n/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s+>/g, '>')
        .replace(/^\s+|\s+$/g, '')
        .replace(/^|$/g, quote)
    : '';
};

// ------------------------------------------------------------------------------------------------------------------
// Generic
// ------------------------------------------------------------------------------------------------------------------

const toNumber = (string) => {
  const value = Number(string);
  return isNaN(value) ? undefined : value;
};

const uppercaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

const uppercaseWords = (string) => {
  return string.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getDuplicateFreeArray = (array) => {
  return array.filter((entry, i) => array.indexOf(entry) === i);
};
