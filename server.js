
var fs = require('fs');
var bodyParser = require("body-parser"); 
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('key.pem');
var certificate = fs.readFileSync('cert.crt');
const cookieParser = require("cookie-parser");

const csrf = require("csurf");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


var credentials = {key: privateKey, cert: certificate};
var express = require('express');
const { firebase } = require('./firebase');
var app = express();

const csrfMiddleware = csrf({ cookie: true });

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8443);
httpsServer.listen(8001);


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);


app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});


app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});



app.get('/login', (req, res) => {
  res.render(`login`)
})
app.get('/index', (req, res) => {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
  
      res.render(`index`);
    })
    .catch((error) => {
      res.redirect("/login");
    });
  
})


app.get('/register', (req, res) => {
  res.render(`register`)
})

app.get('/send', (req, res) => {
  res.render('send')
})
app.get('/video-page', (req, res) => {
  res.render('video-page')
})
app.get('/upload', (req, res) => {
  res.render('upload')
})
app.get('/create-channel', (req, res) => {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      res.render(`create-channel`,{id:userData.uid});
    })
    .catch((error) => {
      res.redirect("/login");
    });
  
})
app.listen(8000);

app.post('/login',(req,res)=>{
  res.render('login');
  
})
app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

app.get('/r', (req, res) => {
  res.render('receive')
})
app.get('/video-page-send', (req, res) => {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      res.render(`video-page-send`,{id:userData.uid});
    })
    .catch((error) => {
      res.redirect("/login");
    });
  
})
app.get('/video-page-recieve', (req, res) => {
  res.render('video-page-recieve',{id:req.query.id});
 
})









