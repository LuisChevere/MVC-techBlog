const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helper = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers});
const session = require('express-session');
const exp = require('constants');
const SequilizeStore = require('connect-session-sequelize')(session.Store);

const sees = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialize: true,
    store: new SequilizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 *10, //will check every 10 mins
        expiration: 1000 * 60 * 30 //will expire after 30 mins
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});