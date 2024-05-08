const tableToJsonInput = querySelector('#tableToJsonInput');
const tableToJsonOutput = querySelector('#tableToJsonOutput');

const tableToJson = () => {
  const table = tableToJsonInput.value;

  const json = replaceTableWithJson(table);
  tableToJsonOutput.value = json;

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
