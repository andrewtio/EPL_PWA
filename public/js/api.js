var base_url = "https://api.football-data.org/v2/competitions/2021/";
var team_url = "https://api.football-data.org/v2/";
// https://api.football-data.org/v2/competitions/2012/teams
const api_token = '66d867377c4d4086aba37addb4a51041'

let fetchApi = url => {
  return fetch(url, {
    headers: {
    'X-Auth-Token': api_token
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
  if("caches" in window) {
    caches.match(base_url + "teams").then(function(response){
      if(response) {
        response.json().then(function(data){
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var teamsHTML = "";
      data.teams.forEach(function(teams) {
        teamsHTML += `
              <div class="card">
                <a href="./article.html?id=${teams.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${teams.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${teams.name}</span>
                  <p>${teams.venue}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    });
  }
  });
}

fetchApi(base_url + "teams")
.then(status)
.then(json)
.then(function(data) {
  var teamsHTML = "";
      data.teams.forEach(function(teams) {
        teamsHTML += `
              <div class="card">
                <a href="./article.html?id=${teams.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${teams.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${teams.name}</span>
                  <p>${teams.venue}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
  }

function getScorers() {
  if("caches" in window) {
    caches.match(base_url + "scorers").then(function(response){
      if(response) {
        response.json().then(function(data){
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var scorersHTML = "";
      data.scorers.forEach(function(player) {
        scorersHTML += `
              <div class="card">
                <a href="./article.html?id=${player.team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <p>${player.player.name}</p>
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${player.numberOfGoals}</span>
                  <p>${player.team.name}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("scorers").innerHTML = scorersHTML;
    });
  }
  });
}

fetchApi(base_url + "scorers")
.then(status)
.then(json)
.then(function(data) {
  var scorersHTML = "";
      data.scorers.forEach(function(player) {
        scorersHTML += `
              <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <p>${player.player.name}</p>
                    <a href="./article.html?id=${player.team.id}">
                      <p>${player.team.name}</p>
                    </a>
                  </div>
                <div class="card-content">
                  Goals:
                  <span class="card-title truncate">${player.numberOfGoals}</span>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("scorers").innerHTML = scorersHTML;
    })
    .catch(error);
  }

function getStandings() {
  if("caches" in window) {
    caches.match(base_url + "standings").then(function(response){
      if(response) {
        response.json().then(function(data){
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var standingsHTML = "";
      data.standings[0].table.forEach(function(standings) {
        standingsHTML += `
              <div class="card">
                <a href="./article.html?id=${standings.team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${standings.team.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${standings.team.name}</span>
                  <p>Position: ${standings.position}</p>
                  <p>Played Games: ${standings.playedGames}</p>
                  <p>Won: ${standings.won}</p>
                  <p>Draw: ${standings.draw}</p>
                  <p>Lost: ${standings.lost}</p>
                  <p>Points: ${standings.points}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = standingsHTML;
    });
  }
  });
}

fetchApi(base_url + "standings")
.then(status)
.then(json)
.then(function(data) {
  var standingsHTML = "";
      data.standings[0].table.forEach(function(standings) {
        standingsHTML += `
              <div class="card">
                <a href="./article.html?id=${standings.team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${standings.team.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${standings.team.name}</span>
                  <p>Position: ${standings.position}</p>
                  <p>Played Games: ${standings.playedGames}</p>
                  <p>Won: ${standings.won}</p>
                  <p>Draw: ${standings.draw}</p>
                  <p>Lost: ${standings.lost}</p>
                  <p>Points: ${standings.points}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
  }

// Blok kode untuk melakukan request data json
// function getArticles() {
//     fetch(base_url + "articles")
//       .then(status)
//       .then(json)
//       .then(function(data) {
//         // Objek/array JavaScript dari response.json() masuk lewat data.
//         // Menyusun komponen card artikel secara dinamis
//         var articlesHTML = "";
//         data.result.forEach(function(article) {
//           articlesHTML += `
//                 <div class="card">
//                   <a href="./article.html?id=${article.id}">
//                     <div class="card-image waves-effect waves-block waves-light">
//                       <img src="${article.thumbnail}" />
//                     </div>
//                   </a>
//                   <div class="card-content">
//                     <span class="card-title truncate">${article.title}</span>
//                     <p>${article.description}</p>
//                   </div>
//                 </div>
//               `;
//         });
//         // Sisipkan komponen card ke dalam elemen dengan id #content
//         document.getElementById("articles").innerHTML = articlesHTML;
//       })
//       .catch(error);
//   }

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function(team) {

      teamsHTML += `
                  <div class="card">
                    <a href="./article.html?id=${team.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                  <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.venue}</p>
                    </div>
                </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}



function getSavedTeamsById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(teams) {
    teamHTML = '';
    var teamHTML = `
    <div class="card">
    <a href="./article.html?id=${teams.id}&saved=true">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${teams.crestUrl}" />
      </div>
    </a>
  <div class="card-content">
      <span class="card-title truncate">${teams.name}</span>
      <p>${teams.venue}</p>
    </div>
  </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

function getTeamsByIdDicoding() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(team_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(teams) {
            var teamHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" />
              </div>
              <div class="card-content">
                <span class="card-title">${teams.name}</span>
                <p> ${teams.name} </p>
                <p> ${teams.shortName} </p>
                <p> ${teams.address} </p>
                <p> ${teams.phone} </p>
                <p> ${teams.founded} </p>
                <p> ${teams.venue} </p>
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(teams);
          });
        }
      });
    }

    fetchApi(team_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function(teams) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(teams);
        // Menyusun komponen card artikel secara dinamis
        var teamHTML = `
        <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" />
        </div>
        <div class="card-content">
          <span class="card-title">${teams.name}</span>
          <p> ${teams.name} </p>
          <p> ${teams.shortName} </p>
          <p> ${teams.address} </p>
          <p> ${teams.phone} </p>
          <p> ${teams.founded} </p>
          <p> ${teams.venue} </p>
        </div>
      </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(teams);
      });
  });
}