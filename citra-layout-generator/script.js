const oneKWidth = 960;
const oneKHeight = 540;
const defaultTopWidth = 400;
const defaultTopHeight = 240;
const defaultBottomWidth = 320;
const defaultBottomHeight = 240;

const monitorWidthEl = document.querySelector('#monitor-width');
const monitorHeightEl = document.querySelector('#monitor-height');
const topWidthEl = document.querySelector('#top-width');
const topHeightEl = document.querySelector('#top-height');
const bottomWidthEl = document.querySelector('#bottom-width');
const bottomHeightEl = document.querySelector('#bottom-height');
const bottomOpacityEl = document.querySelector('#bottom-opacity');

const copyMessageEl = document.querySelector('#copy-message');
const outputEl = document.querySelector('#output');
const outputHeaderNode = document.querySelector('#output-header');
const outputWrapperEl = document.querySelector('#output-wrapper');
const previewEl = document.querySelector('#preview');
const swapScreensEl = document.querySelector('#swap-screens');
const overlapScreensEl = document.querySelector('#overlap-screens');
const previewTopEl = previewEl.querySelector('#top');
const previewBottomEl = previewEl.querySelector('#bottom');

const getFormValues = () => {
  if (
    !(
      bottomHeightEl.value !== '' &&
      bottomWidthEl.value !== '' &&
      monitorHeightEl.value !== '' &&
      monitorWidthEl.value !== '' &&
      topHeightEl.value !== '' &&
      topWidthEl.value !== ''
    )
  ) {
    alert('Form is incomplete.');
    return;
  }

  const monitorWidth = parseInt(monitorWidthEl.value, 10);
  const monitorHeight = parseInt(monitorHeightEl.value, 10);
  const topWidth = parseInt(topWidthEl.value, 10);
  const topHeight = parseInt(topHeightEl.value, 10);
  const bottomWidth = parseInt(bottomWidthEl.value, 10);
  const bottomHeight = parseInt(bottomHeightEl.value, 10);
  const swapScreens = swapScreensEl.checked;
  const overlapScreens = overlapScreensEl.checked;

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
    alert(
      'Screens are too wide to fit your monitor.\n(To disable this verification, check "Overlap screens").'
    );
    return;
  }

  if (
    overlapScreens
      ? Math.max(topScreen.height, bottomScreen.height) > monitor.width
      : topScreen.height + bottomScreen.height > monitor.height
  ) {
    alert(
      'Screens are too tall to fit your monitor.\n(To disable this verification, check "Overlap screens").'
    );
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

  const bottomOpacity = bottomOpacityEl.value;

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

    bottomOpacity,
  });

  return true;
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

  return true;
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

  return true;
};

const getLayoutType = () => {
  return document.querySelector('input[name="layout-type"]:checked').value;
};

const generateLayout = (manual) => {
  const layouts = {
    vertical: generateVerticalLayout,
    single: generateSingleScreenLayout,
    horizontal: generateHorizontalLayout,
  };
  const success = layouts[getLayoutType()]();
  if (success && manual) {
    outputHeaderNode.scrollIntoView();
    copyLayout(true);
  }
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
  bottomOpacity,
}) => {
  outputEl.textContent = `custom_second_layer_opacity\\default=false
custom_second_layer_opacity=${bottomOpacity}
custom_layout\\default=false
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
custom_bottom_bottom=${bottomBottom}`;

  const scale = 478 / monitorWidth;

  previewEl.style.height = monitorHeight * scale + 2 + 'px';

  previewTopEl.style.backgroundImage = `url(./assets/images/${
    swapScreens ? 'bottom' : 'top'
  }.jpg)`;
  previewTopEl.style.left = topLeft * scale + 'px';
  previewTopEl.style.top = topTop * scale + 'px';
  previewTopEl.style.width = (topRight - topLeft) * scale + 'px';
  previewTopEl.style.height = (topBottom - topTop) * scale + 'px';
  previewTopEl.title = swapScreens ? 'Bottom' : 'Top';

  previewBottomEl.style.backgroundImage = `url(./assets/images/${
    swapScreens ? 'top' : 'bottom'
  }.jpg)`;
  previewBottomEl.style.left = bottomLeft * scale + 'px';
  previewBottomEl.style.top = bottomTop * scale + 'px';
  previewBottomEl.style.width = (bottomRight - bottomLeft) * scale + 'px';
  previewBottomEl.style.height = (bottomBottom - bottomTop) * scale + 'px';
  previewBottomEl.title = swapScreens ? 'Top' : 'Bottom';

  outputWrapperEl.removeAttribute('hidden');
  copyMessageEl.textContent = '';
};

