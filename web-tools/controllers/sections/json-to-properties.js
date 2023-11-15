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
