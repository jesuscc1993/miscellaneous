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

const generateLayout = () => {
  const monitorWidth = parseInt(monitorWidthEl.val(), 10);
  const monitorHeight = parseInt(monitorHeightEl.val(), 10);
  const topWidth = parseInt(topWidthEl.val(), 10);
  const topHeight = parseInt(topHeightEl.val(), 10);
  const bottomWidth = parseInt(bottomWidthEl.val(), 10);
  const bottomHeight = parseInt(bottomHeightEl.val(), 10);

  if (
    !(
      bottomHeight &&
      bottomWidth &&
      monitorHeight &&
      monitorWidth &&
      topHeight &&
      topWidth
    )
  ) {
    alert('Form is incomplete.');
    return;
  }

  generateVerticalLayout({
    bottomHeight,
    bottomWidth,
    monitorHeight,
    monitorWidth,
    topHeight,
    topWidth,
  });
};

const generateVerticalLayout = ({
  bottomHeight,
  bottomWidth,
  monitorHeight,
  monitorWidth,
  topHeight,
  topWidth,
}) => {
  if (topWidth > monitorWidth || bottomWidth > monitorWidth) {
    alert('Screens are too wide to fit your monitor.');
    return;
  }

  if (topHeight + bottomHeight > monitorHeight) {
    alert('Screens are too tall to fit your monitor.');
    return;
  }

  const topLeft = (monitorWidth - topWidth) / 2;
  const topTop = 0;
  const topRight = (monitorWidth - topWidth) / 2 + topWidth;
  const topBottom = topHeight;
  const bottomLeft = (monitorWidth - bottomWidth) / 2;
  const bottomTop = monitorHeight - bottomHeight;
  const bottomRight = (monitorWidth - bottomWidth) / 2 + bottomWidth;
  const bottomBottom = monitorHeight;

  outputLayout({
    bottomHeight,
    bottomWidth,
    monitorHeight,
    monitorWidth,
    topHeight,
    topWidth,

    bottomBottom,
    bottomLeft,
    bottomRight,
    bottomTop,
    bottomWidth,

    topBottom,
    topHeight,
    topLeft,
    topRight,
    topTop,
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

  previewEl.css({ width: monitorWidth, height: monitorHeight });

  previewTopEl.css({
    width: topWidth,
    height: topHeight,
    top: topTop,
    left: topLeft,
  });
  previewBottomEl.css({
    width: bottomWidth,
    height: bottomHeight,
    top: bottomTop,
    left: bottomLeft,
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
    Math.round((topWidthEl.val() / defaultTopWidth) * defaultTopHeight)
  );
};
const recalculateBottomHeight = () => {
  bottomHeightEl.val(
    Math.round((bottomWidthEl.val() / defaultBottomWidth) * defaultBottomHeight)
  );
};

const recalculateTopWidth = () => {
  topWidthEl.val(
    Math.round((topHeightEl.val() * defaultTopWidth) / defaultTopHeight)
  );
};
const recalculateBottomWidth = () => {
  bottomWidthEl.val(
    Math.round(
      (bottomHeightEl.val() * defaultBottomWidth) / defaultBottomHeight
    )
  );
};
