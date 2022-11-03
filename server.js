// Require dependencies
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection');

app = express();

// define port for server to open on
const PORT = process.env.PORT || 3001;

// Middleware for Express:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set port to listen and console log for a clickable link
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });