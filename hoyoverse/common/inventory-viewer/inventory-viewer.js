const ItemType = {
  Character: 'character',
  Weapon: 'weapon',
};

const processList = (identifier, items, itemType) => {
  const output = jQuery(`#${identifier.toLowerCase()} .item-section`);

  const itemsGrid = jQuery(`
    <div class="items-grid ${identifier.toLowerCase()}-grid">
      <h2 class="grid-heading">${identifier}</h2>
    </div>
  `);

  const areItemsWeapons = itemType === ItemType.Weapon;

  sortItems(items).forEach((item) => {
    const artwork = areItemsWeapons
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

    const uncapText = areItemsWeapons
      ? getWeaponUncapText(item.uncap)
      : item.uncap;
    if (uncapText) {
      const uncapElement = jQuery(
        `<div class="item-text uncap-text center-text ${
          areItemsWeapons && item.uncap > 4 ? 'maxed' : ''
        }">${uncapText}</div>`
      );
      itemContainer.append(uncapElement);
    }

    const bottomText = jQuery(`<div class="item-text bottom-text"></div>`);

    const nameLine = jQuery(
      `<span class="center-text name">
        <span class="clamp ${
          areItemsWeapons ? 'clamp-2' : ''
        }">${shortItemName}</span>
      </span>`
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

  if (!areItemsWeapons) {
    // processElements(identifier);
  }
};

const processElements = (identifier) => {
  const output = jQuery(`#${identifier.toLowerCase()} .filter-section`);

  const elementsList = jQuery(`
    <div class="flex gap"></div>
  `);

  elements.forEach((element) => {
    elementsList.append(`
      <div>
        <img class="w-3r" src="${getElementImg(element)}">
      </div>
    `);
  });

  const elementFilters = jQuery(`
    <div>
      <h2 class="grid-heading">Elements</h2>
    </div>
    <br>
  `);
  elementFilters.append(elementsList);
  output.append(elementFilters);
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
