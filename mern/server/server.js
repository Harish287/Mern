const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');


// create a database connection -> u can also
// create a sperate file for this and then import/use that file here

mongoose
    .connect(
        "mongodb+srv://kairaaharish:kairaaharish2024@cluster0.a1eik.mongodb.net/"
    )
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

const app = express();
const PORT = process.env.port || 5000;

app.use(
    cors({
        orgin: "http://localhost:5173/",
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            'Authorization',
            "Cache-control",
            'Expires',
            'pragma'

        ],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => console.log(`server is running on the ${PORT}`))