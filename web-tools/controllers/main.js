// Constants

const LIST_SEPARATOR = /,\s*/;
const LINE_DELIMITER = /\n/;

// Miscellaneous

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

// Section anchors

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

// Generic

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
