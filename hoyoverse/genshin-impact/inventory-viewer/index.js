const rarityBackgrounds = {
  3: 'https://act.hoyolab.com/app/community-game-records-sea/images/roleStarBg105.5a61ce94.png',
  4: 'https://act.hoyolab.com/app/community-game-records-sea/images/roleStarBg4.0b20569c.png',
  5: 'https://act.hoyolab.com/app/community-game-records-sea/images/roleStarBg5.30180c91.png',
};
const filterPaths = {
  elements: 'assets/images/elements/colored',
  types: 'assets/images/weapons',
};
const orderByType = ['Bow', 'Catalyst', 'Pole', 'Claymore', 'Sword'];

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
  return `https://act-webstatic.hoyoverse.com/hk4e/e20200928calculate/item_icon${item.portrait}.png`;
};

const getItemBackground = (item) => {
  return `url(https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_${item.id}@2x.png)`;
};

const getWeaponUncapText = (uncap) => {
  return uncap;
};
