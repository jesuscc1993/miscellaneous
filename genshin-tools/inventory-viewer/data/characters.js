const characters = [
  { id: 'Aloy',       level: 50, rarity: 3, uncap: 0, type: 'Bow' },
  { id: 'Ambor',      level: 50, rarity: 4, uncap: 4, type: 'Bow', name: 'Amber' },
  { id: 'Ayaka',      level: 90, rarity: 5, uncap: 0, type: 'Sword', name: 'Ayaka' },
  { id: 'Barbara',    level: 80, rarity: 4, uncap: 6, type: 'Catalyst' },
  { id: 'Beidou',     level: 80, rarity: 4, uncap: 6, type: 'Claymore' },
  { id: 'Bennett',    level: 90, rarity: 4, uncap: 4, type: 'Sword' },
  { id: 'Chongyun',   level: 80, rarity: 4, uncap: 6, type: 'Claymore' },
  { id: 'Collei',     level: 50, rarity: 4, uncap: 1, type: 'Bow' },
  { id: 'Dehya',      level: 80, rarity: 5, uncap: 0, type: 'Claymore' },
  { id: 'Diluc',      level: 90, rarity: 5, uncap: 0, type: 'Claymore' },
  { id: 'Diona',      level: 90, rarity: 4, uncap: 6, type: 'Bow' },
  { id: 'Dori',       level: 50, rarity: 4, uncap: 1, type: 'Claymore' },
  { id: 'Eula',       level: 90, rarity: 5, uncap: 0, type: 'Claymore' },
  { id: 'Faruzan',    level: 60, rarity: 4, uncap: 0, type: 'Catalyst' },
  { id: 'Feiyan',     level: 80, rarity: 4, uncap: 5, type: 'Catalyst', name: 'Yanfei' },
  { id: 'Fischl',     level: 80, rarity: 4, uncap: 6, type: 'Bow' },
  { id: 'Ganyu',      level: 90, rarity: 5, uncap: 0, type: 'Bow' },
  { id: 'Gorou',      level: 50, rarity: 4, uncap: 1, type: 'Bow' },
  { id: 'Heizo',      level: 50, rarity: 4, uncap: 0, type: 'Catalyst', name: 'Heizou' },
  { id: 'Kaeya',      level: 50, rarity: 4, uncap: 1, type: 'Sword' },
  { id: 'Kazuha',     level: 90, rarity: 5, uncap: 0, type: 'Sword', fullName: 'Kaedehara Kazuha' },
  { id: 'Keqing',     level: 80, rarity: 5, uncap: 0, type: 'Sword' },
  { id: 'Layla',      level: 50, rarity: 4, uncap: 0, type: 'Sword' },
  { id: 'Lisa',       level: 50, rarity: 4, uncap: 2, type: 'Catalyst' },
  { id: 'Mika',       level: 50, rarity: 4, uncap: 0, type: 'Pole' },
  { id: 'Momoka',     level: 90, rarity: 4, uncap: 0, type: 'Sword', name: 'Kirara', portrait: 'https://act.hoyoverse.com/hk4e/e20200928calculate/item_icon_u82ase/09f16853b42c95407e2071af70953556.png' },
  { id: 'Mona',       level: 80, rarity: 5, uncap: 0, type: 'Catalyst' },
  { id: 'Ningguang',  level: 80, rarity: 4, uncap: 6, type: 'Pole' },
  { id: 'Noel',       level: 80, rarity: 4, uncap: 6, type: 'Claymore', name: 'Noelle' },
  { id: 'PlayerGirl', level: 80, rarity: 5, uncap: 6, type: 'Sword', name: 'Tabibito' },
  { id: 'Qin',        level: 80, rarity: 5, uncap: 0, type: 'Sword', name: 'Jean' },
  { id: 'Qiqi',       level: 80, rarity: 5, uncap: 0, type: 'Sword' },
  { id: 'Razor',      level: 50, rarity: 4, uncap: 6, type: 'Claymore' },
  { id: 'Rosaria',    level: 80, rarity: 4, uncap: 2, type: 'Pole' },
  { id: 'Sara',       level: 80, rarity: 4, uncap: 2, type: 'Bow', name: 'Kujou Sara' },
  { id: 'Sayu',       level: 50, rarity: 4, uncap: 5, type: 'Claymore' },
  { id: 'Shenhe',     level: 90, rarity: 5, uncap: 0, type: 'Pole', name: 'Shenhe' },
  { id: 'Shougun',    level: 90, rarity: 5, uncap: 0, type: 'Pole', name: 'Shogun', fullName: 'Raiden Shogun' },
  { id: 'Sucrose',    level: 60, rarity: 4, uncap: 6, type: 'Catalyst' },
  { id: 'Tartaglia',  level: 80, rarity: 5, uncap: 0, type: 'Bow' },
  { id: 'Tighnari',   level: 80, rarity: 5, uncap: 0, type: 'Bow' },
  { id: 'Tohma',      level: 50, rarity: 4, uncap: 0, type: 'Pole', name: 'Thoma' },
  { id: 'Venti',      level: 90, rarity: 5, uncap: 0, type: 'Bow' },
  { id: 'Xiangling',  level: 80, rarity: 4, uncap: 6, type: 'Pole' },
  { id: 'Xingqiu',    level: 90, rarity: 4, uncap: 6, type: 'Sword' },
  { id: 'Xinyan',     level: 50, rarity: 4, uncap: 4, type: 'Claymore' },
  { id: 'Yaoyao',     level: 50, rarity: 4, uncap: 0, type: 'Pole' },
  { id: 'Yelan',      level: 90, rarity: 5, uncap: 0, type: 'Pole' },
  { id: 'Yunjin',     level: 50, rarity: 4, uncap: 0, type: 'Pole', name: 'Yun Jin' },
];

/* https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters.json */
