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
        .replace(/(&nbsp;|\u00A0)+/g, ' ')
        .replace(/<\/strong\n*\s*>\n*\s*<strong\n*\s*>/g, '')
        .replace(/<\/em\n*\s*>\n*\s*<em\n*\s*>/g, '')
        .replace(/\n+/g, '\n')
        .replace(/http:\/\//g, 'https://')
        .replace(/ {2,}/g, ' ')
    : '';
};
