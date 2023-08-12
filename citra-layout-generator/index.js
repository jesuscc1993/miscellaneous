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

  const topWidth = (topHeight * defaultTopWidth) / defaultTopHeight;
  const bottomWidth = (bottomHeight * defaultBottomWidth) / defaultBottomHeight;

  if (
    !(
      monitorWidth &&
      monitorHeight &&
      topWidth &&
      topHeight &&
      bottomWidth &&
      bottomHeight
    )
  ) {
    alert('Form is incomplete.');
    return;
  }

  if (topWidth > monitorWidth || bottomWidth > monitorWidth) {
    alert('Screens are too wide to fit your monitor.');
    return;
  }

  if (topHeight + bottomHeight > monitorHeight) {
    alert('Screens are too tall to fit your monitor.');
    return;
  }

  jQuery('#output').text(
    `custom_layout\\default=false
custom_layout=true
custom_top_left\\default=false
custom_top_left=${(monitorWidth - topWidth) / 2}
custom_top_top\\default=true
custom_top_top=0
custom_top_right\\default=false
custom_top_right=${(monitorWidth - topWidth) / 2 + topWidth}
custom_top_bottom\\default=false
custom_top_bottom=${topHeight}
custom_bottom_left\\default=false
custom_bottom_left=${(monitorWidth - bottomWidth) / 2}
custom_bottom_top\\default=false
custom_bottom_top=${monitorHeight - bottomHeight}
custom_bottom_right\\default=false
custom_bottom_right=${(monitorWidth - bottomWidth) / 2 + bottomWidth}
custom_bottom_bottom\\default=false
custom_bottom_bottom=${monitorHeight}`
  );
  jQuery('#output-wrapper').removeAttr('hidden');
};

const copyLayout = () => {
  jQuery('#output')[0].select();
  document.execCommand('copy');
  alert('Layout copied.');
};