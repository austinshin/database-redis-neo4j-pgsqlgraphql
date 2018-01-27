const express = require('express');
const session = require('express-session');
const client = require('../database/redis');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);

const router = express.Router();

router.use(cookieParser());
router.use(
  session({
    store: new RedisStore({ host: 'localhost', port: 6379, client, ttl: 260 }),
    secret: 'backazon',
    resave: false,
    saveUninitialized: false,
  }),
);
// what does this session do?
router.use(passport.initialize());
router.use(passport.session());

const helloWorld = () => {
  console.log('hello, world!');
};

router.get('/ping', function (req, res) {
  console.log('pong');
  return res.status(200);
});

router.get('/pong', (req, res) => {
  console.log('here1');
  try {
    // if (!req.session.passport) {
    //   console.log('here');
    //   return res.sendStatus(401);
    // }
    // query to redis by req.session.userId
    helloWorld();
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

module.exports = router;
