const examples = [
  { id: '3040027000', name: 'Anila' },
  { id: '3040202000', name: 'Athena' },
  { id: '3040070000', name: 'Beatrix' },
  { id: '3040070000_unarmed', name: 'Beatrix (unarmed)' },
  { id: '3040070000_unarmed2', name: 'Beatrix (unarmed2)' },
  { id: '3710085000', name: 'Beatrix (Skyfall Blue Kimono Outfit)' },
  { id: '3030013000', name: 'Lamretta' },
  { id: '3040063000', name: 'Narmaya' },
  { id: '3040181000', name: 'Pholia' },
  { id: '3040204000', name: 'Sen' },
  { id: '3040117000', name: 'Vane' },
  { id: '3710031000', name: 'Vane (The Dragon Knights Outfit)' },
  { id: '3040147000', name: 'Vajra' },
  { id: '3710082000', name: 'Vajra (Ritual Robes Outfit)' },
  { id: '3040105000', name: 'Yuisis' },
];

const baseUrl = location.href.split('?')[0];

const assets =
  'https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc';
const questAssets =
  'https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img/sp/quest/scene/character';
const characterVariants = ['', '_a', '_b', '_c'];
const characterEmotions = [
  'angry',
  'bad',
  'cry',
  'doya',
  'joy',
  'laugh',
  'mood',
  'mortifying',
  'pride',
  'sad',
  'serious',
  'shy',
  'suddenly',
  'surprise',
  'weak',
];

const characterIdInput = jQuery('#character-id');

const container = jQuery('#images-container');
const banners = container.find('.banners');
const inventoryM = container.find('.inventory-m');
const inventoryS = container.find('.inventory-s');
const party = container.find('.party');
const ougi = container.find('.ougi');
const full = container.find('.full');
const scene = container.find('.scene');

const loadCharacter = () => {
  const characterId = characterIdInput.val();
  if (characterId.length < 10) {
    throw new Error('Character ID must be exactly at least 10 digits long');
  }

  banners.html('');
  full.html('');
  inventoryM.html('');
  inventoryS.html('');
  ougi.html('');
  party.html('');
  scene.html('');

  for (let i = 1; i <= 3; i++) {
    appendImage(banners, `${assets}/detail/${characterId}_0${i}.png`);
    appendImage(full, `${assets}/zoom/${characterId}_0${i}.png`);
    appendImage(inventoryM, `${assets}/m/${characterId}_0${i}.jpg`);
    appendImage(inventoryS, `${assets}/s/${characterId}_0${i}.jpg`);
    appendImage(ougi, `${assets}/cutin_special/${characterId}_0${i}.jpg`);
    appendImage(party, `${assets}/f/${characterId}_0${i}.jpg`);
  }

  characterVariants.forEach((variant) => {
    const characterRoot = `${questAssets}/body/${characterId}`;
    const variantRoot = `${characterRoot}${variant}`;

    appendImage(scene, `${variantRoot}.png`);
    for (let variantIndex = 2; variantIndex <= 3; variantIndex++) {
      appendImage(scene, `${characterRoot}_0${variantIndex}${variant}.png`);
    }

    characterEmotions.forEach((emotion) => {
      for (let emotionIndex = 0; emotionIndex <= 3; emotionIndex++) {
        const emotionString = `${variantRoot}_${emotion}${
          emotionIndex === 0 ? '' : emotionIndex
        }`;

        appendImage(scene, `${emotionString}.png`);

        for (let upIndex = 0; upIndex <= 3; upIndex++) {
          appendImage(
            scene,
            `${emotionString}_up${upIndex === 0 ? '' : upIndex}.png`
          );
        }
      }
    });
  });
};

const clearCharacter = () => {
  location.href = baseUrl;
};

const appendImage = (container, src) => {
  container.append(`
    <a href="${src}" style="display: none">
      <img
        src="${src}"
        title="${src}"
        onerror="this.parentNode.remove()"
        onload="this.parentNode.style=''"
      >
    </a>`);
};

const loadExamples = () => {
  const examplesContainer = jQuery('.examples');

  for (let i = 0; i < examples.length; i++) {
    const { id, name } = examples[i];

    examplesContainer.append(`
      <li>
        <a href="?id=${id}">${name}</a
      </li>
    `);
  }
};

const initialize = () => {
  const search = window.location.search;
  const urlParams = new URLSearchParams(search);

  if (urlParams.get('id')) {
    characterIdInput.val(urlParams.get('id'));
    loadCharacter();
  }

  loadExamples();
};

initialize();
