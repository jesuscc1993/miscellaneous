const clearInputs = (inputSelectors) => {
  const inputs = jQuery(inputSelectors.join(','));
  if (inputs.length) inputs.val('');
};

const copyOutput = async (inputSelector) => {
  const input = jQuery(inputSelector);
  navigator.clipboard.writeText(input.val());
};

const pasteInput = async (inputSelector) => {
  const input = jQuery(inputSelector);
  input.val(await navigator.clipboard.readText());
  input.blur();
};

const replicateHeight = (inputElement, outputElement) => {
  outputElement.css({ height: inputElement.css('height') });
};
