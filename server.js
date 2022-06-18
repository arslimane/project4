
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
    
  
      res.render('index',{idc:userData.uid,id:userData.uid});
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
      res.render(`create-channel`,{id:userData.uid,idc:userData.uid});
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
      res.render(`video-page-send`,{idc:userData.uid,id:userData.uid,name:req.query.name});
    })
    .catch((error) => {
      res.redirect("/login");
    });
  
})
app.get('/video-page-recieve', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      res.render('video-page-recieve',{id:req.query.id,idc:userData.uid,name:req.query.name});
    })
    .catch((error) => {
      res.redirect("/login");
    });

 
 
})
app.get('/categories', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      res.render('categories',{id:userData.uid,idc:userData.uid});
    })
    .catch((error) => {
      res.redirect("/login");
    });

 
 
})
app.get('/account', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      res.render('account',{idc:userData.uid,id:userData.uid});
    })
    .catch((error) => {
      res.redirect("/login");
    });

 
 
})
app.get('/subscriptions', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      res.render('subscriptions',{idc:userData.uid,id:userData.uid});
    })
    .catch((error) => {
      res.redirect("/login");
    });

 
 
})
app.get('/settings', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      res.render('settings',{idc:userData.uid,id:userData.uid});
    })
    .catch((error) => {
      res.redirect("/login");
    });

 
 
})

app.get('/settings2', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      res.render('settings2',{idc:userData.uid,id:userData.uid});
    })
    .catch((error) => {
      res.redirect("/login");
    });

 
 
})
app.get('/channels', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      var t;
      var s=req.query.search;
      if(req.query.state!=null) t="s" ; else t="nos";
      if(req.query.search!=null) {t="search";
      s= s.replace("%20"," ");}
      res.render('channels',{idc:userData.uid,id:req.query.id,state:t,search:s});
    })
    .catch((error) => {
      res.redirect("/login");
    });

 
})
app.get('/forgot-password', (req, res) => {
 
      res.render('forgot-password');
   

 
})








