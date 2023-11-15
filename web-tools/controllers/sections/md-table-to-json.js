const tableToJsonInput = jQuery('#tableToJsonInput');
const tableToJsonOutput = jQuery('#tableToJsonOutput');

const tableToJson = () => {
  const table = tableToJsonInput.val();

  const json = replaceTableWithJson(table);
  tableToJsonOutput.val(json);

  replicateHeight(tableToJsonInput, tableToJsonOutput);
};

const replaceTableWithJson = (string) => {
  return string
    .replace(/"/gm, '\\"')
    .replace(/\\{/gm, '{')
    .replace(/^\|\s*/gm, '"')
    .replace(/\s*\|$/gm, '",')
    .replace(/\s*\|\s*/gm, '": "');
};
