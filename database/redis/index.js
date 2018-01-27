const redis = require('redis');
const inventory = require('./../../inventory2');
const users = require('./../../users2');

const client = redis.createClient();

client.on('error', err => {
  console.log('Something went wrong ', err);
});

for (var key in users) {
  for (var k in users[key]) {
    client.set(k, JSON.stringify(users[key][k]));
  }
}
for (var key in inventory) {
  for (var k in inventory[key]) {
    client.set(k, JSON.stringify(inventory[key][k]));
  }
}


module.exports = client;
