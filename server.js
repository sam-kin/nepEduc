const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const helmet = require('helmet');


require('./configuration/passport')(passport);

// Bringing in the routes
const userRoutes = require('./api/routes/userRoutes');
const promotionRoutes = require("./api/routes/promotionRoutes");
const univRoutes = require('./api/routes/univRoutes');
const facRoutes = require('./api/routes/facRoutes');
const departRoutes = require('./api/routes/departRoutes');
const optionRoutes = require('./api/routes/optionRoutes');
const studentListRoutes = require('./api/routes/studentListRoutes');
const userDemandRoutes = require('./api/routes/userRequestRoutes');

// Connect to mongoDb using mongoose
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("db connected.")
);

// Setting the mongo store for sessions
const store = new MongoStore({
    mongooseConnection: mongoose.connection,
    secret: process.env.SESSION_KEY,
    touchAfter: 24 * 3600
});

// ADDING MIDDLEWARES TO app

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cors());

// setting the session

const options = {
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    name: 'nck',
    store: store,
    cookie: {
        secret: process.env.SESSION_KEY,
        maxAge: (Date.now() / 1000) + 60 * 60 * 24 * 1000,
        httpOnly: true,
    }
};

if (app.get('env') === 'production') {
    options.cookie.secure = true;
}

app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());


// ADDING THE ROUTES

app.use('/api/users', userRoutes);
app.use('/api/prom', promotionRoutes);
app.use('/api/univ', univRoutes);
app.use('/api/fac', facRoutes);
app.use('/api/depart', departRoutes);
app.use('/api/option', optionRoutes);
app.use('/api/list', studentListRoutes);
app.use('/api/demand', userDemandRoutes);

// ERROR HANDLING

app.use((req, res, next) => {
    const error = new Error("Not Found.");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error);
    if (error instanceof Array) {
        return res.json(error);
    }

    return res.json({
        message: error.message
    });
});


const port = 5000;

app.listen(port, () => console.log(`Server listening to port ${port}`));