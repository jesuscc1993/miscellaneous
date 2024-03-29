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
const outputHeaderNode = document.querySelector('#output-header');
const outputWrapperEl = jQuery('#output-wrapper');
const previewEl = jQuery('#preview');
const swapScreensEl = jQuery('#swap-screens');
const overlapScreensEl = jQuery('#overlap-screens');
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
  const overlapScreens = overlapScreensEl.prop('checked');

  const topScreen = { width: topWidth, height: topHeight };
  const bottomScreen = { width: bottomWidth, height: bottomHeight };
  const monitor = { width: monitorWidth, height: monitorHeight };

  return {
    bottomScreen,
    monitor,
    overlapScreens,
    swapScreens,
    topScreen,
  };
};

const generateVerticalLayout = () => {
  const { bottomScreen, monitor, overlapScreens, swapScreens, topScreen } =
    getFormValues();

  if (Math.max(topScreen.width, bottomScreen.width) > monitor.width) {
    alert('Screens are too wide to fit your monitor.');
    return;
  }

  if (
    overlapScreens
      ? Math.max(topScreen.height, bottomScreen.height) > monitor.width
      : topScreen.height + bottomScreen.height > monitor.height
  ) {
    alert('Screens are too tall to fit your monitor.');
    return;
  }

  const emptySpace = Math.max(
    monitor.height - topScreen.height - bottomScreen.height,
    0
  );
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

  const bottomTop = Math.min(
    topBottom + centerSpace,
    monitorHeight - secondScreen.height
  );
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
  const { bottomScreen, monitor, overlapScreens, swapScreens, topScreen } =
    getFormValues();

  if (
    overlapScreens
      ? Math.max(topScreen.width, bottomScreen.width) > monitor.width
      : topScreen.width + bottomScreen.width > monitor.width
  ) {
    alert('Screens are too wide to fit your monitor.');
    return;
  }

  if (Math.max(topScreen.height, bottomScreen.height) > monitor.width) {
    alert('Screens are too tall to fit your monitor.');
    return;
  }

  const emptySpace = Math.max(
    monitor.width - topScreen.width - bottomScreen.width,
    0
  );
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
  const bottomLeft = Math.min(
    topRight + centerSpace,
    monitorWidth - secondScreen.width
  );
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

const generateLayout = () => {
  const layoutType = jQuery('input[name="layout-type"]:checked').val();
  ({
    vertical: generateVerticalLayout,
    single: generateSingleScreenLayout,
    horizontal: generateHorizontalLayout,
  })[layoutType]();

  outputHeaderNode.scrollIntoView();
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

  const scale = 478 / monitorWidth;

  previewEl.css('height', monitorHeight * scale + 2);

  previewTopEl.css({
    backgroundImage: `url(./assets/images/${
      swapScreens ? 'bottom' : 'top'
    }.jpg)`,
    left: topLeft * scale,
    top: topTop * scale,
    width: (topRight - topLeft) * scale,
    height: (topBottom - topTop) * scale,
  });
  previewTopEl.attr('title', swapScreens ? 'Bottom' : 'Top');

  previewBottomEl.css({
    backgroundImage: `url(./assets/images/${
      swapScreens ? 'top' : 'bottom'
    }.jpg)`,
    left: bottomLeft * scale,
    top: bottomTop * scale,
    width: (bottomRight - bottomLeft) * scale,
    height: (bottomBottom - bottomTop) * scale,
  });
  previewBottomEl.attr('title', swapScreens ? 'Top' : 'Bottom');

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

const swapMonitorSizes = () => {
  const width = monitorWidthEl.val();
  const height = monitorHeightEl.val();
  monitorWidthEl.val(height);
  monitorHeightEl.val(width);
};

const setTopSize = (multiplier) => {
  let _multiplier = multiplier;

  if (!_multiplier) {
    _multiplier = Math.min(
      monitorWidthEl.val() / defaultTopWidth,
      monitorHeightEl.val() / defaultTopHeight
    );
  }

  topWidthEl.val(defaultTopWidth * _multiplier);
  topHeightEl.val(defaultTopHeight * _multiplier);
};

const setBottomSize = (multiplier) => {
  let _multiplier = multiplier;

  if (!_multiplier) {
    _multiplier = Math.min(
      monitorWidthEl.val() / defaultBottomWidth,
      monitorHeightEl.val() / defaultBottomHeight
    );
  }

  bottomWidthEl.val(defaultBottomWidth * _multiplier);
  bottomHeightEl.val(defaultBottomHeight * _multiplier);
};

const detectMonitorSize = () => {
  monitorWidthEl.val(screen.width);
  monitorHeightEl.val(screen.height);
};

const initialize = () => {
  detectMonitorSize();
};

initialize();
