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
