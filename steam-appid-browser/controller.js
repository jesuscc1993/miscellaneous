const systemAppIds = ['2371090', '241100', '7', '760'];

function generateAppList(appIds) {
  const container = document.getElementById('output');

  appIds.forEach((appId) => {
    const listItem = document.createElement('li');

    const anchor = document.createElement('a');
    anchor.href = `https://store.steampowered.com/app/${appId}`;
    anchor.target = '_blank';

    const img = document.createElement('img');
    img.src = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`;

    anchor.appendChild(img);
    anchor.appendChild(document.createTextNode(appId));

    listItem.appendChild(anchor);

    container.appendChild(listItem);
  });
}

const init = () => {
  appIds = appIds.filter((appId) => /^\d+$/.test(appId));
  appIds = appIds.filter((appId) => !systemAppIds.includes(appId));

  // Call the function to generate the list
  generateAppList(appIds);
};

init();
