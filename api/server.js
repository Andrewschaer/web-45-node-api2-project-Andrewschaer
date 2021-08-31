// implement your server here
const express = require('express');
const postsRouter = require('./posts/posts-router')

// require your posts router and connect it here

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);


// ENDPOINTS HERE


module.exports = server;