const copyLayout = () => {
  navigator.clipboard.writeText(outputEl.textContent);

  copyMessageEl.textContent = 'Layout copied.';
  setTimeout(() => (copyMessageEl.textContent = ''), 2000);
};

const recalculateTopHeight = () => {
  topHeightEl.value =
    topWidthEl.value === ''
      ? ''
      : Math.round((topWidthEl.value / defaultTopWidth) * defaultTopHeight);

  generateLayout();
};

const recalculateBottomHeight = () => {
  bottomHeightEl.value =
    bottomWidthEl.value === ''
      ? ''
      : Math.round(
          (bottomWidthEl.value / defaultBottomWidth) * defaultBottomHeight
        );

  generateLayout();
};

const recalculateTopWidth = () => {
  topWidthEl.value =
    topHeightEl.value === ''
      ? ''
      : Math.round((topHeightEl.value * defaultTopWidth) / defaultTopHeight);

  generateLayout();
};

const recalculateBottomWidth = () => {
  bottomWidthEl.value =
    bottomHeightEl.value === ''
      ? ''
      : Math.round(
          (bottomHeightEl.value * defaultBottomWidth) / defaultBottomHeight
        );

  generateLayout();
};

const updateBottomOpacity = () => {
  previewBottomEl.style.opacity = bottomOpacityEl.value / 100;
  bottomOpacityEl.title = bottomOpacityEl.value;
};

const setMonitorSize = (scale) => {
  monitorWidthEl.value = Math.round(oneKWidth * scale);
  monitorHeightEl.value = Math.round(oneKHeight * scale);

  generateLayout();
};

const swapMonitorSizes = () => {
  const width = monitorWidthEl.value;
  const height = monitorHeightEl.value;
  monitorWidthEl.value = height;
  monitorHeightEl.value = width;

  generateLayout();
};

const setTopSize = (multiplier, auto) => {
  let _multiplier = multiplier;
  if (!_multiplier) {
    const layout = getLayoutType();

    const subtractedWidth =
      layout === 'horizontal' && auto === true ? bottomWidthEl.value : 0;

    const subtractedHeight =
      layout === 'vertical' && auto === true ? bottomHeightEl.value : 0;

    _multiplier = Math.min(
      (monitorWidthEl.value - subtractedWidth) / defaultTopWidth,
      (monitorHeightEl.value - subtractedHeight) / defaultTopHeight
    );
  }

  topWidthEl.value = defaultTopWidth * _multiplier;
  topHeightEl.value = defaultTopHeight * _multiplier;

  generateLayout();
};

const setBottomSize = (multiplier, auto) => {
  let _multiplier = multiplier;
  if (!_multiplier) {
    const layout = getLayoutType();

    const subtractedWidth =
      layout === 'horizontal' && auto === true ? topWidthEl.value : 0;

    const subtractedHeight =
      layout === 'vertical' && auto === true ? topHeightEl.value : 0;

    _multiplier = Math.min(
      (monitorWidthEl.value - subtractedWidth) / defaultBottomWidth,
      (monitorHeightEl.value - subtractedHeight) / defaultBottomHeight
    );
  }

  bottomWidthEl.value = defaultBottomWidth * _multiplier;
  bottomHeightEl.value = defaultBottomHeight * _multiplier;

  generateLayout();
};

const detectMonitorSize = () => {
  monitorWidthEl.value = screen.width;
  monitorHeightEl.value = screen.height;

  generateLayout();
};

const detectScreenMultipliers = () => {
  let maxWidthMultiplier = Math.floor(
    screen.width / (defaultTopWidth + defaultBottomWidth)
  );
  let maxHeightMultiplier = Math.floor(
    screen.height / (defaultTopHeight + defaultBottomHeight)
  );
  let multiplier = Math.min(maxWidthMultiplier, maxHeightMultiplier);

  topWidthEl.value = defaultTopWidth * multiplier;
  topHeightEl.value = defaultTopHeight * multiplier;
  bottomWidthEl.value = defaultBottomWidth * multiplier;
  bottomHeightEl.value = defaultBottomHeight * multiplier;
};

const initialize = () => {
  detectScreenMultipliers();
  detectMonitorSize();
};

initialize();
