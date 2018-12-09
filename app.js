const express = require('express');
require('./config/config');
const models = require('./models');
require('./global_functions');
const sessions = require('./controllers/SessionsController');
const ratings = require('./controllers/RatingsController');
const userController = require('./controllers/UsersController');
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('./models').Users;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = CONFIG.jwt_encryption;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
  let err, user;
  [err, user] = await to(Users.findById(jwt_payload.user_id));

  if (err) return done(err, false);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));
// CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization, Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.get('/', (req, res) => { res.send('Hello World!') })

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

if (CONFIG.app === 'dev') {
  models.sequelize.sync();
}


app.get('/sessions', passport.authenticate('jwt', { session: false }), sessions.getAll);
app.get('/sessions/:sessionId', passport.authenticate('jwt', { session: false }), sessions.get);
app.post('/sessions', passport.authenticate('jwt', { session: false }), sessions.create);
app.put('/sessions', passport.authenticate('jwt', { session: false }), sessions.update);

app.get('/users', passport.authenticate('jwt', { session: false }), userController.getAll);
app.get('/users/:userId', passport.authenticate('jwt', { session: false }), userController.get);
app.post('/users', passport.authenticate('jwt', { session: false }), userController.create);
app.put('/users', passport.authenticate('jwt', { session: false }), userController.update);

// app.post('/users', userController.create);
app.post('/login', userController.login);

app.post('/ratings/:sessionId', passport.authenticate('jwt', { session: false }), ratings.create);
app.put('/ratings/:ratingId', passport.authenticate('jwt', { session: false }), ratings.update);
module.exports = app;