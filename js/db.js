var dbPromised = idb.open("premiere_league_db", 1, (upgradedDb) => {
  if (!upgradedDb.objectStoreNames.contains("teams")) {
    upgradedDb.createObjectStore("teams");
  }
});

function dbSaveTeam(id, logo, name, venue, website){
  let confirm = window.confirm(`Apakah yakin ingin menambahkan ${name} ke Favorit ?`)
  let item = {
    id: id,
    logo: logo,
    name: name,
    venue: venue,
    website: website,
    created: new Date().getTime()
  };

  if(confirm){
    dbPromised.then(db => {
      let transaction = db.transaction('teams', 'readwrite');
      transaction.objectStore('teams').put(item, id);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        alert(`Team favorite ${name} berhasil di tambahkan.`)
        pushNotification('Add Favorite Team', `Team favorite ${name} berhasil di tambahkan.`)
      }
    }).catch(() => console.log("Gagal Menyimpan Team."))
  }
};

function dbGetAllFavoriteTeam(){
  return dbPromised.then(db => {
    let transaction = db.transaction("teams", `readonly`);
    return transaction.objectStore("teams").getAll();
  }).then(data => data)
  .catch(() => console.log("Data Empty"))
};

function dbDeleteFavoriteTeam(id, name){
  let confirm = window.confirm(`Apakah yakin ingin menghapus ${name} dari Favorit ?`)

  if(confirm){
    dbPromised.then(db => {
      let transaction = db.transaction('teams', 'readwrite');
      transaction.objectStore('teams').delete(id);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        alert(`Team favorite ${name} berhasil di hapus.`)
        pushNotification('Delete Favorite Team', `Team favorite ${name} berhasil di hapus.`)
      }
    }).catch(() => console.log("Gagal Menyimpan Team."))
  }
};

function pushNotification(title, message){
  const options = {
      body: message
  };
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(regis => {
          regis.showNotification(title, options);
      });
  } else {
      console.error('Fitur notifikasi tidak diijinkan.');
  }
}