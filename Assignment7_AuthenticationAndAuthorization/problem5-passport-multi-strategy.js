const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.use(session({
  secret: 'passport-secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const SECRET = 'jwt-secret';

const users = [
  { id: 1, username: 'john', password: 'pass123' }
];

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user || false);
});

passport.use('local', new LocalStrategy(
  (username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return done(null, false);
    return done(null, user);
  }
));

passport.use('jwt', new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
  },
  (payload, done) => {
    const user = users.find(u => u.id === payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  }
));

app.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).json({ message: "Error" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      res.json({ message: "Logged in with session", user });
    });
  })(req, res, next);
});

app.post('/auth/api-login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) return res.status(500).json({ message: "Error" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

    res.json({ message: "Logged in with JWT", token });
  })(req, res, next);
});

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ message: "Session dashboard", user: req.user });
});

app.get('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: "JWT profile", user: req.user });
});

app.listen(3000);