const storeAnchor = document.getElementById('storeAnchor');
const appIdInput = document.getElementById('appIdInput');
const assetImgAnchors = document.querySelectorAll('.asset-group a');
const assetImgs = document.querySelectorAll(
  '.links-container .thumb, .asset-group a img'
);

const initialize = () => {
  const assetAnchors = document.querySelectorAll('.asset-group a:has(img)');
  assetAnchors.forEach((a) => (a.querySelector('img').src = a.href));

  appIdInput.value = getAppIdParam();
  updateImages();
};

const updateImages = (event) => {
  event?.preventDefault();
  event?.stopPropagation();

  const appId = parseInt(appIdInput.value, 10);
  setAppIdParam(appId);

  assetImgAnchors.forEach((anchor) => {
    anchor.href = getUpdatedAppIdUrl(appId, anchor.href);
  });
  assetImgs.forEach((img) => {
    img.src = getUpdatedAppIdUrl(appId, img.src);
  });

  storeAnchor.href = getUpdatedStoreUrl(appId, storeAnchor.href);

  document.body.style.backgroundImage = `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/page_bg_generated_v6b.jpg)`;
};

const getUpdatedAppIdUrl = (appId, url) => {
  return url.replace(/\/\d+\//, `/${appId}/`);
};

const getUpdatedStoreUrl = (appId, url) => {
  return url.replace(/\/\d+/, `\/${appId}`);
};

const getAppIdParam = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('appId') || 70;
};

const setAppIdParam = (appId) => {
  const params = new URLSearchParams(window.location.search);
  params.set('appId', appId);
  window.history.replaceState(
    {},
    '',
    `${window.location.pathname}?${params.toString()}`
  );
};

initialize();
