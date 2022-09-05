const characters = [
  {
    "constellation": 4,
    "id": "Ambor",
    "level": 50,
    "levelCap": 60,
    "name": "Amber",
    "rarity": 4
  },
  {
    "constellation": 0,
    "id": "Ayaka",
    "level": 90,
    "levelCap": 90,
    "name": "Ayaka",
    "rarity": 5
  },
  {
    "constellation": 6,
    "id": "Barbara",
    "level": 80,
    "levelCap": 80,
    "name": "Barbara",
    "rarity": 4
  },
  {
    "constellation": 6,
    "id": "Beidou",
    "level": 80,
    "levelCap": 80,
    "name": "Beidou",
    "rarity": 4
  },
  {
    "constellation": 4,
    "id": "Bennett",
    "level": 80,
    "levelCap": 80,
    "name": "Bennett",
    "rarity": 4
  },
  {
    "constellation": 4,
    "id": "Chongyun",
    "level": 80,
    "levelCap": 80,
    "name": "Chongyun",
    "rarity": 4
  },
  {
    "constellation": 2,
    "id": "Sara",
    "level": 80,
    "levelCap": 80,
    "name": "Kujou Sara",
    "rarity": 4
  },
  {
    "constellation": 0,
    "id": "Heizo",
    "level": 40,
    "levelCap": 40,
    "name": "Heizou",
    "rarity": 4
  },
  {
    "constellation": 5,
    "id": "Feiyan",
    "level": 80,
    "levelCap": 80,
    "name": "Yanfei",
    "rarity": 4
  },
  {
    "constellation": 2,
    "id": "Diluc",
    "level": 90,
    "levelCap": 90,
    "name": "Diluc",
    "rarity": 5
  },
  {
    "constellation": 0,
    "id": "Shougun",
    "level": 90,
    "levelCap": 90,
    "name": "Ei",
    "rarity": 5
  },
  {
    "constellation": 0,
    "id": "Tartaglia",
    "level": 80,
    "levelCap": 80,
    "name": "Childe",
    "rarity": 5
  },
  {
    "constellation": 0,
    "id": "Aloy",
    "level": 50,
    "levelCap": 60,
    "name": "Aloy",
    "rarity": 4.5
  },
  {
    "constellation": 6,
    "id": "Diona",
    "level": 80,
    "levelCap": 80,
    "name": "Diona",
    "rarity": 4
  },
  {
    "constellation": 2,
    "id": "Rosaria",
    "level": 80,
    "levelCap": 80,
    "name": "Rosaria",
    "rarity": 4
  },
  {
    "constellation": 0,
    "id": "Eula",
    "level": 90,
    "levelCap": 90,
    "name": "Eula",
    "rarity": 5
  },
  {
    "constellation": 6,
    "id": "Fischl",
    "level": 80,
    "levelCap": 80,
    "name": "Fischl",
    "rarity": 4
  },
  {
    "constellation": 6,
    "id": "PlayerGirl",
    "level": 80,
    "levelCap": 80,
    "name": "Hotaru",
    "rarity": 5
  },
  {
    "constellation": 0,
    "id": "Qin",
    "level": 80,
    "levelCap": 80,
    "name": "Jean",
    "rarity": 5
  },
  {
    "constellation": 0,
    "id": "Ganyu",
    "level": 90,
    "levelCap": 90,
    "name": "Ganyu",
    "rarity": 5
  },
  {
    "constellation": 1,
    "id": "Kaeya",
    "level": 50,
    "levelCap": 60,
    "name": "Kaeya",
    "rarity": 4
  },
  {
    "constellation": 0,
    "id": "Kazuha",
    "level": 80,
    "levelCap": 80,
    "name": "Kazuha",
    "rarity": 5
  },
  {
    "constellation": 0,
    "id": "Tohma",
    "level": 50,
    "levelCap": 60,
    "name": "Thoma",
    "rarity": 4
  },
  {
    "constellation": 0,
    "id": "Keqing",
    "level": 80,
    "levelCap": 90,
    "name": "Keqing",
    "rarity": 5
  },
  {
    "constellation": 2,
    "id": "Lisa",
    "level": 50,
    "levelCap": 60,
    "name": "Lisa",
    "rarity": 4
  },
  {
    "constellation": 0,
    "id": "Mona",
    "level": 80,
    "levelCap": 80,
    "name": "Mona",
    "rarity": 5
  },
  {
    "constellation": 6,
    "id": "Ningguang",
    "level": 80,
    "levelCap": 80,
    "name": "Ningguang",
    "rarity": 4
  },
  {
    "constellation": 6,
    "id": "Noel",
    "level": 80,
    "levelCap": 80,
    "name": "Noelle",
    "rarity": 4
  },
  {
    "constellation": 0,
    "id": "Qiqi",
    "level": 80,
    "levelCap": 80,
    "name": "Qiqi",
    "rarity": 5
  },
  {
    "constellation": 6,
    "id": "Razor",
    "level": 50,
    "levelCap": 60,
    "name": "Razor",
    "rarity": 4
  },
  {
    "constellation": 3,
    "id": "Sayu",
    "level": 50,
    "levelCap": 60,
    "name": "Sayu",
    "rarity": 4
  },
  {
    "constellation": 4,
    "id": "Sucrose",
    "level": 60,
    "levelCap": 60,
    "name": "Sucrose",
    "rarity": 4
  },
  {
    "constellation": 0,
    "id": "Venti",
    "level": 80,
    "levelCap": 80,
    "name": "Venti",
    "rarity": 5
  },
  {
    "constellation": 6,
    "id": "Xiangling",
    "level": 80,
    "levelCap": 80,
    "name": "Xiangling",
    "rarity": 4
  },
  {
    "constellation": 6,
    "id": "Xingqiu",
    "level": 80,
    "levelCap": 80,
    "name": "Xingqiu",
    "rarity": 4
  },
  {
    "constellation": 3,
    "id": "Xinyan",
    "level": 50,
    "levelCap": 60,
    "name": "Xinyan",
    "rarity": 4
  },
  {
    "constellation": 0,
    "id": "Yunjin",
    "level": 50,
    "levelCap": 60,
    "name": "Yun Jin",
    "rarity": 4
  }
];
