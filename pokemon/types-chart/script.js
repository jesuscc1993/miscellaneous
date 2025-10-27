const bindButtons = () => {
  document.getElementById('toggleGuidesBtn').addEventListener('click', () => {
    document.documentElement.classList.toggle('guides');
  });
};

const splitLabelCharacters = () => {
  document.querySelectorAll('.label .label_text').forEach((label) => {
    const text = label.textContent;
    label.textContent = '';
    label.className += ' split';
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      label.appendChild(span);
    });
  });
};

bindButtons();
splitLabelCharacters();
