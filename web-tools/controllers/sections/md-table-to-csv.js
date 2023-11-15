const tableToCsvInput = jQuery('#tableToCsvInput');
const tableToCsvOutput = jQuery('#tableToCsvOutput');

const tableToCsv = () => {
  const table = tableToCsvInput.val();

  const csv = table.includes(';')
    ? replaceTableWithEscapedCsv(table)
    : replaceTableWithCsv(table);
  tableToCsvOutput.val(csv);

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
