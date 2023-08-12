const oneKWidth = 960;
const oneKHeight = 540;
const defaultTopWidth = 400;
const defaultTopHeight = 240;
const defaultBottomWidth = 320;
const defaultBottomHeight = 240;

const monitorWidthEl = jQuery('#monitorWidth');
const monitorHeightEl = jQuery('#monitorHeight');
const topWidthEl = jQuery('#topWidth');
const topHeightEl = jQuery('#topHeight');
const bottomWidthEl = jQuery('#bottomWidth');
const bottomHeightEl = jQuery('#bottomHeight');

const outputEl = jQuery('#output');
const outputWrapperEl = jQuery('#output-wrapper');
const previewEl = jQuery('#preview');
const previewTopEl = previewEl.find('#top');
const previewBottomEl = previewEl.find('#bottom');
const copyOutputEl = previewEl.find('#copy-output');

const getFormValues = () => {
  if (
    !(
      bottomHeightEl.val() !== '' &&
      bottomWidthEl.val() !== '' &&
      monitorHeightEl.val() !== '' &&
      monitorWidthEl.val() !== '' &&
      topHeightEl.val() !== '' &&
      topWidthEl.val() !== ''
    )
  ) {
    alert('Form is incomplete.');
    return;
  }

  const monitorWidth = parseInt(monitorWidthEl.val(), 10);
  const monitorHeight = parseInt(monitorHeightEl.val(), 10);
  const topWidth = parseInt(topWidthEl.val(), 10);
  const topHeight = parseInt(topHeightEl.val(), 10);
  const bottomWidth = parseInt(bottomWidthEl.val(), 10);
  const bottomHeight = parseInt(bottomHeightEl.val(), 10);

  return {
    bottomHeight,
    bottomWidth,
    monitorHeight,
    monitorWidth,
    topHeight,
    topWidth,
  };
};

const generateVerticalLayout = () => {
  const {
    bottomHeight,
    bottomWidth,
    monitorHeight,
    monitorWidth,
    topHeight,
    topWidth,
  } = getFormValues();

  if (Math.max(topWidth, bottomWidth) > monitorWidth) {
    alert('Screens are too wide to fit your monitor.');
    return;
  }

  if (topHeight + bottomHeight > monitorHeight) {
    alert('Screens are too tall to fit your monitor.');
    return;
  }

  const emptySpace = monitorHeight - topHeight - bottomHeight;
  const borderSpacing = Math.round(emptySpace / 3);
  const centerSpace = emptySpace - borderSpacing * 2;

  const topTop = borderSpacing;
  const topBottom = topTop + topHeight;
  const topLeft = (monitorWidth - topWidth) / 2;
  const topRight = topLeft + topWidth;

  const bottomTop = topBottom + centerSpace;
  const bottomBottom = bottomTop + bottomHeight;
  const bottomLeft = (monitorWidth - bottomWidth) / 2;
  const bottomRight = bottomLeft + bottomWidth;

  outputLayout({
    monitorHeight,
    monitorWidth,

    topBottom,
    topHeight,
    topLeft,
    topRight,
    topTop,
    topWidth,

    bottomBottom,
    bottomHeight,
    bottomLeft,
    bottomRight,
    bottomTop,
    bottomWidth,
  });
};

const generateHorizontalLayout = () => {
  const {
    bottomHeight,
    bottomWidth,
    monitorHeight,
    monitorWidth,
    topHeight,
    topWidth,
  } = getFormValues();

  if (topWidth + bottomWidth > monitorWidth) {
    alert('Screens are too wide to fit your monitor.');
    return;
  }

  if (Math.max(topHeight, bottomHeight) > monitorWidth) {
    alert('Screens are too tall to fit your monitor.');
    return;
  }

  const emptySpace = monitorWidth - topWidth - bottomWidth;
  const borderSpacing = Math.round(emptySpace / 3);
  const centerSpace = emptySpace - borderSpacing * 2;

  const topTop = (monitorHeight - topHeight) / 2;
  const topBottom = topTop + topHeight;
  const topLeft = borderSpacing;
  const topRight = topLeft + topWidth;

  const bottomTop = (monitorHeight - bottomHeight) / 2;
  const bottomBottom = bottomTop + bottomHeight;
  const bottomLeft = topRight + centerSpace;
  const bottomRight = bottomLeft + bottomWidth;

  outputLayout({
    monitorHeight,
    monitorWidth,

    topBottom,
    topHeight,
    topLeft,
    topRight,
    topTop,
    topWidth,

    bottomBottom,
    bottomHeight,
    bottomLeft,
    bottomRight,
    bottomTop,
    bottomWidth,
  });
};

