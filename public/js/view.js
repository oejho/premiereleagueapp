function createMatchesView(data) {
  let matches = "";
  data.matches.map((team) => {
    matches += `
    
    <div class="col s12 m6">
      <div class="card">
        <div class="card-content">
          <table>
            <tbody>
                <tr>
                  <td><p>${team.status}</p></td>
                  <td></td>
                  <td><p>${team.utcDate}</p></td>
                </tr>
                <tr>
                  <td><p><strong>${ team.awayTeam.name }</strong></p></td>
                  <td>:</td>
                  <td><p><strong>${( team.score.fullTime.awayTeam == null ) ? 0 : team.score.fullTime.awayTeam }</strong></p></td>
                </tr>
                <tr>
                  <td> <p><strong>${team.homeTeam.name}</strong></p></td>
                  <td>:</td>
                  <td><p><strong>${(team.score.fullTime.homeTeam == null ) ? 0 : team.score.fullTime.homeTeam }</strong></p></td>
                </tr>
            </tbody>   
          </table>
        </div>  
      </div>
    </div>
    `;
  });
  document.getElementById("matches").innerHTML = matches;
}


function createStandingView(data) {
  data = JSON.parse(JSON.stringify(data).replace(/http:/g, "https:"));
  let standings = "";
  data.standings[0].table.map((team, index) => {
    no = index+1
    standings += `
      <tr>
        <td>${no}</td>
        <td>${team.team.name}</td>
        <td>${team.playedGames}</td>
        <td>${team.won}</td>
        <td>${team.draw}</td>
        <td>${team.lost}</td>
        <td>${team.points}</td>
      </tr>
    `;
  });
  let standingsEl = document.getElementById("standings");
  if (standingsEl) standingsEl.innerHTML = standings;
}

function createTeamView(data){
  let teamsHTML = ''
  data = data.teams
  data.forEach(team => {
      let urlTeamImage = team.crestUrl
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
      teamsHTML  += `
      <div class="col s12 m6">
        <div class="card">
          <button onclick="dbSaveTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="website-action white-text btn blue lighten-1">Save</button>
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${urlTeamImage}" height="150px" alt="${team.name}"/>
          </div>
          <div class="card-content">
            <span class="card-title truncate">${team.name}</span>
            <ul>
              <li class="collection-item">${team.venue}</li>
              <li class="collection-item"><a href="${team.website}" target="_blank">${team.website}</a></li>
            </ul>
          </div>
        </div>
      </div>`
  })
  document.getElementById('teams').innerHTML = teamsHTML  
}

function createFavTeamView(teams){
  let favoriteTeam = "";
    teams.map(team => {
      favoriteTeam += `
          <div class="col s12 m6">
            <div class="card">
              <button onclick="dbDeleteFavoriteTeam(${team.id},'${team.name}')" class="waves-effect waves-light btn red accent-3">Delete</button>
              <div class="card-image waves-effect waves-block waves-light">
                <img
                  src="${team.logo}"
                  style="max-height: 150px; margin: 20px auto"
                />
              </div>
              <div class="card-content">
                <span class="card-title truncate">${team.name}</span>
                <ul>
                  <li class="collection-item">${team.venue}</li>
                  <li class="collection-item">${team.website}</li>
                </ul>
              </div>
            </div>
          </div>
          `;
    });
    if (favoriteTeam.length < 1) favoriteTeam = '<h6 style="padding-left: 15px">No Record</h6>'
    document.getElementById("favoriteteams").innerHTML = favoriteTeam;
}