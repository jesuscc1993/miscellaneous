const jsonToPropertiesInput = querySelector('#jsonToPropertiesInput');
const jsonToPropertiesOutput = querySelector('#jsonToPropertiesOutput');

const jsonToProperties = () => {
  try {
    const json = jsonToPropertiesInput.value;

    const properties = replaceJsonWithProperties(json);
    jsonToPropertiesOutput.value = properties;

    replicateHeight(jsonToPropertiesInput, jsonToPropertiesOutput);
  } catch {
    jsonToPropertiesOutput.value = INVALID_JSON_MESSAGE;
  }
};

const replaceJsonWithProperties = (string) => {
  return string
    .replace(/(^{\s*|\s*}$)/g, '')
    .replace(/"(.*?)":\s*"(.*?)",?/g, '$1=$2')
    .replace(/\n? +/g, '\n');
};
