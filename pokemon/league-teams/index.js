const generateTeamCard = ({ backupTeam, label, region, team }) => {
  const regionCode = region.toLowerCase();

  const wrapperEl = document.createElement('div');
  wrapperEl.id = regionCode;
  wrapperEl.className = 'poke_region';

  const cardTitleEl = document.createElement('div');
  cardTitleEl.className = `poke_pane ${regionCode} title limited_width`;
  cardTitleEl.textContent = label || `${region} Region`;
  wrapperEl.appendChild(cardTitleEl);

  const cardBodyEl = document.createElement('div');
  cardBodyEl.className = `poke_pane ${regionCode} body`;
  wrapperEl.appendChild(cardBodyEl);

  const teamEl = document.createElement('div');
  teamEl.className = 'poke_team league';
  cardBodyEl.appendChild(teamEl);

  team.forEach((pkm) => teamEl.appendChild(generatePokemonSlot(pkm)));

  if (backupTeam?.length) {
    const backupTeamEl = document.createElement('div');
    backupTeamEl.className = 'poke_team backup';
    cardBodyEl.appendChild(backupTeamEl);

    backupTeam.forEach((pkm) =>
      backupTeamEl.appendChild(generatePokemonSlot(pkm))
    );

    const backupBtn = document.createElement('button');
    backupBtn.textContent = 'Show backup team';
    backupBtn.className = 'team_toggle';
    backupBtn.addEventListener('click', () => {
      const showingBackup = cardBodyEl.classList.toggle('backup');
      backupBtn.textContent = showingBackup
        ? 'Show league team'
        : 'Show backup team';
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

  const linkEl = document.createElement('a');
  linkEl.className = 'poke_link';
  linkEl.target = '_blank';
  linkEl.href = `http://bulbapedia.bulbagarden.net/wiki/${pkm.species}_(Pokémon)`;
  linkEl.style.backgroundImage = `url('res/pokemon/${pkm.species.toLowerCase()}.webp')`;

  const nameEl = document.createElement('span');
  nameEl.className = 'poke_name';
  nameEl.innerHTML = `${knownGender} <span>${pkm.species}</span>`;

  slotEl.appendChild(linkEl);
  slotEl.appendChild(nameEl);

  return slotEl;
};

document.addEventListener('DOMContentLoaded', () => {
  const containerEl = document.querySelector('main');
  teams.forEach((team) => containerEl.appendChild(generateTeamCard(team)));
});
