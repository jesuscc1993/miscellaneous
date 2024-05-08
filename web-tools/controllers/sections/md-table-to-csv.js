const tableToCsvInput = querySelector('#tableToCsvInput');
const tableToCsvOutput = querySelector('#tableToCsvOutput');

const tableToCsv = () => {
  const table = tableToCsvInput.value;

  const csv = table.includes(';')
    ? replaceTableWithEscapedCsv(table)
    : replaceTableWithCsv(table);
  tableToCsvOutput.value = csv;

  replicateHeight(tableToCsvInput, tableToCsvOutput);
};

const replaceTableWithCsv = (string) => {
  return string
    .replace(/\\{/gm, '{')
    .replace(/^\|\s*/gm, '')
    .replace(/\s*\|$/gm, '')
    .replace(/\s*\|\s*/gm, ';');
};

const replaceTableWithEscapedCsv = (string) => {
  return string
    .replace(/\\{/gm, '{')
    .replace(/"/gm, '""')
    .replace(/^\|\s*/gm, '"')
    .replace(/\s*\|$/gm, '"')
    .replace(/\s*\|\s*/gm, '";"');
};
