const query = `https://www.youtube.com/results?sp=CAI%3D&search_query=-MMD+-reaction+-español+-subespañol+-idsub+-vietsub+-"sub+indo"+-"ru+sub"+-中文+-ซับไทย+`;

const fetchJson = (url) => {
  return fetch(url).then((response) => response.json());
};

const initialize = () => {
  fetchJson('talents.json').then((talentsMap) => {
    const output = jQuery('#output');

    const talentsContainer = jQuery(`<div class="talents-container"></div>`);

    Object.keys(talentsMap).forEach((countryKey) => {
      const countryMap = talentsMap[countryKey];
      const countryContainer = jQuery(
        `<div class="talent-country"><h2>${countryKey}</h2></div>`
      );

      Object.keys(countryMap)
        .reverse()
        .forEach((groupKey) => {
          const talentsList = countryMap[groupKey];
          const groupContainer = jQuery(
            `<div class="talent-group"><h3>${groupKey}</h3></div>`
          );

          talentsList.forEach((talent) => {
            const talentContainer = jQuery(
              `<a class="talent ${
                talent.graduated ? 'graduated' : ''
              }" href="${encodeURI(query)}${sanitizeTalent(talent.name)}"></a>`
            );

            const talentImage = jQuery(
              `<img src="assets/images/portraits/${talent.name}.jpg">`
            );
            talentContainer.append(talentImage);

            const talentText = jQuery(
              `<div class="talent-text">${talent.name}</div>`
            );
            talentContainer.append(talentText);

            groupContainer.append(talentContainer);
          });

          countryContainer.append(groupContainer);
        });

      talentsContainer.append(countryContainer);
    });

    output.append(talentsContainer);
  });
};

const sanitizeTalent = (talent) => talent.replace(/ /g, '+');

initialize();
