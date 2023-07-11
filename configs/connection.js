require('dotenv').config();
const mongoose = require('mongoose');


module.exports = {
    connection: mongoose.connect(process.env.mongoURL)
}