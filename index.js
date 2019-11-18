const server = require('./server.js');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

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


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

