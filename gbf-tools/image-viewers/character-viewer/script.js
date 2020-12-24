const examples = [
  { id: '3040027000', name: 'Anila' },
  { id: '3040202000', name: 'Athena' },
  { id: '3040070000', name: 'Beatrix' },
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

const assets = 'http://game-a.granbluefantasy.jp/assets_en/img/sp/assets/npc';
const questAssets =
  'http://game-a1.granbluefantasy.jp/assets_en/img/sp/quest/scene/character';
const characterVariants = ['', '_a', '_b', '_c'];

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
  if (characterId.length !== 10) {
    throw new Error('Character ID must be exactly 10 digits long');
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

  for (let i = 0; i < characterVariants.length; i++) {
    const variant = characterVariants[i];
    const characterRoot = `${questAssets}/body/${characterId}`;
    const variantRoot = `${characterRoot}${variant}`;

    appendImage(scene, `${variantRoot}.png`);
    for (let pose = 2; pose <= 3; pose++) {
      appendImage(scene, `${characterRoot}_0${pose}${variant}.png`);
    }

    appendImage(scene, `${variantRoot}_up.png`);
    appendImage(scene, `${variantRoot}_laugh_up.png`);
    for (let up = 1; up <= 3; up++) {
      appendImage(scene, `${variantRoot}_up${up}.png`);
      for (let laugh = 1; laugh <= 3; laugh++) {
        appendImage(scene, `${variantRoot}_laugh${laugh}_up${up}.png`);
      }
    }
  }
};

const clearCharacter = () => {
  location.href = baseUrl;
};

const appendImage = (container, src) => {
  container.append(
    `<a href="${src}"><img src="${src}" onerror="this.style.display='none'"></a>`
  );
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
