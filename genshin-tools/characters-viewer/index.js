const fetchJson = (url) => {
  return fetch(url).then((response) => response.json());
};

const initialize = () => {
  fetchJson('characters.json').then((characters) => {
    const output = jQuery('#output');

    const charactersGrid = jQuery(`<div class="characters-grid"></div>`);

    sortCharacters(characters).forEach((character) => {
      const avatar = `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${character.id}.png`;
      const avatarbackground = rarityBackgrounds[character.rarity];

      const characterContainer = jQuery(`<div class="character"></div>`);

      const portrait = jQuery(`<div class="character-portrait"></div>`);
      portrait.css(
        `background`,
        `url(${avatar}) center top / 128px 128px no-repeat, url(${avatarbackground}) 0px 0px / 100% no-repeat`
      );
      characterContainer.append(portrait);

      const characterText = jQuery(`<div class="character-text"></div>`);

      const name = jQuery(`<span class="center-text">${character.name}</span>`);
      characterText.append(name);

      const level = jQuery(
        `<span class="center-text">${character.constellation}&#9733;  ${character.level} / ${character.levelCap}</span>`
      );
      characterText.append(level);

      characterContainer.append(characterText);
      characterContainer.click(() => setCharacterBackground(character));
      charactersGrid.append(characterContainer);
    });

    output.append(charactersGrid);
  });
};

const sortCharacters = (characters) => {
  return characters.sort(
    (a, b) =>
      `${b.rarity}`.localeCompare(`${a.rarity}`) ||
      `${b.levelCap}`.localeCompare(`${a.levelCap}`) ||
      `${b.level}`.localeCompare(`${a.level}`) ||
      `${b.constellation}`.localeCompare(`${a.constellation}`)
  );
};

const setCharacterBackground = (character) => {
  jQuery('body').css(
    `backgroundImage`,
    `url(https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_${character.id}@2x.png)`
  );
};

const rarityBackgrounds = {
  4: 'https://webstatic-sea.hoyolab.com/app/community-game-records-sea/images/level_4_bg_s.7a6c5841.png',
  5: 'https://webstatic-sea.hoyolab.com/app/community-game-records-sea/images/level_5_bg_s.1ff411a0.png',
};

initialize();
