const rarityBackgrounds = {
  3: 'assets/images/char_bg_red.png',
  4: 'https://webstatic-sea.hoyolab.com/app/community-game-records-sea/images/level_4_bg_s.7a6c5841.png',
  5: 'https://webstatic-sea.hoyolab.com/app/community-game-records-sea/images/level_5_bg_s.1ff411a0.png',
};

const getCharacterSprite = (item) => {
  return item.portrait
    ? `https://act.hoyoverse.com/hk4e/e20200928calculate/item_icon_u${item.portrait}.png`
    : `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${item.id}.png`;
};

const getWeaponSprite = (item) => {
  return `https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/UI_EquipIcon_${item.type}_${item.id}.png`;
};
