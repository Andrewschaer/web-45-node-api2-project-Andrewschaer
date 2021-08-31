// require your server and launch it here
const server = require('./api/server');

server.listen(6000, () => {
    console.log('\n*** Server Running on http://localhost:6000 ***\n')
});