require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./configs/connection');


const PORT = process.env.port || 8080


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({
        'msg': 'Welcome to the Backend of E-Commerce Website.'
    })
})



app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Server is connected to the Database.');
    } catch {
        console.log('Server could not get connected to the Database.');
    }
    console.log(`Server is running at http://localhost:${PORT}`);
})