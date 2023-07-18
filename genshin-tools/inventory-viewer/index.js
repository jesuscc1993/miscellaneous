const fetchJson = (url) => {
  return fetch(url).then((response) => response.json());
};

const processList = (identifier, items, itemType) => {
  const output = jQuery(`#${identifier}Output`);

  const itemsGrid = jQuery(`<div class="items-grid ${identifier}-grid"></div>`);

  sortItems(items).forEach((item) => {
    const artwork =
      item.portrait ||
      (itemType === ItemType.Weapon
        ? `https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/UI_EquipIcon_${item.type}_${item.id}.png`
        : `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${item.id}.png`);
    const artworkBackground = rarityBackgrounds[item.rarity];

    const shortItemName = item.name || item.id;
    const itemContainer = jQuery(
      `<div class="item ${itemType}" title="${
        item.fullName || shortItemName
      }"></div>`
    );

    const portrait = jQuery(`<div class="item-portrait"></div>`);
    portrait.css(
      `background`,
      `url(${artwork}) center top / 100% 100% no-repeat, url(${artworkBackground}) 0px 0px / 100% no-repeat`
    );
    itemContainer.append(portrait);

    const uncapText = jQuery(
      `<div class="item-text uncap-text center-text ${
        itemType === ItemType.Weapon && item.uncap > 4 ? 'maxed' : ''
      }">${item.uncap || (itemType === ItemType.Weapon ? 1 : 0)}</div>`
    );
    itemContainer.append(uncapText);

    const bottomText = jQuery(`<div class="item-text bottom-text"></div>`);

    const nameLine = jQuery(
      `<span class="center-text name">${shortItemName}</span>`
    );
    bottomText.append(nameLine);

    const levelLine = jQuery(
      `<span class="center-text level">Lvl. ${item.level}</span>`
    );
    bottomText.append(levelLine);

    itemContainer.append(bottomText);
    itemContainer.click(() => setItemBackground(item));
    itemsGrid.append(itemContainer);
  });

  output.append(itemsGrid);
};

const initialize = () => {
  processList('characters', characters, ItemType.Character);
  processList('weapons', weapons, ItemType.Weapon);
};

const sortItems = (items) => {
  return items.sort(
    (a, b) =>
      `${b.rarity}`.localeCompare(`${a.rarity}`) ||
      `${b.level}`.localeCompare(`${a.level}`) ||
      `${a.name || a.id}`.localeCompare(`${b.name || b.id}`)
  );
};

const setItemBackground = (item) => {
  jQuery('body').css(
    `backgroundImage`,
    `url(https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_${item.id}@2x.png)`
  );
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const ItemType = {
  Character: 'character',
  Weapon: 'weapon',
};

const rarityBackgrounds = {
  3: 'assets/images/char_bg_red.png',
  4: 'https://webstatic-sea.hoyolab.com/app/community-game-records-sea/images/level_4_bg_s.7a6c5841.png',
  5: 'https://webstatic-sea.hoyolab.com/app/community-game-records-sea/images/level_5_bg_s.1ff411a0.png',
};

initialize();
