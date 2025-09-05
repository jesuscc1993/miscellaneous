const OPTIONAL = ['MenderBug'];

const fileInputEl = document.getElementById('file');
const outputEl = document.getElementById('output');
const statusEl = document.getElementById('status');

fileInputEl.addEventListener('change', () => {
  const file = fileInputEl.files && fileInputEl.files[0];
  statusEl.textContent = file ? file.name : 'No file loaded';
  if (file) {
    const reader = new FileReader();
    reader.onload = function (ev) {
      scanJsonText(ev.target.result);
    };
    reader.onerror = function (error) {
      outputEl.value = '';
      statusEl.textContent = '[ERROR] Could not read file: ' + error.message;
    };
    reader.readAsText(file);
  } else {
    outputEl.value =
      'Please choose a .json save file from your computer using the file picker.';
  }
});

const scanJsonText = (text) => {
  let playerData = null;
  try {
    playerData = JSON.parse(text).playerData;
    if (!playerData) throw new Error('No playerData detected.');
  } catch (error) {
    outputEl.value = '';
    statusEl.textContent = '[Error] Could not parse JSON: ' + error.message;
    return;
  }
  const incompleteEntries = [];
  for (const key in playerData) {
    if (key.startsWith('kills') && playerData[key]) {
      const name = key.replace(/^kills/, '');
      incompleteEntries.push({
        key: name,
        encountered: playerData[`killed${name}`],
        pendingKills: playerData[key],
      });
    }
  }

  if (incompleteEntries.length === 0) {
    outputEl.value = 'No missing journal entries identified.';
    statusEl.textContent = 'No matches';
  } else {
    // outputEl.value = incompleteEntries.join('\n');
    outputEl.innerHTML =
      '<ul>' +
      incompleteEntries
        .map((entry) => {
          const { key, ...fields } = entry;
          const label = getEntryLabel(key);
          const link = encodeURIComponent(
            key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ')
          );

          return `
            <li>
              <a href="https://hollowknight.fandom.com/wiki/Special:Search?query=${link}" target="_blank">
                ${label}
              </a>
              <small>${JSON.stringify(fields).replace(/,/g, ', ')}</small>
            </li>
          `;
        })
        .join('') +
      '</ul>';
    outputEl.rows = incompleteEntries.length;
    statusEl.textContent = `Found ${incompleteEntries.length} incomplete journal entries:`;
  }
};

const getEntryLabel = (entry) => {
  return OPTIONAL.includes(entry) ? `${entry} (optional)` : entry;
};
