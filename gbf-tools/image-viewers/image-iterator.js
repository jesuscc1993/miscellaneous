const appendImages = ({ container, imageIds, imageCount, imageSrc }) => {
  if (imageCount) {
    for (let i = 1; i < imageCount; i++) {
      appendImage({ container, imageSrc, imageId: i });
    }
  }

  if (imageIds) {
    imageIds.forEach((imageId) => {
      appendImage({ container, imageId, imageSrc });
    });
  }
};

const appendImage = ({ container, imageId, imageSrc }) => {
  const src = imageSrc.replace("$id", imageId);
  container.append(`<a href="${src}"><img src="${src}"></a>`);
};
