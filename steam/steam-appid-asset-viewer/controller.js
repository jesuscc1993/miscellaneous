const storeAnchor = document.getElementById('storeAnchor');
const subtitle = document.getElementById('subtitle');
const appIdInput = document.getElementById('appIdInput');
const assetImgAnchors = document.querySelectorAll('.asset-group a');
const assetImgs = document.querySelectorAll(
  '.links-container a img, .asset-group a img',
);

const initialize = () => {
  const assetAnchors = document.querySelectorAll('.asset-group a:has(img)');
  assetAnchors.forEach((a) => (a.querySelector('img').src = a.href));

  appIdInput.value = getAppIdParam();

  const appName = getParams().get('appName');
  if (appName) subtitle.innerHTML = '<br>' + appName;

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

const getParams = () => {
  return new URLSearchParams(window.location.search);
};

const getAppIdParam = () => {
  return getParams().get('appId') || 70;
};

const setAppIdParam = (appId) => {
  const params = getParams();
  params.set('appId', appId);
  window.history.replaceState(
    {},
    '',
    `${window.location.pathname}?${params.toString()}`,
  );
};

initialize();
