const htmlToStringInput = querySelector('#htmlToStringInput');
const htmlToStringOutput = querySelector('#htmlToStringOutput');
const htmlToStringDoubleQuotes = querySelector('#htmlToStringDoubleQuotes');

const htmlToString = () => {
  const inputHTML = htmlToStringInput.value;
  const useDoubleQuotes = htmlToStringDoubleQuotes.checked;

  const outputString = getHTMLAsString(inputHTML, useDoubleQuotes);
  htmlToStringOutput.value = outputString;

  replicateHeight(htmlToStringInput, htmlToStringOutput);
};

const getHTMLAsString = (input, useDoubleQuotes) => {
  const quote = useDoubleQuotes ? '"' : "'";

  return input
    ? input
        .replace(new RegExp(quote, 'g'), `\\${quote}`)
        .replace(/\n/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s+>/g, '>')
        .replace(
          /\s*<(\/?(?:article|aside|blockquote|div|figure|footer|form|header|html|li|meta|nav|ol|p|script|section|style|table|th|td|tr|ul).*?|br\s*\/*)>\s*/g,
          '<$1>'
        )
        .replace(/^\s+|\s+$/g, '')
        .replace(/^|$/g, quote)
    : '';
};
