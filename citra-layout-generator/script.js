const oneKWidth = 960;
const oneKHeight = 540;
const defaultTopWidth = 400;
const defaultTopHeight = 240;
const defaultBottomWidth = 320;
const defaultBottomHeight = 240;

const monitorWidthEl = jQuery('#monitor-width');
const monitorHeightEl = jQuery('#monitor-height');
const topWidthEl = jQuery('#top-width');
const topHeightEl = jQuery('#top-height');
const bottomWidthEl = jQuery('#bottom-width');
const bottomHeightEl = jQuery('#bottom-height');

const copyOutputEl = jQuery('#copy-output');
const outputEl = jQuery('#output');
const outputWrapperEl = jQuery('#output-wrapper');
const previewEl = jQuery('#preview');
const swapScreensEl = jQuery('#swap-screens');
const previewTopEl = previewEl.find('#top');
const previewBottomEl = previewEl.find('#bottom');

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
  const swapScreens = swapScreensEl.prop('checked');

  const topScreen = { width: topWidth, height: topHeight };
  const bottomScreen = { width: bottomWidth, height: bottomHeight };
  const monitor = { width: monitorWidth, height: monitorHeight };

  return {
    bottomScreen,
    monitor,
    swapScreens,
    topScreen,
  };
};

const generateVerticalLayout = () => {
  const { bottomScreen, monitor, swapScreens, topScreen } = getFormValues();

  if (Math.max(topScreen.width, bottomScreen.width) > monitor.width) {
    alert('Screens are too wide to fit your monitor.');
    return;
  }

  if (topScreen.height + bottomScreen.height > monitor.height) {
    alert('Screens are too tall to fit your monitor.');
    return;
  }

  const emptySpace = monitor.height - topScreen.height - bottomScreen.height;
  const borderSpacing = Math.round(emptySpace / 3);
  const centerSpace = emptySpace - borderSpacing * 2;

  const firstScreen = swapScreens ? bottomScreen : topScreen;
  const secondScreen = swapScreens ? topScreen : bottomScreen;

  const monitorHeight = monitor.height;
  const monitorWidth = monitor.width;

  const topTop = borderSpacing;
  const topBottom = topTop + firstScreen.height;
  const topLeft = (monitor.width - firstScreen.width) / 2;
  const topRight = topLeft + firstScreen.width;

  const bottomTop = topBottom + centerSpace;
  const bottomBottom = bottomTop + secondScreen.height;
  const bottomLeft = (monitor.width - secondScreen.width) / 2;
  const bottomRight = bottomLeft + secondScreen.width;

  outputLayout({
    monitorHeight,
    monitorWidth,
    swapScreens,

    topBottom,
    topLeft,
    topRight,
    topTop,

    bottomBottom,
    bottomLeft,
    bottomRight,
    bottomTop,
  });
};

const generateHorizontalLayout = () => {
  const { bottomScreen, monitor, swapScreens, topScreen } = getFormValues();

  if (topScreen.width + bottomScreen.width > monitor.width) {
    alert('Screens are too wide to fit your monitor.');
    return;
  }

  if (Math.max(topScreen.height, bottomScreen.height) > monitor.width) {
    alert('Screens are too tall to fit your monitor.');
    return;
  }

  const emptySpace = monitor.width - topScreen.width - bottomScreen.width;
  const borderSpacing = Math.round(emptySpace / 3);
  const centerSpace = emptySpace - borderSpacing * 2;

  const firstScreen = swapScreens ? bottomScreen : topScreen;
  const secondScreen = swapScreens ? topScreen : bottomScreen;

  const monitorHeight = monitor.height;
  const monitorWidth = monitor.width;

  const topTop = (monitor.height - firstScreen.height) / 2;
  const topBottom = topTop + firstScreen.height;
  const topLeft = borderSpacing;
  const topRight = topLeft + firstScreen.width;

  const bottomTop = (monitor.height - secondScreen.height) / 2;
  const bottomBottom = bottomTop + secondScreen.height;
  const bottomLeft = topRight + centerSpace;
  const bottomRight = bottomLeft + secondScreen.width;

  outputLayout({
    monitorHeight,
    monitorWidth,
    swapScreens,

    topBottom,
    topLeft,
    topRight,
    topTop,

    bottomBottom,
    bottomLeft,
    bottomRight,
    bottomTop,
  });
};

const generateSingleScreenLayout = () => {
  const { bottomScreen, monitor, swapScreens, topScreen } = getFormValues();

  const firstScreen = swapScreens ? bottomScreen : topScreen;

  if (firstScreen.width > monitor.width) {
    alert('Screen is too wide to fit your monitor.');
    return;
  }

  if (firstScreen.height > monitor.width) {
    alert('Screen is too tall to fit your monitor.');
    return;
  }

  const monitorHeight = monitor.height;
  const monitorWidth = monitor.width;

  const topTop = (monitor.height - firstScreen.height) / 2;
  const topBottom = topTop + firstScreen.height;
  const topLeft = (monitor.width - firstScreen.width) / 2;
  const topRight = topLeft + firstScreen.width;

  outputLayout({
    monitorHeight,
    monitorWidth,
    swapScreens,

    topBottom,
    topLeft,
    topRight,
    topTop,

    bottomBottom: 0,
    bottomLeft: 0,
    bottomRight: 0,
    bottomTop: 0,
  });
};

const outputLayout = ({
  monitorHeight,
  monitorWidth,
  swapScreens,

  topBottom,
  topLeft,
  topRight,
  topTop,

  bottomBottom,
  bottomLeft,
  bottomRight,
  bottomTop,
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
    width: (topRight - topLeft) * xScale,
    height: (topBottom - topTop) * yScale,
  });
  previewTopEl.attr('title', swapScreens ? 'Bottom' : 'Top');
  previewTopEl.html(swapScreens ? 'B' : 'T');

  previewBottomEl.css({
    left: bottomLeft * xScale,
    top: bottomTop * yScale,
    width: (bottomRight - bottomLeft) * xScale,
    height: (bottomBottom - bottomTop) * yScale,
  });
  previewBottomEl.attr('title', swapScreens ? 'Top' : 'Bottom');
  previewBottomEl.html(swapScreens ? 'T' : 'B');

  outputWrapperEl.removeAttr('hidden');
  copyOutputEl.text('Copy layout.');

  copyLayout(true);
};

const copyLayout = (silent = false) => {
  navigator.clipboard.writeText(outputEl.text());
  if (!silent) {
    copyOutputEl.text('Layout copied.');
    setTimeout(() => copyOutputEl.text('Copy layout.'), 2000);
  }
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
