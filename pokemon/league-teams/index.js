const generateTeamCard = ({ region, team, teamB }) => {
  const regionCode = region.toLowerCase();

  const wrapperEl = document.createElement('div');
  wrapperEl.id = regionCode;
  wrapperEl.className = 'poke_region';

  const cardTitleEl = document.createElement('div');
  cardTitleEl.className = `poke_pane ${regionCode} title limited_width`;
  cardTitleEl.textContent = `${region} Region`;
  wrapperEl.appendChild(cardTitleEl);

  const cardBodyEl = document.createElement('div');
  cardBodyEl.className = `poke_pane ${regionCode} body main sideA`;
  wrapperEl.appendChild(cardBodyEl);

  if (team) {
    const { league, backup } = team;

    const sideAEl = document.createElement('div');
    sideAEl.className = 'poke_side sideA';
    cardBodyEl.appendChild(sideAEl);

    if (league?.length) {
      const leagueEl = document.createElement('div');
      leagueEl.className = 'poke_team league';
      league.forEach((pkm) => leagueEl.appendChild(generatePokemonSlot(pkm)));

      sideAEl.appendChild(leagueEl);
    }

    if (backup?.length) {
      const backupEl = document.createElement('div');
      backupEl.className = 'poke_team backup';
      backup.forEach((pkm) => backupEl.appendChild(generatePokemonSlot(pkm)));

      sideAEl.appendChild(backupEl);
    }
  }

  if (teamB) {
    const { league, backup } = teamB;

    const sideBEl = document.createElement('div');
    sideBEl.className = 'poke_side sideB';
    cardBodyEl.appendChild(sideBEl);

    if (league?.length) {
      const leagueEl = document.createElement('div');
      leagueEl.className = 'poke_team league';
      league.forEach((pkm) => leagueEl.appendChild(generatePokemonSlot(pkm)));

      sideBEl.appendChild(leagueEl);
    }

    if (backup?.length) {
      const backupEl = document.createElement('div');
      backupEl.className = 'poke_team backup';
      backup.forEach((pkm) => backupEl.appendChild(generatePokemonSlot(pkm)));

      sideBEl.appendChild(backupEl);
    }
  }

  if (team?.league?.length && teamB?.league?.length) {
    const sideALabel = `Show ${team.label} team`;
    const sideBLabel = `Show ${teamB.label} team`;

    const teamBtn = document.createElement('button');
    teamBtn.textContent = sideBLabel;
    teamBtn.className = 'toggle side';
    teamBtn.addEventListener('click', () => {
      cardBodyEl.classList.toggle('sideA');
      const showingSideB = cardBodyEl.classList.toggle('sideB');
      teamBtn.textContent = showingSideB ? sideALabel : sideBLabel;
    });

    cardTitleEl.appendChild(teamBtn);
  }

  if (team?.backup?.length || teamB?.backup?.length) {
    const leagueLabel = 'Show league team';
    const backupLabel = 'Show backup team';

    const backupBtn = document.createElement('button');
    backupBtn.textContent = backupLabel;
    backupBtn.className = 'toggle team';
    backupBtn.addEventListener('click', () => {
      cardBodyEl.classList.toggle('main');
      const showingBackup = cardBodyEl.classList.toggle('backup');
      backupBtn.textContent = showingBackup ? leagueLabel : backupLabel;
    });

    cardTitleEl.appendChild(backupBtn);
  }

  return wrapperEl;
};

const generatePokemonSlot = (pkm) => {
  const knownGender = pkm.gender
    ? `<span class="gender ${pkm.gender}">${
        pkm.gender === 'male' ? '♂' : '♀'
      }</span>`
    : '';

  const slotEl = document.createElement('div');
  slotEl.className = 'poke_slot';

  const pkmSprite = `${pkm.species.toLowerCase()}${pkm.shiny ? '_s' : ''}.webp`;
  const linkEl = document.createElement('a');
  linkEl.className = 'poke_link';
  linkEl.target = '_blank';
  linkEl.href = `http://bulbapedia.bulbagarden.net/wiki/${pkm.species}_(Pokémon)`;
  linkEl.style.backgroundImage = `url('res/pokemon/${pkmSprite}')`;

  const nameEl = document.createElement('span');
  nameEl.className = 'poke_name';
  nameEl.innerHTML = `${knownGender} <span>${pkm.species}</span>`;

  slotEl.appendChild(linkEl);
  slotEl.appendChild(nameEl);

  return slotEl;
};

fetch('data/teams.json')
  .then((response) => response.json())
  .then((data) => {
    const containerEl = document.querySelector('main');
    data.forEach((region) => containerEl.appendChild(generateTeamCard(region)));
  })
  .catch((error) => console.error('Error fetching teams:', error));
