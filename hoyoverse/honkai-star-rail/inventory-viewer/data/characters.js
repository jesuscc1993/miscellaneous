const characters = [
  { id: 'Arlan',        level: 20,  rarity: 4, uncap: 1, type: 'Destruction',   element: 'Lightning', portrait: 'ua57cb/eac0d56ef4c1207feec82d8d6e4804b4' },
  { id: 'Asta',         level: 50,  rarity: 4, uncap: 2, type: 'Harmony',       element: 'Fire',      portrait: 'ua57cb/ce0425bc0e957690b997ae29dfaf5ebf' },
  { id: 'Clara',        level: 20,  rarity: 5, uncap: 0, type: 'Destruction',   element: 'Fire',      portrait: 'u642mb/79e076935e14b70feb8ddadb71525441' },
  { id: 'Dan Heng',     level: 20,  rarity: 4, uncap: 1, type: 'Hunt',          element: 'Wind',      portrait: 'ua57cb/f3a8eeefd215585ed00e9f46b01fec3a' },
  { id: 'Dr. Ratio',    level: 20,  rarity: 5, uncap: 0, type: 'Hunt',          element: 'Imaginary', portrait: 'u17ehb/bf890bf87a5e4a6581edc893971fbc59' },
  { id: 'Gepard',       level: 80,  rarity: 5, uncap: 0, type: 'Preservation',  element: 'Ice',       portrait: 'ua57cb/e52ed26b017cd0d7274db7c9d50273b1' },
  { id: 'Guinaifen',    level: 20,  rarity: 4, uncap: 1, type: 'Nihility',      element: 'Fire',      portrait: 'ua57cb/248c828e245022a1cbfce496fef9438d' },
  { id: 'Hanya',        level: 20,  rarity: 4, uncap: 6, type: 'Harmony',       element: 'Physical',  portrait: 'u17ehb/6faa8b81b922a093aa68b05f2e57cd5d' },
  { id: 'Herta',        level: 20,  rarity: 4, uncap: 5, type: 'Erudition',     element: 'Ice',       portrait: 'ua57cb/6384df67f715de95c0514ac39d9ae0ac' },
  { id: 'Himeko',       level: 20,  rarity: 5, uncap: 0, type: 'Erudition',     element: 'Fire',      portrait: 'u642mb/1d631dbfb3fcf62d271353bb12c56e11' },
  { id: 'Hook',         level: 20,  rarity: 4, uncap: 0, type: 'Destruction',   element: 'Fire',      portrait: 'u17ehb/a3fc2a11a162efee88620e3569f52906' },
  { id: 'Kafka',        level: 80,  rarity: 5, uncap: 0, type: 'Nihility',      element: 'Lightning', portrait: 'u17ehb/ff22a7ca44c32640a91d95db629ed0af' },
  { id: 'Lynx',         level: 80,  rarity: 4, uncap: 0, type: 'Abundance',     element: 'Quantum',   portrait: 'ua57cb/a545b6df482548b4d52381e22414bcb1' },
  { id: 'March 7th',    level: 20,  rarity: 4, uncap: 2, type: 'Preservation',  element: 'Ice',       portrait: 'ua57cb/44dc6542764632aa9b4ffcb06e09a28f' },
  { id: 'Natasha',      level: 50,  rarity: 4, uncap: 5, type: 'Abundance',     element: 'Physical',  portrait: 'ua57cb/d2e719f82a90f48091a36b4ba2246b66' },
  { id: 'Pela',         level: 20,  rarity: 4, uncap: 0, type: 'Nihility',      element: 'Ice',       portrait: 'u17ehb/a98a733363e8b1015ef666585eb6051e' },
  { id: 'Qingque',      level: 80,  rarity: 4, uncap: 6, type: 'Erudition',     element: 'Quantum',   portrait: 'ua57cb/67297fa3702c7025c0b6b2df6f993431' },
  { id: 'Ruan Mei',     level: 80,  rarity: 5, uncap: 0, type: 'Harmony',       element: 'Ice',       portrait: 'ud64eb/62f7576eba1d899f34d9ad6e314257f2' },
  { id: 'Sampo',        level: 20,  rarity: 4, uncap: 6, type: 'Nihility',      element: 'Wind',      portrait: 'ud9dkb/88bbc344892a13a1229b410fd8dacf72' },
  { id: 'Serval',       level: 40,  rarity: 4, uncap: 0, type: 'Erudition',     element: 'Lightning', portrait: 'ua57cb/831f9c13e7e917e385ec741f483a60da' },
  { id: 'Sparkle',      level: 20,  rarity: 5, uncap: 0, type: 'Harmony',       element: 'Quantum',   portrait: 'u642mb/ccca19b6318351ee87ad26bb8141a8a0' },
  { id: 'Sushang',      level: 20,  rarity: 4, uncap: 2, type: 'Hunt',          element: 'Fire',      portrait: 'ua57cb/a1b88d61f98bf9ac64d734162b6d095e' },
  { id: 'Tingyun',      level: 70,  rarity: 4, uncap: 0, type: 'Harmony',       element: 'Lightning', portrait: 'ua57cb/09c9db25a9759d7d586ddf22664d64fa' },
  { id: 'Trailblazer',  level: 80,  rarity: 5, uncap: 6, type: 'Preservation',  element: 'Fire',      portrait: 'ud64eb/a2c82fe65a3d3ad2fccb8b8b832ff7b7' },
  { id: 'Welt',         level: 20,  rarity: 5, uncap: 0, type: 'Nihility',      element: 'Imaginary', portrait: 'ud64eb/75a16b696f78eb9c0d02045fba7d4d0c' },
  { id: 'Xueyi',        level: 20,  rarity: 4, uncap: 1, type: 'Destruction',   element: 'Quantum',   portrait: 'ud64eb/a733a88b837f6e40e4af9c57ebc9838f' },
  { id: 'Yukong',       level: 20,  rarity: 4, uncap: 1, type: 'Harmony',       element: 'Imaginary', portrait: 'u17ehb/d548ae544df679792c14103e57977bc7' },
];
