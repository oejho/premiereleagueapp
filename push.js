var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BNfdUtFXiCOZUdmmualz2XQ8SxSEYbkhs1ky20ccExIzrJn8XHuaE4nW8JK4GzlpTcSy6sc-MO10lATjJlaimUI",
  privateKey: "CqRty9G6faeUvn8h0aPuejK_eek-pkSclczOQFSx6ME",
};

webPush.setVapidDetails(
  "mailto:uj.ikhwan @gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dCxxR8CSW3E:APA91bGXqzXQnxkRbBhaerPqKAId3492YMaG-HIKc--Y6mERe79H1gX24BLVqKTLqGEkgDkMR4JwVoub1DRXlIvUNBQGD7DylJ757Pc8LG1dJBkiCu4FCpetwGU1kCZg-Nm3hk2fGydU",
  keys: {
    p256dh:
    "BPIkolITttTKMCCi6srx0q2har2LyvQTcD/it9FpYHw/8Be35S60O5Zk2pYt14NxI9jEBnU8KHtQv0EEntADVGE=",
    auth: "Vf298NpxcBOdYc1wx9sEuw==",
  },
};
var payload = "hello...";
var options = {
  gcmAPIKey: "873315519637",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
