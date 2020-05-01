const summonRootUrl =
  'http://game.granbluefantasy.jp/assets/img/sp/assets/summon/ls';

const elements = [
  { name: 'Fire' },
  { name: 'Water' },
  { name: 'Earth' },
  { name: 'Wind' },
  { name: 'Light' },
  { name: 'Dark' },
  { name: 'Misc 1' },
  { name: 'Misc 2' },
];

const sampleSummons = {
  fire: { id: '2040034000_02', uncap: 4 },
  water: { id: '2040028000_02', uncap: 4 },
  earth: { id: '2040027000_02', uncap: 4 },
  wind: { id: '2040020000_02', uncap: 4 },
  light: { id: '2040056000_02', uncap: 5 },
  dark: { id: '2040046000_02', uncap: 4 },
  misc_1: { id: '2040167000', uncap: 4 },
  misc_2: { id: '2040114000', uncap: 5 },
};

const supportSummonsForm = jQuery('#support-summons-form');

const initialize = () => {
  elements.forEach(({ name }) => {
    const ugglyName = uglifyString(name);

    jQuery('.summons-grid').append(`
      <div class="summon-portrait">
        <div class="element ${ugglyName}"></div>
        <span>${name}</span>
        ${getSummonImages()}
      </div>
    `);

    jQuery('.summons-form').append(`
      <div>
        <h3>${name}</h3>
        
        <div class="form-field">
          <label for="${ugglyName}-id">ID</label>
          <input id="${ugglyName}-id" name="${ugglyName}-id" class="summon-id" placeholder="0000000000" />
        </div>
        
        <div class="form-field">
          <label for="${ugglyName}-uncap">Uncap</label>
          <input id="${ugglyName}-uncap" name="${ugglyName}-uncap" class="summon-uncap" type="number" min="0" max="5" value="3" />
        </div>
      </div>
    `);
  });

  jQuery('#generate').click(() => generatePicture());
  jQuery('#loadSample').click(() => loadSample());
  jQuery('#download').click(() => download());
};

const loadSample = () => {
  if (confirm('This will override any current values. Proceed?')) {
    jQuery(`input#pid`).val(20810886);
    jQuery(`input#ign`).val('Naru Thighs');

    elements.forEach(({ name }) => {
      const ugglyName = uglifyString(name);
      const { id, uncap } = sampleSummons[ugglyName];

      jQuery(`input#${ugglyName}-id`).val(id);
      jQuery(`input#${ugglyName}-uncap`).val(uncap);
    });

    generatePicture();
  }
};

const uglifyString = (string) => string.toLowerCase().replace(/ /g, '_');

const getSummonImages = (summon) => {
  if (!(summon && summon.id)) {
    return '<img src="assets/images/empty_summon.png"><div class="uncap-stars"></div>';
  }

  const { id, uncap } = summon;
  // const fileName = `${id}${uncap > 3 ? `_0${uncap === 4 ? '2' : '3'}` : ``}`;
  const fileName = id;
  const portrait = `<img class="summon" src="${summonRootUrl}/${fileName}.jpg" />`;
  const uncapStars = new Array(uncap).fill(`<span class="uncap-star"></span>`);
  return `${portrait}<div class="uncap-stars">${uncapStars.join('')}</div>`;
};

const generatePicture = () => {
  const { pid, ign, ...formData } = getFormData();

  let title = pid ? `ID: ${pid}` : ``;
  title = ign ? (pid && ign ? `${title} / ` : ``) + `IGN: ${ign}` : title;
  jQuery('#frame-title').text(title);

  jQuery('.summons-grid').html('');
  elements.forEach(({ name }) => {
    const ugglyName = uglifyString(name);

    jQuery('.summons-grid').append(`
      <div class="summon-portrait">
        <div class="element ${ugglyName}"></div>
        <span>${name}</span>
        ${getSummonImages({
          id: formData[`${ugglyName}-id`],
          uncap: parseInt(formData[`${ugglyName}-uncap`], 10),
        })}
      </div>
    `);
  });

  // download();

  return formData;
};

const download = () => {
  setTimeout(() => {
    // html2canvas(jQuery('#summons-frame')[0], {
    //   backgroundColor: null,
    //   width: 640,
    //   height: 360,
    // }).then((canvas) => {
    //   jQuery('#output').html(canvas);
    // });
    //
    // html2canvas(jQuery('#summons-frame')[0], {
    //   backgroundColor: null,
    //   onrendered: (canvas) => {
    //     jQuery('#output').html(canvas);
    //   },
    // });
    //
    // domtoimage.toPng(jQuery('#summons-frame')[0]).then(function (dataUrl) {
    //   var img = new Image();
    //   img.src = dataUrl;
    //   document.body.appendChild(img);
    // });
  }, 150);
};

const getFormData = () => {
  return supportSummonsForm
    .serializeArray()
    .reduce(
      (formData, field) => ({ ...formData, [field.name]: field.value }),
      {},
    );
};

initialize();
