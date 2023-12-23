//  Fetcher snippet:
//    jQuery('#lis-npc .img-item').toArray().map((e) => e.alt.match(/(\d+)/)[1])

const imageRoot =
  'https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/s/';

const fetchJson = (url) => {
  return fetch(url).then((response) => response.json());
};

const getBaseUrl = () => {
  return location.protocol + '//' + location.host + location.pathname;
};

const getSearchParams = () => {
  if (!location.search.length) return [];

  const params = location.search.slice(1).split('&');
  return params.reduce((acc, param) => {
    const [key, value] = param.split('=');
    acc[key] = value;
    return acc;
  }, {});
};

const initialize = () => {
  const searchParams = getSearchParams();
  const elementParam = searchParams.element;

  const output = jQuery('#output');

  fetchJson('units.json').then((elementsMap) => {
    const elementKeys = Object.keys(elementsMap);

    if (elementParam) {
      output.append(`
        <div class="links-container">
          <h3>Elements</h3>
          <a href="${getBaseUrl()}">🡠 All elements</a>
        </div>
      `);
    } else {
      generateElementLinks(elementKeys, elementParam);
    }

    elementKeys.forEach((element) => {
      if (elementParam && elementParam !== element) return;

      const units = elementsMap[element];

      const unitsGrid = jQuery(`<div class="units-grid"></div>`);

      units.reverse().forEach((unit) => {
        unitsGrid.append(`
          <a
            class="unit-link"
            target="_blank"
            href="https://gbf.wiki/index.php?search=${unit}"
          >
            <img
              class="unit-portrait"
              src="${imageRoot}${unit}_01.jpg"
            >
          </a>
        `);
      });

      const elementUnits = jQuery(`
        <div class="element ${element}">
          <h3 id="${element}">${element.toUpperCase()}</h3>
        </div>
      `);

      elementUnits.append(unitsGrid);
      output.append(elementUnits);
    });
  });
};

const generateElementLinks = (elements) => {
  const output = jQuery('#output');

  const baseUrl = getBaseUrl();

  const elementAnchors = jQuery(
    '<div class="links-container"><h3>Elements</h3></div>'
  );

  const sectionAnchors = jQuery(
    '<div class="links-container"><h3>Sections</h3></div>'
  );

  elements.forEach((element, i) => {
    const label = element.toUpperCase();

    if (i > 0) {
      elementAnchors.append(`/`);
      sectionAnchors.append(`/`);
    }

    elementAnchors.append(
      `<a href="${baseUrl}?element=${element}">${label}</a>`
    );
    sectionAnchors.append(`<a href="${baseUrl}#${element}">${label}</a>`);
  });

  output.append(elementAnchors);
  output.append(sectionAnchors);
};

initialize();
