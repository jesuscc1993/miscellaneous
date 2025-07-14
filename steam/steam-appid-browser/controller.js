// settings
const COVER_TYPE = 'header'; // 'capsule', 'header', or 'library'

const COVER_URL_MAP = {
  capsule:
    'https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg',
  header: 'https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg',
  library:
    'https://steamcdn-a.akamaihd.net/steam/apps/${appId}/library_600x900.jpg',
};

const SYSTEM_APP_IDS = ['2371090', '241100', '7', '760'];

function generateAppList(appIds) {
  const container = document.getElementById('output');

  appIds.forEach((appId) => {
    const listItem = document.createElement('li');

    const anchor = document.createElement('a');
    anchor.href = `https://store.steampowered.com/app/${appId}`;
    anchor.target = '_blank';

    const img = document.createElement('img');
    img.src = COVER_URL_MAP[COVER_TYPE].replace('${appId}', appId);

    const span = document.createElement('span');
    span.textContent = appId;

    anchor.appendChild(img);
    anchor.appendChild(span);

    listItem.appendChild(anchor);

    container.appendChild(listItem);
  });
}

const init = () => {
  appIds = appIds.filter((appId) => /^\d+$/.test(appId));
  appIds = appIds.filter((appId) => !SYSTEM_APP_IDS.includes(appId));

  // Call the function to generate the list
  generateAppList(appIds);
};

init();
