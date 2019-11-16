const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());
// server.use("/api/questions", ActionRoute);
// server.use("/api/answers", ProjectRoute);

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


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})