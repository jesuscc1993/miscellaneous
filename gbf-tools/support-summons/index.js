const summonRootUrl =
  'http://game.granbluefantasy.jp/assets/img/sp/assets/summon/ls';

const summonSlots = 2;

const elements = [
  { name: 'Fire' },
  { name: 'Water' },
  { name: 'Earth' },
  { name: 'Wind' },
  { name: 'Light' },
  { name: 'Dark' },
  { name: 'Misc' },
];

const sampleSummons = {
  fire: [
    { id: '2040034000_02', uncap: 4 },
    { id: '2040185000', uncap: 3 },
  ],
  water: [
    { id: '2040028000_02', uncap: 4 },
    { id: '2040225000', uncap: 3 },
  ],
  earth: [
    { id: '2040027000_02', uncap: 4 },
    { id: '2040205000', uncap: 3 },
  ],
  wind: [
    { id: '2040020000_02', uncap: 4 },
    { id: '2040261000', uncap: 3 },
  ],
  light: [
    { id: '2040047000_02', uncap: 4 },
    { id: '2040056000_02', uncap: 5 },
  ],
  dark: [
    { id: '2040046000_02', uncap: 4 },
    { id: '2040003000_02', uncap: 5 },
  ],
  misc: [
    { id: '2040167000', uncap: 4 },
    { id: '2040114000', uncap: 5 },
  ],
};

const supportSummonsForm = jQuery('#support-summons-form');
const summonsGrid = jQuery('.summons-grid');

const initialize = () => {
  elements.forEach(({ name }) => {
    const ugglyName = uglifyString(name);

    summonsGrid.append(`
      <div class="summon-portrait">
        <div class="element ${ugglyName}"></div>
        <span>${name}</span>
        ${getSummonImages()}
        ${getSummonImages()}
      </div>
    `);

    const elementGroup = jQuery(`
      <div>
        <h3>${name}</h3>
      </div>
    `);

    for (let i = 0; i < summonSlots; i++) {
      elementGroup.append(getSummonFormGroup(ugglyName, i));
    }

    jQuery('.summons-form').append(elementGroup);
  });

  jQuery('#generate').click(() => generatePicture());
  jQuery('#loadSample').click(() => loadSample());
  jQuery('#download').click(() => download());
};

const getSummonFormGroup = (ugglyName, index) => {
  return `
    <div class="form-group">
      <p>Slot ${index + 1}</p>
            
      <div class="form-field">
        <label for="${ugglyName}-${index}-id">ID</label>
        <input
          class="summon-id"
          id="${ugglyName}-${index}-id"
          name="${ugglyName}-${index}-id"
          placeholder="0000000000"
        />
      </div>
      
      <div class="form-field">
        <label for="${ugglyName}-${index}-uncap">Uncap</label>
        <input
          class="summon-uncap"
          id="${ugglyName}-${index}-uncap"
          max="5"
          min="0"
          name="${ugglyName}-${index}-uncap"
          type="number"
          value="3"
        />
      </div>
    </div>
  `;
};

const loadSample = () => {
  if (confirm('This will override any current values. Proceed?')) {
    jQuery(`input#pid`).val(20810886);
    jQuery(`input#ign`).val('Naru Thighs');

    elements.forEach(({ name }) => {
      const ugglyName = uglifyString(name);
      const summons = sampleSummons[ugglyName];
      summons.forEach(({ id, uncap }, index) => {
        jQuery(`input#${ugglyName}-${index}-id`).val(id);
        jQuery(`input#${ugglyName}-${index}-uncap`).val(uncap);
      });
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

  summonsGrid.html('');

  elements.forEach(({ name }) => {
    const ugglyName = uglifyString(name);

    const element = jQuery(`
      <div class="summon-portrait">
        <div class="element ${ugglyName}"></div>
        <span>${name}</span>
      </div>
    `);

    for (let i = 0; i < summonSlots; i++) {
      element.append(
        getSummonImages({
          id: formData[`${ugglyName}-${i}-id`],
          uncap: parseInt(formData[`${ugglyName}-${i}-uncap`], 10),
        })
      );
    }

    summonsGrid.append(element);
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
    // html2canvas(jQuery('#summons-frame')[0]).then((canvas) => {
    //   var tempcanvas = document.createElement('canvas');
    //   tempcanvas.width=465;
    //   tempcanvas.height=524;
    //   var context=tempcanvas.getContext('2d');
    //   context.drawImage(canvas,465,40,465,524,0,0,465,524);
    //   var link=document.createElement("a");
    //   link.href=canvas.toDataURL('image/jpg');
    //   link.download = 'screenshot.jpg';
    //   link.click();
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
      {}
    );
};

initialize();
