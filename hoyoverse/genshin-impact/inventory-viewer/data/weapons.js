const weapons = [
  { id: 'Amenoma',        level: 90, rarity: 5, uncap: 1, type: 'Sword',    name: 'Haran Geppaku...', fullName: 'Haran Geppaku Futsu' },
  { id: 'Amos',           level: 90, rarity: 5, uncap: 2, type: 'Bow',      name: "Amos' Bow" },
  { id: 'Bakufu',         level: 90, rarity: 4, uncap: 5, type: 'Bow',      name: 'Hamayumi' },
  { id: 'Bakufu',         level: 90, rarity: 4, uncap: 5, type: 'Claymore', name: 'Katsuragi Kirinaga...', fullName: 'Katsuragi Kirinagamasa' },
  { id: 'Bakufu',         level: 90, rarity: 4, uncap: 5, type: 'Pole',     name: 'Kitain Cross Spear' },
  { id: 'Bakufu',         level: 90, rarity: 4, uncap: 5, type: 'Sword',    name: 'Amenoma Kageuchi' },
  { id: 'Bakufu',         level: 90, rarity: 4, uncap: 1, type: 'Catalyst', name: 'Hakushin Ring' },
  { id: 'Exotic',         level: 90, rarity: 4, uncap: 5, type: 'Bow',      name: 'Composite Bow' },
  { id: 'Exotic',         level: 90, rarity: 4, uncap: 5, type: 'Catalyst', name: 'Mappa Mare' },
  { id: 'Exotic',         level: 90, rarity: 4, uncap: 5, type: 'Pole',     name: 'Crescent Pike' },
  { id: 'Exotic',         level: 90, rarity: 4, uncap: 5, type: 'Sword',    name: 'Iron Sting' },
  { id: 'Falcon',         level: 90, rarity: 5, uncap: 2, type: 'Sword',    name: 'Aquila Favonia' },
  { id: 'Fallensun',      level: 90, rarity: 4, uncap: 5, type: 'Bow',      name: 'Fading Twilight' },
  { id: 'Fleurfair',      level: 90, rarity: 4, uncap: 5, type: 'Bow',      name: 'Windblume Ode' },
  { id: 'Fleurfair',      level: 90, rarity: 4, uncap: 5, type: 'Claymore', name: 'Mailed Flower' },
  { id: 'Fossil',         level: 90, rarity: 4, uncap: 5, type: 'Bow',      name: 'Sacrificial Bow' },
  { id: 'Fossil',         level: 90, rarity: 4, uncap: 5, type: 'Catalyst', name: 'Sacrificial Fragments' },
  { id: 'Fossil',         level: 90, rarity: 4, uncap: 5, type: 'Claymore', name: 'Sacrificial Greatsword' },
  { id: 'Fossil',         level: 90, rarity: 4, uncap: 5, type: 'Sword',    name: 'Sacrificial Sword' },
  { id: 'Fourwinds',      level: 90, rarity: 5, uncap: 1, type: 'Catalyst', name: 'Lost Prayer to the...', fullName: 'Lost Prayer to the Sacred Winds' },
  { id: 'Ibis',           level: 90, rarity: 4, uncap: 5, type: 'Bow',      name: 'Ibis Piercer', portrait: 'u587xe/d0487b5253419380af5f2afbb726fe8d' },
  { id: 'Jyanome',        level: 90, rarity: 4, uncap: 5, type: 'Catalyst', name: 'Oathsworn Eye' },
  { id: 'Kasabouzu',      level: 90, rarity: 4, uncap: 5, type: 'Sword',    name: 'Kasabouzu' },
  { id: 'Ludiharpastum',  level: 90, rarity: 4, uncap: 5, type: 'Catalyst', name: 'Dodoco Tales' },
  { id: 'Magnum',         level: 90, rarity: 4, uncap: 5, type: 'Sword',    name: 'Festering Desire' },
  { id: 'Maria',          level: 90, rarity: 4, uncap: 2, type: 'Claymore', name: 'Akuoumaru' },
  { id: 'MillenniaTuna',  level: 90, rarity: 4, uncap: 5, type: 'Claymore', name: 'Luxurious Sea-Lord' },
  { id: 'Mori',           level: 90, rarity: 4, uncap: 5, type: 'Pole',     name: 'The Catch' },
  { id: 'Narukami',       level: 90, rarity: 5, uncap: 1, type: 'Pole',     name: 'Engulfing Lightning' },
  { id: 'Narukami',       level: 90, rarity: 5, uncap: 1, type: 'Sword',    name: 'Mistsplitter Reforged' },
  { id: 'Opus',           level: 90, rarity: 4, uncap: 5, type: 'Sword',    name: 'Cinnabar Spindle' },
  { id: 'Outlaw',         level: 80, rarity: 4, uncap: 1, type: 'Bow',      name: "Alley Hunter" },
  { id: 'Proto',          level: 90, rarity: 4, uncap: 5, type: 'Bow',      name: 'Prototype Crescent' },
  { id: 'Proto',          level: 90, rarity: 4, uncap: 5, type: 'Catalyst', name: 'Prototype Amber' },
  { id: 'Proto',          level: 90, rarity: 4, uncap: 5, type: 'Claymore', name: 'Prototype Archaic' },
  { id: 'Proto',          level: 90, rarity: 4, uncap: 5, type: 'Pole',     name: 'Prototype Starglitter' },
  { id: 'Proto',          level: 90, rarity: 4, uncap: 5, type: 'Sword',    name: 'Prototype Rancour' },
  { id: 'Recluse',        level: 90, rarity: 4, uncap: 5, type: 'Bow',      name: 'Rust' },
  { id: 'Santika',        level: 90, rarity: 5, uncap: 1, type: 'Pole',     name: 'Calamity Queller' },
  { id: 'Stardust',       level: 90, rarity: 4, uncap: 5, type: 'Pole',     name: "Dragon's Bane" },
  { id: 'Troupe',         level: 90, rarity: 4, uncap: 3, type: 'Bow',      name: 'The Stringless' },
  { id: 'Troupe',         level: 90, rarity: 4, uncap: 3, type: 'Catalyst', name: 'The Widsith' },
  { id: 'Windvane',       level: 90, rarity: 4, uncap: 5, type: 'Pole',     name: 'Missive Windspear' },
  { id: 'Wolfmound',      level: 90, rarity: 5, uncap: 1, type: 'Claymore', name: "Wolf's Gravestone" },
  { id: 'Zephyrus',       level: 90, rarity: 4, uncap: 4, type: 'Sword',    name: 'Favonius Sword' },
  { id: 'Zephyrus',       level: 90, rarity: 4, uncap: 5, type: 'Bow',      name: 'Favonius Warbow' },
  { id: 'Zephyrus',       level: 90, rarity: 4, uncap: 5, type: 'Catalyst', name: 'Favonius Codex' },
  { id: 'Zephyrus',       level: 90, rarity: 4, uncap: 5, type: 'Claymore', name: 'Favonius Greatsword' },
  { id: 'Zephyrus',       level: 90, rarity: 4, uncap: 5, type: 'Pole',     name: 'Favonius Lance' },
];

/* https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/weapons.json */
