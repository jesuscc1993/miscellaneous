const container = jQuery('#images-container');
const imageIds = [
  10001, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20011,
  20012, 20014, 21001, 21002, 21003, 21004, 21005, 21006, 21007,
];
const imageSrc = `https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img/sp/mypage/town/$id/bg.jpg`;

appendImages({ container, imageIds, imageSrc });
