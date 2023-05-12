const fetchJson = (url) => {
  return fetch(url).then((response) => response.json());
};

const processList = (identifier, items, itemType) => {
  const output = jQuery(`#${identifier}`);

  const itemsGrid = jQuery(`<div class="items-grid ${identifier}-grid"></div>`);

  sortItems(items).forEach((item) => {
    const artwork =
      itemType === ItemType.Weapon
        ? `https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/UI_EquipIcon_${item.type}_${item.id}.png`
        : `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${item.id}.png`;
    const artworkbackground = rarityBackgrounds[item.rarity];

    const itemContainer = jQuery(`<div class="item ${itemType}"></div>`);

    const portrait = jQuery(`<div class="item-portrait"></div>`);
    portrait.css(
      `background`,
      `url(${artwork}) center top / 100% 100% no-repeat, url(${artworkbackground}) 0px 0px / 100% no-repeat`
    );
    itemContainer.append(portrait);

    const uncapText = jQuery(
      `<div class="item-text uncap-text center-text ${
        itemType === ItemType.Weapon && item.uncap > 4 ? 'maxed' : ''
      }">${item.uncap || (itemType === ItemType.Weapon ? 1 : 0)}</div>`
    );
    itemContainer.append(uncapText);

    const itemText = jQuery(`<div class="item-text"></div>`);

    const shortItemName = item.name || item.id;
    const nameLine = jQuery(
      `<span class="center-text name" title="${
        item.fullName || shortItemName
      }">${shortItemName}</span>`
    );
    itemText.append(nameLine);

    const levelLine = jQuery(
      `<span class="center-text level">Lvl. ${item.level}</span>`
    );
    itemText.append(levelLine);

    itemContainer.append(itemText);
    itemContainer.click(() => setItemBackground(item));
    itemsGrid.append(itemContainer);
  });

  output.append(itemsGrid);
};

const initialize = () => {
  processList('charactersOutput', characters, ItemType.Character);
  processList('weaponsOutput', weapons, ItemType.Weapon);
};

const sortItems = (items) => {
  return items.sort(
    (a, b) =>
      `${b.rarity}`.localeCompare(`${a.rarity}`) ||
      `${b.level}`.localeCompare(`${a.level}`) ||
      `${a.name}`.localeCompare(`${b.name}`)
  );
};

const setItemBackground = (item) => {
  jQuery('body').css(
    `backgroundImage`,
    `url(https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_${item.id}@2x.png)`
  );
};

const ItemType = {
  Character: 'character',
  Weapon: 'weapon',
};

const rarityBackgrounds = {
  4: 'https://webstatic-sea.hoyolab.com/app/community-game-records-sea/images/level_4_bg_s.7a6c5841.png',
  4.5: 'assets/images/char_bg_red.png',
  5: 'https://webstatic-sea.hoyolab.com/app/community-game-records-sea/images/level_5_bg_s.1ff411a0.png',
};

initialize();
