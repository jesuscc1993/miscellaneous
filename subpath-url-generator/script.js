const STORAGE_KEY = 'subpath-url-generator';

const configInput = document.querySelector('#configInput');
const outputContainer = document.querySelector('#output');

function update() {
  try {
    const data = JSON.parse(configInput.value);
    const suffix = data.subLocation?.trim().replace(/^\/+|\/+$/g, '') || '';

    localStorage.setItem(STORAGE_KEY, configInput.value);
    outputContainer.replaceChildren();

    data.instances.forEach((instance) => {
      const card = document.createElement('article');
      card.className = 'card';

      const heading = document.createElement('h2');
      heading.className = 'card-title';
      heading.textContent = instance.name;
      card.append(heading);

      const formGroup = document.createElement('div');
      formGroup.className = 'rows';

      const table = document.createElement('table');

      instance.urls.forEach((url) => {
        const address = suffix
          ? `${url.address.replace(/\/+$/, '')}/${encodeURI(suffix)}`
          : url.address;

        const anchor = document.createElement('a');
        anchor.href = address;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.textContent = address;

        const labelCell = document.createElement('td');
        labelCell.innerHTML = `${url.label}&nbsp;`;

        const addressCell = document.createElement('td');
        addressCell.append(anchor);

        const row = document.createElement('tr');
        row.append(labelCell, addressCell);
        table.append(row);
      });

      formGroup.append(table);

      card.append(formGroup);
      outputContainer.append(card);
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    outputContainer.replaceChildren();
  }
}

async function loadConfig() {
  const savedConfig = localStorage.getItem(STORAGE_KEY);

  if (savedConfig) {
    configInput.value = savedConfig;
  } else {
    const response = await fetch('./example-config.json');

    if (!response.ok) {
      throw new Error(`Failed to load example config: ${response.status}`);
    }

    configInput.value = JSON.stringify(await response.json(), null, 2);
  }

  update();
}

configInput.addEventListener('input', update);
loadConfig();