const generateSingleScreenLayout = () => {
  const { monitorHeight, monitorWidth, topHeight, topWidth } = getFormValues();

  if (topWidth > monitorWidth) {
    alert('Screen is too wide to fit your monitor.');
    return;
  }

  if (topHeight > monitorWidth) {
    alert('Screen is too tall to fit your monitor.');
    return;
  }

  const topTop = (monitorHeight - topHeight) / 2;
  const topBottom = topTop + topHeight;
  const topLeft = (monitorWidth - topWidth) / 2;
  const topRight = topLeft + topWidth;

  outputLayout({
    monitorHeight,
    monitorWidth,

    topBottom,
    topHeight,
    topLeft,
    topRight,
    topTop,
    topWidth,

    bottomBottom: 0,
    bottomHeight: 0,
    bottomLeft: 0,
    bottomRight: 0,
    bottomTop: 0,
    bottomWidth: 0,
  });
};

const outputLayout = ({
  bottomBottom,
  bottomHeight,
  bottomLeft,
  bottomRight,
  bottomTop,
  bottomWidth,
  monitorHeight,
  monitorWidth,
  topBottom,
  topHeight,
  topLeft,
  topRight,
  topTop,
  topWidth,
}) => {
  outputEl.text(
    `custom_layout\\default=false
custom_layout=true
custom_top_left\\default=false
custom_top_left=${topLeft}
custom_top_top\\default=false
custom_top_top=${topTop}
custom_top_right\\default=false
custom_top_right=${topRight}
custom_top_bottom\\default=false
custom_top_bottom=${topBottom}
custom_bottom_left\\default=false
custom_bottom_left=${bottomLeft}
custom_bottom_top\\default=false
custom_bottom_top=${bottomTop}
custom_bottom_right\\default=false
custom_bottom_right=${bottomRight}
custom_bottom_bottom\\default=false
custom_bottom_bottom=${bottomBottom}`
  );

  const xScale = 478 / monitorWidth;
  const yScale = 268 / monitorHeight;

  previewTopEl.css({
    left: topLeft * xScale,
    top: topTop * yScale,
    width: topWidth * xScale,
    height: topHeight * yScale,
  });

  previewBottomEl.css({
    left: bottomLeft * xScale,
    top: bottomTop * yScale,
    width: bottomWidth * xScale,
    height: bottomHeight * yScale,
  });

  outputWrapperEl.removeAttr('hidden');
  copyOutputEl.text('Copy layout.');

  copyLayout(true);
};

const copyLayout = (silent = false) => {
  navigator.clipboard.writeText(outputEl.text());
  if (!silent) copyOutputEl.text('Layout copied.');
};

const recalculateTopHeight = () => {
  topHeightEl.val(
    topWidthEl.val() === ''
      ? ''
      : Math.round((topWidthEl.val() / defaultTopWidth) * defaultTopHeight)
  );
};
const recalculateBottomHeight = () => {
  bottomHeightEl.val(
    bottomWidthEl.val() === ''
      ? ''
      : Math.round(
          (bottomWidthEl.val() / defaultBottomWidth) * defaultBottomHeight
        )
  );
};

const recalculateTopWidth = () => {
  topWidthEl.val(
    topHeightEl.val() === ''
      ? ''
      : Math.round((topHeightEl.val() * defaultTopWidth) / defaultTopHeight)
  );
};
const recalculateBottomWidth = () => {
  bottomWidthEl.val(
    bottomHeightEl.val() === ''
      ? ''
      : Math.round(
          (bottomHeightEl.val() * defaultBottomWidth) / defaultBottomHeight
        )
  );
};

const setMonitorSize = (scale) => {
  monitorWidthEl.val(oneKWidth * scale);
  monitorHeightEl.val(oneKHeight * scale);
};

const setTopSize = (scale) => {
  let _scale = scale;

  const fullscreen = scale < 0;
  if (fullscreen) {
    _scale = Math.min(
      monitorWidthEl.val() / defaultTopWidth,
      monitorHeightEl.val() / defaultTopHeight
    );
  }

  topWidthEl.val(defaultTopWidth * _scale);
  topHeightEl.val(defaultTopHeight * _scale);
};

const setBottomSize = (scale) => {
  let _scale = scale;

  const fullscreen = scale < 0;
  if (fullscreen) {
    _scale = Math.min(
      monitorWidthEl.val() / defaultBottomWidth,
      monitorHeightEl.val() / defaultBottomHeight
    );
  }

  bottomWidthEl.val(defaultBottomWidth * _scale);
  bottomHeightEl.val(defaultBottomHeight * _scale);
};
