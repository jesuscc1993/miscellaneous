const weapons = [
  { id: 'Amenoma', level: 90, rarity: 5, type: 'Sword', name: 'Haran Geppaku...', fullName: 'Haran Geppaku Futsu' },
  { id: 'Fourwinds', level: 90, rarity: 5, type: 'Catalyst', name: 'Lost Prayer to the...', fullName: 'Lost Prayer to the Sacred Winds' },
  { id: 'Amos', level: 90, name: "Amos' Bow", rarity: 5, type: 'Bow', uncap: 2 },
  { id: 'Bakufu', level: 90, name: 'Amenoma Kageuchi', rarity: 4, type: 'Sword', uncap: 5 },
  { id: 'Bakufu', level: 90, name: 'Hamayumi', rarity: 4, type: 'Bow', uncap: 5 },
  { id: 'Exotic', level: 90, name: 'Crescent Pike', rarity: 4, type: 'Pole', uncap: 5 },
  { id: 'Exotic', level: 90, name: 'Iron Sting', rarity: 4, type: 'Sword', uncap: 5 },
  { id: 'Exotic', level: 90, name: 'Mappa Mare', rarity: 4, type: 'Catalyst', uncap: 5 },
  { id: 'Falcon', level: 90, name: 'Aquila Favonia', rarity: 5, type: 'Sword' },
  { id: 'Fallensun', level: 90, name: 'Fading Twilight', rarity: 4, type: 'Bow', uncap: 5 },
  { id: 'Fleurfair', level: 90, name: 'Mailed Flower', rarity: 4, type: 'Claymore', uncap: 5 },
  { id: 'Fleurfair', level: 90, name: 'Windblume Ode', rarity: 4, type: 'Bow', uncap: 5 },
  { id: 'Fossil', level: 90, name: 'Sacrificial Bow', rarity: 4, type: 'Bow', uncap: 3 },
  { id: 'Fossil', level: 90, name: 'Sacrificial Fragments', rarity: 4, type: 'Catalyst', uncap: 5 },
  { id: 'Fossil', level: 90, name: 'Sacrificial Greatsword', rarity: 4, type: 'Claymore', uncap: 5 },
  { id: 'Fossil', level: 90, name: 'Sacrificial Sword', rarity: 4, type: 'Sword', uncap: 5 },
  { id: 'Ibis', level: 90, name: 'Ibis Piercer', portrait: 'https://upload-static.hoyoverse.com/hoyolab-wiki/2023/05/26/194600931/3c33fbd1aeadf27dc00617c3f4d31c55_8985435652169839567.png', rarity: 4, type: 'Bow', uncap: 5 },
  { id: 'Jyanome', level: 90, name: 'Hakushin Ring', rarity: 4, type: 'Catalyst', uncap: 5 },
  { id: 'Kasabouzu', level: 90, rarity: 4, type: 'Sword', uncap: 5 },
  { id: 'Ludiharpastum', level: 90, name: 'Dodoco Tales', rarity: 4, type: 'Catalyst', uncap: 5 },
  { id: 'Magnum', level: 90, name: 'Festering Desire', rarity: 4, type: 'Sword', uncap: 5 },
  { id: 'MillenniaTuna', level: 90, name: 'Luxurious Sea-Lord', rarity: 4, type: 'Claymore', uncap: 5 },
  { id: 'Mori', level: 90, name: 'The Catch', rarity: 4, type: 'Pole', uncap: 5 },
  { id: 'Narukami', level: 90, name: 'Engulfing Lightning', rarity: 5, type: 'Pole' },
  { id: 'Narukami', level: 90, name: 'Mistsplitter Reforged', rarity: 5, type: 'Sword' },
  { id: 'Opus', level: 90, rarity: 4, type: 'Sword', name: 'Cinnabar Spindle', uncap: 5 },
  { id: 'Proto', level: 90, name: 'Prototype Archaic', rarity: 4, type: 'Claymore', uncap: 5 },
  { id: 'Proto', level: 90, name: 'Prototype Rancour', rarity: 4, type: 'Sword', uncap: 5 },
  { id: 'Proto', level: 90, name: 'Prototype Starglitter', rarity: 4, type: 'Pole', uncap: 5 },
  { id: 'Recluse', level: 90, name: 'Rust', rarity: 4, type: 'Bow', uncap: 5 },
  { id: 'Santika', level: 90, name: 'Calamity Queller', rarity: 5, type: 'Pole' },
  { id: 'Troupe', level: 90, name: 'The Stringless', rarity: 4, type: 'Bow', uncap: 2 },
  { id: 'Troupe', level: 90, name: 'The Widsith', rarity: 4, type: 'Catalyst', uncap: 3 },
  { id: 'Windvane', level: 90, name: 'Missive Windspear', rarity: 4, type: 'Pole', uncap: 5 },
  { id: 'Wolfmound', level: 90, name: "Wolf's Gravestone", rarity: 5, type: 'Claymore' },
  { id: 'Zephyrus', level: 90, name: 'Favonius Codex', rarity: 4, type: 'Catalyst', uncap: 5 },
  { id: 'Zephyrus', level: 90, name: 'Favonius Greatsword', rarity: 4, type: 'Claymore', uncap: 5 },
  { id: 'Zephyrus', level: 90, name: 'Favonius Lance', rarity: 4, type: 'Pole', uncap: 5 },
  { id: 'Zephyrus', level: 90, name: 'Favonius Warbow', rarity: 4, type: 'Bow', uncap: 5 },
];

/* https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/weapons.json */
