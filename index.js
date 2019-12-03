// const server = require('./api/server');
const mongoose = require('mongoose');
const createServer = require('./createServer')
const db = require('./db');
require('dotenv').config({ path: '.env' });

// const PORT = process.env.PORT || 4000;
const FRONT_PORT = process.env.FRONT_PORT || 3000;
const server = createServer();

// connect to mongoDb cloud
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDb connection establish')
})

server.start({
    cors: {
        credentials: true, 
        origin: `http://localhost:${FRONT_PORT}/`
    },
}, deets => {
    console.log(`Server is running on ${deets.port}`)
})


// server.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}...`);
// });

