// import express
import express from "express";
// import cors
import cors from "cors";
 
import bodyParser from 'body-parser';
import fileUpload from "express-fileupload";
import session  from "express-session"
// import routes
import Router from "../routes/routes.js";


// init express
const app = express();
app.use(fileUpload())
// use express json
app.use(express.json());
  
// use cors
app.use(cors());
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
// use router
app.use(Router);
  
app.listen(5000, () => console.log('Server running at http://localhost:5000'));

