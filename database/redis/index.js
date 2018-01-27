const redis = require('redis');
const inventory = require('./../../data/inventory2');
const users = require('./../../data/users2');

const client = redis.createClient();

client.on('error', err => {
  console.log('Something went wrong ', err);
});

const updateUsers = () => {
  console.log('updating users...');
  for (const key in users) {
    for (const k in users[key]) {
      client.set(k, JSON.stringify(users[key][k]));
    }
  }
};

const updateInventory = () => {
  console.log('updating inventory...');
  for (const key in inventory) {
    for (const k in inventory[key]) {
      client.set(k, JSON.stringify(inventory[key][k]));
    }
  }
};

module.exports = {
  client,
  updateUsers,
  updateInventory,
};
