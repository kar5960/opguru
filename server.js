const express = require("express");
const cors = require("cors");
const path = require("path");
const userlogin = require("./routes/userlogin.js");
const userregister = require("./routes/userregister.js");
const updatepasswordphno = require("./routes/updatepasswordphno.js");
const updatepasswordemail = require("./routes/updatepasswordemail.js");
const sendpasswordlink = require("./routes/sendpasswordlink.js");
const verifyresetpassworduser = require("./routes/verifyresetpassworduser.js");
const users = require("./routes/users.js");
const subjects = require("./routes/subjects.js");
const below8th = require("./routes/class11th_12th.js");
const ninetenth = require("./routes/9_9th.js");
const eleven12th = require("./routes/class11th_12th.js");
const saveExamDetails = require("./routes/exams.js") ;
const olympiads = require("./routes/olympiads.js");
const interestedfields = require("./routes/interestedfields.js");
const bachelors = require("./routes/bachelors.js");
const userinfo = require("./routes/userinfo.js");
const refreshTokenRoute = require("./routes/refreshTokenRoute.js");
const logoutRoute = require("./routes/logoutRoute.js");
const getUser = require("./routes/getUserInfo.js");
const saveRole = require("./routes/UserSaveRoutes/userType.js");
const saveLoginRoute = require("./routes/UserSaveRoutes/loginroute.js");
const savePersonalDetails = require("./routes/UserSaveRoutes/personalDetails.js");
const corsOptions = require('./config/corsOptions');
const allowedOrigins = require('./config/allowedOrigins.js');
const exams = require("./routes/ProficiencyExams.js") ;

const app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
const credentials = require('./middleware/credentials');

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

const cookieParser = require('cookie-parser');

const verifyJWT = require('./middleware/verifyJWT');

var bodyParser = require("body-parser");

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// so that sequelize se connect kare automatically

require("./models/index.js");

// Serve the static files from the React app
app.use(express.static(process.cwd() + "/frontend/build/"));

app.use(express.static(path.join(__dirname, "frontend/build")));

// parse application/json
app.use(bodyParser.json());

//middleware for cookies
app.use(cookieParser());

// Refresh route should come before the frontend serve so that persist login works
app.use("/api/refresh",refreshTokenRoute);

// This will handle the frontend routes 
app.get("/*", function (req, res) {
  const path1 = path.join(__dirname, "frontend/public/index.html");
  res.sendFile(
    path.join(__dirname, "frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});


// This will handle the backend routes
app.use("/api/register", userregister);
app.use("/api/auth", userlogin);
app.use("/api/sendpasswordlink", sendpasswordlink);
app.use("/api/forgotpassword/:id/:token", verifyresetpassworduser);
app.use("/api/updatepassword/phno", updatepasswordphno);
app.use("/api/updatepassword/email", updatepasswordemail);
app.use("/api/users", users);
app.use("/api/logout",logoutRoute);
app.use("/api/olympiads" , olympiads);
app.use("/api/interestedfields" , interestedfields);
app.use("/api/exams",exams) ;

app.use(verifyJWT);

app.use("/api/subjects", subjects);
app.use("/api/eleven12thuser", eleven12th);
app.use("/api/submitExam",saveExamDetails) ;
app.use("/api/getuserinfophno", getUser);
app.use("/api/below8thuser", below8th);
app.use("/api/bachelors", bachelors);
app.use("/api/submit-personal-details", users) ;
app.use("/api/saveUserType", saveRole) ;
app.use("/api/saveLoginRoute", saveLoginRoute) ;
app.use("/api/savePersonalDetails", savePersonalDetails) ;
// Learning working in sync



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
