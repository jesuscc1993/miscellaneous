const rarityBackgrounds = {
  3: 'https://act.hoyolab.com/app/community-game-records-sea/rpg/images/character_r_3.bdfa75d1.png',
  4: 'https://act.hoyolab.com/app/community-game-records-sea/rpg/images/character_r_4.24f329b7.png',
  5: 'https://act.hoyolab.com/app/community-game-records-sea/rpg/images/character_r_5.99d42eb7.png',
};

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
