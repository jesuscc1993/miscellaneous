const defaultTopWidth = 400;
const defaultTopHeight = 240;
const defaultBottomWidth = 320;
const defaultBottomHeight = 240;

const generateLayout = () => {
  const monitorWidth = parseInt(jQuery('#monitorWidth').val(), 10);
  const monitorHeight = parseInt(jQuery('#monitorHeight').val(), 10);
  // const topWidth = parseInt(jQuery('#topWidth').val(), 10);
  const topHeight = parseInt(jQuery('#topHeight').val(), 10);
  // const bottomWidth = parseInt(jQuery('#bottomWidth').val(), 10);
  const bottomHeight = parseInt(jQuery('#bottomHeight').val(), 10);

  if (!(monitorWidth && monitorHeight && topHeight && bottomHeight)) {
    alert('Form is incomplete.');
    return;
  }

  generateVerticalLayout({
    bottomHeight,
    monitorHeight,
    monitorWidth,
    topHeight,
  });
};

const generateVerticalLayout = ({
  bottomHeight,
  monitorHeight,
  monitorWidth,
  topHeight,
}) => {
  const topWidth = (topHeight * defaultTopWidth) / defaultTopHeight;
  const bottomWidth = (bottomHeight * defaultBottomWidth) / defaultBottomHeight;

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

  jQuery('#topWidth').val(topWidth);
  jQuery('#bottomWidth').val(bottomWidth);

  outputLayout({
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
  jQuery('#output').text(
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

  jQuery('#preview').css({ width: monitorWidth, height: monitorHeight });

  jQuery('#preview #top').css({
    width: topWidth,
    height: topHeight,
    top: topTop,
    left: topLeft,
  });
  jQuery('#preview #bottom').css({
    width: bottomWidth,
    height: bottomHeight,
    top: bottomTop,
    left: bottomLeft,
  });

  jQuery('#output-wrapper').removeAttr('hidden');
  jQuery('#copy').text('Copy layout.');
};

const copyLayout = () => {
  navigator.clipboard.writeText(jQuery('#output').text());
  jQuery('#copy').text('Layout copied.');
};
