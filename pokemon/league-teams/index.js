const generateTeamCard = ({ label, region, team }) => {
  const regionCode = region.toLowerCase();

  const teamEl = document.createElement('div');
  teamEl.className = `poke_pane ${regionCode} poke_team`;

  const cardContainerEl = document.createElement('div');
  cardContainerEl.id = regionCode;
  cardContainerEl.className = 'poke_region';

  const cardTitleEl = document.createElement('div');
  cardTitleEl.className = `poke_pane ${regionCode} title limited_width`;
  cardTitleEl.textContent = label || `${region} Region`;
  cardContainerEl.appendChild(cardTitleEl);
  cardContainerEl.appendChild(teamEl);

  team.forEach((pkm) => {
    const knownGender =
      pkm.gender !== undefined
        ? `<img src="res/gender_${pkm.gender}.webp"> `
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
    nameEl.innerHTML = `${knownGender}${pkm.species}`;

    slotEl.appendChild(linkEl);
    slotEl.appendChild(nameEl);
    teamEl.appendChild(slotEl);
  });

  return cardContainerEl;
};

document.addEventListener('DOMContentLoaded', () => {
  const containerEl = document.getElementById('main_content');
  teams.forEach((team) => containerEl.appendChild(generateTeamCard(team)));
});
