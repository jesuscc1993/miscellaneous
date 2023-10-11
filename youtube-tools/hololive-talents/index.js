const blacklist = [
  'MMD',
  'español',
  'idsub',
  'indo',
  'reaction',
  'ru',
  'russian',
  'spanish',
  'subespañol',
  'vietsub',
  'ซับไทย',
  '中文',
];

const searchUrl = `https://www.youtube.com/results?search_query=`;
const query = `${searchUrl}-${blacklist.join('+-')}+`;

const fetchJson = (url) => {
  return fetch(url).then((response) => response.json());
};

const initialize = () => {
  fetchJson('assets/data/talents.json').then((talentsMap) => {
    const output = jQuery('#output');

    const talentsContainer = jQuery(`<div class="talents-container"></div>`);
    const linksContainer = jQuery(`<div class="links-container"></div>`);

    Object.keys(talentsMap).forEach((countryKey) => {
      const countryMap = talentsMap[countryKey];
      const countryContainer = jQuery(
        `<div class="talent-country"><h2 id="${countryKey}">${countryKey}</h2></div>`
      );
      const countryLinksContainer = jQuery(`<span></span>`);

      linksContainer.append(`
        <a href="#${sanitizeSpaces(countryKey)}">${countryKey}</a> : 
      `);

      Object.keys(countryMap)
        .reverse()
        .forEach((groupKey, i) => {
          const id = sanitizeSpaces(`${countryKey}-${groupKey}`);
          const talentsList = countryMap[groupKey];
          const groupContainer = jQuery(`
            <div class="talent-group">
               <h3 id="${id}">${groupKey}</h3>
            </div>
          `);
          countryLinksContainer.append(`
            ${i > 0 ? ' | ' : ''}
            <a href="#${id}">${groupKey}</a>
          `);

          talentsList.forEach((talent) => {
            const talentContainer = jQuery(
              `<a class="talent ${
                talent.graduated ? 'graduated' : ''
              }" href="${encodeURI(query)}${sanitizeSpaces(talent.name)}"></a>`
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
          linksContainer.append(countryLinksContainer);
        });

      linksContainer.append('<br />');
      talentsContainer.append(countryContainer);
    });

    output.append(linksContainer);
    output.append(talentsContainer);
  });
};

const sanitizeSpaces = (talent) => talent.replace(/ /g, '+');

initialize();
