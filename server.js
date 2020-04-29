const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config()


app.use(bodyParser.json());
app.use(cors());

// import controller
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// connecting to database
const db = knex({
    client: process.env.DB_CLIENT,
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
});

app.get('/', (req, res) => {res.send('it is working')})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db)});
app.put("/image", (req, res) => { image.handleImage(req, res, db)});
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res)});



app.listen(process.env.PORT || 3000, () => {
    console.log(`Connected to Server on port ${PORT}`);
})
