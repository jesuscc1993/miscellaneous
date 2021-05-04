const fetchJson = (url) => {
  return fetch(url).then((response) => response.json());
};

const initialize = () => {
  fetchJson('units.json').then((elements) => {
    const output = jQuery('#output');

    Object.keys(elements).forEach((element) => {
      const units = elements[element];

      const unitsGrid = jQuery(`<div class="units-grid"></div>`);

      units.reverse().forEach((unit) => {
        unitsGrid.append(
          `<img class="unit-portrait" src="http://game-a1.granbluefantasy.jp/assets_en/img/sp/assets/npc/m/${unit}_01.jpg">`
        );
      });

      const elementUnits = jQuery(
        `<div class="element ${element}">
          <h3 id="${element}">${element.toUpperCase()}</h3>
        </div>`
      );

      elementUnits.append(unitsGrid);
      output.append(elementUnits);
    });
  });
};

initialize();
