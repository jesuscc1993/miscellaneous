const jsonToPropertiesInput = jQuery('#jsonToPropertiesInput');
const jsonToPropertiesOutput = jQuery('#jsonToPropertiesOutput');

const jsonToProperties = () => {
  try {
    const json = jsonToPropertiesInput.val();
    JSON.parse(json);

    const properties = replaceJsonWithProperties(json);
    jsonToPropertiesOutput.val(properties);

    replicateHeight(jsonToPropertiesInput, jsonToPropertiesOutput);
  } catch {
    jsonToPropertiesOutput.val('<Not a valid JSON object>');
  }
};

const replaceJsonWithProperties = (string) => {
  return string
    .replace(/(^{\s*|\s*}$)/g, '')
    .replace(/"(.*?)":"(.*?)",?/g, '$1=$2')
    .replace(/\n? +/g, '\n');
};
