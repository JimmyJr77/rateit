require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers.js');
const bcrypt = require('bcrypt');

const sequelize = require('./config/connection');

// New sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Configured and linked session object with the sequelize store
const sess = {
  secret: bcrypt.hashSync(process.env.SESSION_SECRET, 10),
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//express-session and stored as Express.js middleware
app.use(session(sess));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
// Runs handlebars
// app.engine('handlebars', expbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');
// // Handlebar routing
// app.get('/', (req, res) => {
//     res.render('index');
// });
// app.get('/modal', (req, res) => {
//   res.render('modal');
// });
// app.get('/ratings', (req, res) => {
//   res.render('ratings');
// });

