const storeAnchor = document.getElementById('storeAnchor');
const assetImgAnchors = document.querySelectorAll('.asset-group a');
const assetImgs = document.querySelectorAll('.asset-group a img');

const updateImages = (event) => {
  event?.preventDefault();
  event?.stopPropagation();

  const appId = parseInt(document.getElementById('appIdInput').value, 10);

  assetImgAnchors.forEach((anchor) => {
    anchor.href = getUpdatedAppIdUrl(appId, anchor.href);
  });
  assetImgs.forEach((img) => {
    img.src = getUpdatedAppIdUrl(appId, img.src);
  });

  storeAnchor.href = storeAnchor.href.replace(/\/\d+/, `\/${appId}`);
};

const getUpdatedAppIdUrl = (appId, url) => {
  return url.replace(/\/\d+\//, `/${appId}/`);
};
