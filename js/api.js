const BASE_URL = "https://api.football-data.org";
const VERSION = "/v2";
const API_KEY = "6ae47fbbbba04f23ad06da3b9e5a9f7c";
let URL = `${BASE_URL}${VERSION}`;

function statusResponse(response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.error("Error :", error);
}

function getStandings(LeagueId) {
  if ("caches" in window) {
    caches.match(`${URL}/competitions/${LeagueId}/standings`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            createStandingView(data);
          });
        }
      });
  }

  fetch(`${URL}/competitions/${LeagueId}/standings`, {
    method: "GET",
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then(statusResponse)
    .then(json)
    .then((data) => {
      createStandingView(data);
    })
    .catch(error);
}

function getMatchesCompetitions(LeagueId, matchDay = 1) {
  if ("caches" in window) {
    caches
      .match(`${URL}/competitions/${LeagueId}/matches?matchday=${matchDay}`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            createMatchesView(data);
          });
        }
      });
  }

  fetch(`${URL}/competitions/${LeagueId}/matches?matchday=${matchDay}`, {
    method: "GET",
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then(statusResponse)
    .then(json)
    .then((data) => {
      createMatchesView(data);
    })
    .catch(error);
}

function getDetailTeam() {
  return new Promise((resolve, reject) => {
    var urlParams = new URLSearchParams(window.location.search).get("id");

    if ("caches" in window) {
      caches.match(`${URL}/teams/${urlParams}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            teamProfile(data);
            resolve(data);
          });
        }
      });
    }

    fetch(`${URL}/teams/${urlParams}`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    })
      .then(statusResponse)
      .then(json)
      .then((data) => {
        teamProfile(data);
        resolve(data);
      })
      .catch(error);
  });
}

function getFavoriteTeam() {
  dbGetAllFavoriteTeam().then(function(teams) {
    createFavTeamView(teams);
  });
}

function getTeams(leagueID) {
  if('caches' in window){
      caches.match(`${URL}/competitions/${leagueID}/teams`)
      .then(res => {
          if(res){
              res.json()
              .then(data => {
                  createTeamView(data)
              })
          }
      })

  }
  fetch(`${URL}/competitions/${leagueID}/teams`,{
      headers : {
          'X-Auth-Token' : API_KEY
      }
  })
  .then(status)
  .then(res => res.json())
  .then(data => {
    createTeamView(data)
  })
  .catch(err => console.log(err))
}