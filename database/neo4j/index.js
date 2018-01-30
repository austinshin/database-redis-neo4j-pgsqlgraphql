// const neo4j = require('neo4j');
const neo4j = require('neo4j-driver').v1;

const inventory = require('./../../data/inventory');
const users = require('./../../data/users');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', '123'),
);
const session = driver.session();

// const db = new neo4j.GraphDatabase('http://neo4j:123@localhost:7474');

const names = [];
let count = 0;
for (const key in inventory) {
  for (const k in inventory[key]) {
  }
  count += 1;
}
// console.log('inventory count: ', count);

let count2j = 0;
for (const key in users) {
  for (const k in users[key]) {
  }
  count2j += 1;
}
// console.log('user count: ', count2j);

// make a user node with some sort of random actions that I use to store into my database
// afterwards I create
// load all the users.
// load all the items.
// FOR EACH USER
//   FOR EACH EVENT
//     CREATE RELATIONSHIP WITH ITEMS
// RELATIONSHIPS CREATED.
//

const loadUsers = () => {
  for (const key in users) {
    for (const k in users[key]) {
      session.run(
        `CREATE (user:USER {id: {id}, name:{name}, username:{username}})`,
        {
          id: users[key][k].id,
          name: users[key][k].name,
          username: users[key][k].username,
        },
      );
    }
  }
};

const loadItems = () => {
  for (const key in inventory) {
    for (const k in inventory[key]) {
      session.run(`CREATE (item:ITEM {id: {id}, name:{name}})`, {
        id: inventory[key][k].id,
        name: inventory[key][k].name,
      });
    }
  }
};

const generateFakeRelationships = (
  numOfRelationships,
  numOfUsers,
  numOfProducts,
) => {
  const events = ['view', 'click', 'purchased', 'reviewed'];
  const completeRelationshipList = [];
  for (let i = 0; i < numOfRelationships; i++) {
    const relationship = {
      userId: Math.floor(Math.random() * numOfUsers + 1),
      productId: Math.floor(Math.random() * numOfProducts + 1),
      event: events[Math.floor(Math.random() * events.length)],
    };
    completeRelationshipList.push(relationship);
  }
  return completeRelationshipList;
};

console.log(generateFakeRelationships(5000, 1000, 5000));

const createRelationships = () => {
  const relationshipList = generateFakeRelationships(10000, 1000, 5000);
  for (let i = 0; i < relationshipList.length; i++) {
    session.run(
      `MATCH(a: USER {id: {userId}}), (b:ITEM {id:{productId}}) CREATE (a)-[r:${
        relationshipList[i].event
      }]->(b) RETURN r`,
      {
        userId: relationshipList[i].userId,
        productId: relationshipList[i].productId,
        event: relationshipList[i].event,
      },
    );
  }
};

module.exports = {
  loadItems,
  loadUsers,
  createRelationships,
};
