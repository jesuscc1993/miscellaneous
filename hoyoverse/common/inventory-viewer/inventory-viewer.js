const ItemType = {
  Character: 'character',
  Weapon: 'weapon',
};

const processList = (identifier, items, itemType) => {
  const output = jQuery(`#${identifier.toLowerCase()} .item-section`);

  const itemsGrid = jQuery(`
    <div class="items-grid ${identifier.toLowerCase()}-grid"></div>
  `);

  const areItemsWeapons = itemType === ItemType.Weapon;

  sortItems(filterItems(items, areItemsWeapons)).forEach((item) => {
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

  output.html(itemsGrid);
};

const processFilter = (identifier, items) => {
  const output = jQuery(`#${identifier.toLowerCase()} .filter-section`);

  const filterList = jQuery(`
    <div class="flex gap"></div>
  `);

  items.forEach((item) => {
    const filter = jQuery(`
      <div class="flex align-center justify-center">
        ${
          item === 'Any'
            ? `<h2 class="no-padding">Any</h2>`
            : `<img class="filter" src="${getFilterImg(identifier, item)}">`
        }
      </div>
      `);
    filter.click(() => setFilter(identifier.toLowerCase(), item));
    filterList.append(filter);
  });

  output.append(filterList);
};

const setFilter = (name, value) => {
  const newUrl = new URL(window.location.href);
  const params = new URLSearchParams(newUrl.search);
  params.set(name, value);
  newUrl.search = params.toString();
  history.pushState(null, '', newUrl);

  processLists();
};

const processLists = () => {
  processList('Characters', characters, ItemType.Character);
  processList('Weapons', weapons, ItemType.Weapon);
};

const initialize = () => {
  processFilter('Elements', elements);
  processFilter('Types', types);
  processLists();
};

const filterItems = (items, areItemsWeapons) => {
  const params = new URLSearchParams(window.location.search);
  const elementFilter = params.get('elements');
  const weaponFilter = params.get('types');

  let filteredItems = items;

  if (!areItemsWeapons && elementFilter && elementFilter !== 'Any') {
    filteredItems = filteredItems.filter(
      ({ element }) => element === elementFilter
    );
  }
  if (weaponFilter && weaponFilter !== 'Any') {
    filteredItems = filteredItems.filter(({ type }) => type === weaponFilter);
  }

  return filteredItems;
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
