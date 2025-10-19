const parseTeam = (teamData) => {
  const { region, team } = teamData;
  const regionCode = region.toLowerCase();

  const teamEl = document.createElement('div');
  teamEl.className = `poke_pane ${regionCode} poke_team`;

  const containerEl = document.createElement('div');
  containerEl.id = regionCode;
  containerEl.className = 'poke_region';

  const titleEl = document.createElement('div');
  titleEl.className = `poke_pane ${regionCode} title limited_width`;
  titleEl.textContent = `${region} Region`;
  containerEl.appendChild(titleEl);
  containerEl.appendChild(teamEl);

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

  return containerEl;
};

document.addEventListener('DOMContentLoaded', () => {
  const containerEl = document.getElementById('main_content');
  containerEl.appendChild(parseTeam(teams.kanto));
  containerEl.appendChild(parseTeam(teams.johto));
  containerEl.appendChild(parseTeam(teams.hoenn));
  containerEl.appendChild(parseTeam(teams.sinnoh));
  containerEl.appendChild(parseTeam(teams.unova));
});
