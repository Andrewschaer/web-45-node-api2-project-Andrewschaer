// implement your server here
const express = require('express');

// require your posts router and connect it here

const server = express();

server.use(express.json());


// ENDPOINTS HERE


module.exports = server;

