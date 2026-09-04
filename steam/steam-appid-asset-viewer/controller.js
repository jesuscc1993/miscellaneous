const storeAnchor = document.getElementById('storeAnchor');
const appIdInput = document.getElementById('appIdInput');
const appIdLabel = document.getElementById('appIdLabel');
const appNameLabel = document.getElementById('appNameLabel');
const assetImgAnchors = document.querySelectorAll('.asset-group a');
const assetImgs = document.querySelectorAll(
  '.links-container a img, .asset-group a img',
);

const initialize = () => {
  window.addEventListener('popstate', loadAppParams);
  loadAppParams();

  const assetAnchors = document.querySelectorAll('.asset-group a:has(img)');
  assetAnchors.forEach((a) => (a.querySelector('img').src = a.href));
};

const loadAppParams = () => {
  applyAppValues(getParam('appId', 70), getParam('appName'));
};

const applyAppValues = (appId, appName) => {
  appIdLabel.innerHTML = appId ? `[${appId}]` : '';
  appIdInput.value = appId;
  appNameLabel.innerHTML = appName ?? '';

  updateImages(appId);
};

const setAppParams = (appId, appName) => {
  setParams({ appId, appName });
  applyAppValues(appId, appName);
};

const onAppIdChange = (event) => {
  event?.preventDefault();
  event?.stopPropagation();

  setAppParams(parseInt(appIdInput.value, 10), undefined);
};

const updateImages = (appId) => {
  assetImgAnchors.forEach((anchor) => {
    anchor.href = getUpdatedAppUrl(appId, anchor.href);
  });
  assetImgs.forEach((img) => {
    img.src = getUpdatedAppUrl(appId, img.src);
  });

  storeAnchor.href = getUpdatedAppUrl(appId, storeAnchor.href);

  document.body.style.backgroundImage = `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/page_bg_generated_v6b.jpg)`;
};

const getUpdatedAppUrl = (appId, url) => {
  return url.replace(/\/\d+\//, `/${appId}/`);
};

const getParams = () => {
  return new URLSearchParams(window.location.search);
};

const getParam = (name, fallback) => {
  return getParams().get(name) || fallback;
};

const setParams = (updates) => {
  const params = getParams();

  const changed = Object.entries(updates)
    .map(([name, value]) => setParam(params, name, value))
    .some(Boolean);
  if (!changed) return;

  window.history.pushState(
    {},
    '',
    `${window.location.pathname}?${params.toString()}`,
  );
};

const setParam = (params, name, newValue) => {
  const currentValue = params.get(name);
  if (`${currentValue}` === `${newValue}`) return false;

  if (typeof newValue === 'undefined') {
    params.delete(name);
  } else {
    params.set(name, newValue);
  }
  return true;
};

initialize();
