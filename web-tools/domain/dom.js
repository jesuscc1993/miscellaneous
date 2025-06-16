const querySelector = (selector) => {
  return document.querySelector(selector);
};

const querySelectorAll = (selector) => {
  return document.querySelectorAll(selector);
};

const clearInputs = (inputSelectors) => {
  const inputs = querySelectorAll(inputSelectors.join(','));
  inputs.forEach((input) => {
    input.value = '';
  });
};

const copyOutput = async (inputSelector) => {
  const input = querySelector(inputSelector);
  try {
    await navigator.clipboard.writeText(input.value);
  } catch (error) {
    console.error('Failed to copy text: ', error);
  }
};

const pasteInput = async (trigger, inputSelector) => {
  const input = querySelector(inputSelector);
  try {
    const text = await navigator.clipboard.readText();
    input.value = text;
    input.focus();
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.blur();

    trigger.focus();
  } catch (error) {
    console.error('Failed to paste text: ', error);
  }
};

const replicateHeight = (inputElement, outputElement) => {
  outputElement.style.height = getComputedStyle(inputElement).height;
};
