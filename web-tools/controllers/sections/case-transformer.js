const sentenceCaseInput = querySelector('#sentenceCaseInput');
const lowercaseInput = querySelector('#lowercaseInput');
const uppercaseInput = querySelector('#uppercaseInput');
const capitalCaseInput = querySelector('#capitalCaseInput');
const camelCaseInput = querySelector('#camelCaseInput');
const snakeCaseInput = querySelector('#snakeCaseInput');
const kebabCaseInput = querySelector('#kebabCaseInput');

const transformFromSentenceCase = () => {
  const sentenceValue = sentenceCaseInput.value;
  lowercaseInput.value = sentenceValue.toLowerCase();
  uppercaseInput.value = sentenceValue.toUpperCase();
  capitalCaseInput.value = transformSentenceToCapitalCase(sentenceValue);
  camelCaseInput.value = transformSentenceToCamelCase(sentenceValue);
  snakeCaseInput.value = transformSentenceToSnakeCase(sentenceValue);
  kebabCaseInput.value = transformSentenceToKebabCase(sentenceValue);
};

const transformFromCapitalCase = () => {
  const capitalValue = capitalCaseInput.value;
  sentenceCaseInput.value = transformCapitalToSentenceCase(capitalValue);
  transformFromSentenceCase();
};

const transformFromLowercase = () => {
  const lowercaseValue = lowercaseInput.value;
  sentenceCaseInput.value = transformCapitalToSentenceCase(lowercaseValue);
  transformFromSentenceCase();
};

const transformFromUppercase = () => {
  const uppercaseValue = uppercaseInput.value;
  sentenceCaseInput.value = transformCapitalToSentenceCase(uppercaseValue);
  transformFromSentenceCase();
};

const transformFromCamelCase = () => {
  const camelValue = camelCaseInput.value;
  sentenceCaseInput.value = transformCamelToSentenceCase(camelValue);
  transformFromSentenceCase();
};

const transformFromSnakeCase = () => {
  const snakeValue = snakeCaseInput.value;
  sentenceCaseInput.value = transformSnakeToSentenceCase(snakeValue);
  transformFromSentenceCase();
};

const transformFromKebabCase = () => {
  const kebabValue = kebabCaseInput.value;
  sentenceCaseInput.value = transformKebabToSentenceCase(kebabValue);
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
