    const express = require("express");
    const dotenv = require("dotenv");
    const { default: mongoose } = require("mongoose");
    const cookieParser = require("cookie-parser");
    const path = require('path');   
    const userRoutes = require("./routes/userroute")
    const cors = require("cors")
    const tokenVerificationRoute = require("./routes/tokenverification")

    const app = express();
    dotenv.config()

    mongoose.connect(process.env.DatabaseURI).then(()=>{
        console.log("Database connected successfully");
    }).catch(()=>{
        console.log("Unable to connect to Database");
    })

    const corsOptions = {
        origin:process.env.FRONTEND_URL,
        credentials: true // Include credentials
    };
    app.use(cors(corsOptions)); // Apply CORS middleware with options
    // app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', req.headers.origin); // Allow all origins
    //     res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE'); // Allowed methods
    //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allowed headers
    //     next();
    // });
    app.use(express.json())
    app.use(cookieParser())
    app.use(express.urlencoded({extended:true}))


    app.use("/user",tokenVerificationRoute)
    app.use("/user",userRoutes)


    app.use(express.static(path.join(__dirname, '../netflix/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../netflix/dist', 'index.html'));
    });

    app.listen(10000,()=>{
        console.log("server is up at port no 10000");
    })