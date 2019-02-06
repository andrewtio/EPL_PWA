var dbPromised = idb.open("epl9", 9, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("team_name", "team_name", {
    unique: false
  });
});

function saveForLater(teams) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      var saveData ={
        id: teams.id,
        name: teams.name,
        shortName: teams.shortName,
        address: teams.address,
        phone: teams.phone,
        founded: teams.founded,
        venue: teams.venue,
        website: teams.website,
        email: teams.email,
        crestUrl: teams.crestUrl,
      };
      console.log(teams);
      tx.objectStore("teams").put(saveData);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil di simpan.");
    });
}

function deleteFavTeam(data){
  dbPromised
    .then(function(db) {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');

      store.delete(data);
      return tx.complete;
  })
  .then(function() {
    console.log("Team berhasil di hapus");
  })
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function getById(id) {
  let intId = parseInt(id);
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(intId);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}


