const getCharacterSprite = (item) => {
  return item.portrait
    ? getPortrait(item)
    : `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${item.id}.png`;
};

const getWeaponSprite = (item) => {
  return item.portrait
    ? getPortrait(item)
    : `https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/UI_EquipIcon_${item.type}_${item.id}.png`;
};

const getPortrait = (item) => {
  return `https://act-webstatic.hoyoverse.com/darkmatter/hkrpg/prod_gf_cn/item_icon_${item.portrait}.png`;
};

const getWeaponUncapText = (uncap) => {
  return ['', 'I', 'II', 'III', 'IV', 'V'][uncap];
};

let weapons = [];
let characters = [];

const initialize = () => {
  Promise.all([
    fetch('data/weapons.json').then((res) => res.json()),
    fetch('data/characters.json').then((res) => res.json()),
  ]).then(([weaponsJson, charactersJson]) => {
    weapons = weaponsJson;
    characters = charactersJson;
    initializeViewer();

    // https://act.hoyolab.com/sr/event/calculator/index.html
  });
};

initialize();
