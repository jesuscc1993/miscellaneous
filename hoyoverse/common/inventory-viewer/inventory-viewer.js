const ItemType = {
  Character: 'character',
  Weapon: 'weapon',
};

const processList = (identifier, items, itemType) => {
  const output = jQuery(`#${identifier.toLowerCase()} .item-section`);

  const itemsGrid = jQuery(`
    <div class="items-grid ${identifier.toLowerCase()}-grid"></div>
  `);

  sortItems(items).forEach((item) => {
    const artwork =
      itemType === ItemType.Weapon
        ? getWeaponSprite(item)
        : getCharacterSprite(item);
    const artworkBackground = rarityBackgrounds[item.rarity];

    const shortItemName = item.name || item.id;
    const itemContainer = jQuery(
      `<div class="item rarity-${
        item.rarity
      } ${itemType} ${item.type.toLowerCase()} ${
        item.element ? item.element.toLowerCase() : ''
      }" title="${item.fullName || shortItemName}"></div>`
    );

    const portrait = jQuery(`<div class="item-portrait"></div>`);
    portrait.css(
      `background-image`,
      `url(${artwork}), url(${artworkBackground})`
    );
    itemContainer.append(portrait);

    const uncapText = jQuery(
      `<div class="item-text uncap-text center-text ${
        itemType === ItemType.Weapon && item.uncap > 4 ? 'maxed' : ''
      }">${
        itemType === ItemType.Weapon
          ? getWeaponUncapText(item.uncap || 1)
          : item.uncap
      }</div>`
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

  output.append(`<h2>${identifier}</h2>`);
  output.append(itemsGrid);
};

const initialize = () => {
  processList('Characters', characters, ItemType.Character);
  processList('Weapons', weapons, ItemType.Weapon);
};

const sortItems = (items) => {
  return items.sort(
    (a, b) =>
      `${b.rarity}`.localeCompare(`${a.rarity}`) ||
      `${b.level}`.localeCompare(`${a.level}`) ||
      `${b.type}`.localeCompare(`${a.type}`) ||
      `${b.element}`.localeCompare(`${a.element}`) ||
      `${b.uncap}`.localeCompare(`${a.uncap}`) ||
      `${a.name || a.id}`.localeCompare(`${b.name || b.id}`)
  );
};

const setItemBackground = (item) => {
  if (!!getItemBackground) {
    jQuery('body').css(`backgroundImage`, getItemBackground(item));
  }
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

initialize();
