const htmlCleanerInput = querySelector('#htmlCleanerInput');
const htmlCleanerOutput = querySelector('#htmlCleanerOutput');

const htmlCleaner = () => {
  const inputHTML = htmlCleanerInput.value;

  const outputString = getCleanHTML(inputHTML);
  htmlCleanerOutput.value = outputString;

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
