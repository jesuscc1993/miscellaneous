const defaultText =
  'The quick brown fox jumps over the lazy dog\nABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789';
let defaultFontSize = 40;

const updateFontSizes = (fontSize) => {
  updateFontSize('textInput', fontSize);
  updateFontSize('textOutput1', fontSize);
  updateFontSize('textOutput2', fontSize);
};

const updateFontSize = (targetId, fontSize) => {
  document.getElementById(targetId).style.fontSize = `${fontSize}px`;
};

const resetFontSizes = () => {
  document.getElementById('fontSizeInput').value = fontSize = defaultFontSize;
  updateFontSizes(fontSize);
};

const updateFontFamily = (targetId, fontFamily) => {
  document.getElementById(targetId).style.fontFamily = fontFamily;
  document.querySelector(`label[for="${targetId}"]`).innerHTML = fontFamily;
};

const updateInputs = (value) => {
  document.getElementById('textOutput1').value = value;
  document.getElementById('textOutput2').value = value;
};

const resetText = () => {
  document.getElementById('textInput').value = defaultText;
  updateInputs(defaultText);
};

const initialize = () => {
  updateFontFamily('textInput', 'sans-serif');
  updateFontFamily('textOutput1', 'serif');
  updateFontFamily('textOutput2', 'monospace');

  resetText();
  resetFontSizes();
};

initialize();
