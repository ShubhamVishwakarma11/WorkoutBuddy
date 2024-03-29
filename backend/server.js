const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");


// express app
const app = express();
dotenv.config();


//express middleware
app.use(cors());
app.use(express.json());
app.use( (req,res,next) => {
    console.log(req.path, req.method)
    next()
})
    

// express routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT

// connect to db
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        // listening for requests
        app.listen(port, () => {
            console.log(`Server started on port ${port} !!!`);
        })
    })
    .catch( (error) => {
        console.log(error);
    })
