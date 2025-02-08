function updateImages(event) {
  event.preventDefault();
  event.stopPropagation();

  const appId = parseInt(document.getElementById('appIdInput').value, 10);

  document.querySelectorAll('img').forEach((img) => {
    img.src = img.src.replace(/\/\d+\//, `\/${appId}\/`);
  });
}
