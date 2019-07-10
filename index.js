const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jwt-simple");
// decode jwt
const ExtractJwt = require("passport-jwt").ExtractJwt;
// Strategy
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "CHATPETH"; // Secret key
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
   secretOrKey: SECRET,
}

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
   if(payload.sub === "super")
   {
	   done(null, true);
   }
   else if(payload.sub === "operator")
   {
	   done(null, true);
   }
   else
   {
	   done(null, false);
   }
});

const passport = require("passport");

app.use(bodyParser.json()); // Enable json body-parser
passport.use(jwtAuth);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

const requireJWTAuth = passport.authenticate("jwt",{session:false});
var UNAME = "login";
const PORT = process.env.PORT || 80;

// HTTPS Upload file
var multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage});

// FTP
var PromiseFtp = require('promise-ftp');
var fs = require('fs');
var ftp = new PromiseFtp();
var ftp_host = "ftp.dlptest.com";
var ftp_user = "dlpuser@dlptest.com";
var ftp_password = "fLDScD4Ynth0p4OJ6bW6qCxjh";


const loginMiddleware = (req, res, next) => {
	
	console.log(req.body);
	
	if(req.body.username === "super" && req.body.password === "atopiiot")
	{
		console.log("supervisor login complete");
		UNAME = "supervisor";
		next();
	}
	else if(req.body.username === "operator" && req.body.password === "default")
	{
		console.log("operator login complete");
		UNAME = "operator";
		next();
	}
	else
	{
		//res.send("Wrong username and password");
		res.sendFile(__dirname + "/" + "login.html");
		console.log("login failed");
		
		
	}
}

app.post("/index", loginMiddleware, (req, res) => {
   //res.send("Login success");
   
   const payload = {
      sub: req.body.username,
      iat: new Date().getTime() // iat --> issue at date
   };
   const mytoken = jwt.encode(payload, SECRET);
   //res.send(jwt.encode(payload, SECRET));
   
   /*
   res.json({
                    type: true,
					message: 'Authentication successful!',
                    token: mytoken
	});
	*/
	res.sendFile(__dirname + "/" + UNAME + ".html");
	
});

app.post('/upload', upload.single('avatar'), function (req, res, next) {
	
	console.log("upload req recv.");
	
	const file = req.file;
	var fname = file.originalname;
	var fpath = "uploads/" + fname;
	var flist = "Files list";
	var resultpage = "<html>\n <head>\n <link rel=\"icon\" type=\"image/png\" href=\"https://raw.githubusercontent.com/chatpeth/symp/master/public/images/pie-chart.png\">\n<link rel=\"stylesheet\" type=\"text/css\" href=\"/css/office.css\">\n</head>\n<body><h2>Files</h2>\n<p id=\"myfilelist\">";
	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}
	console.log(fpath);

	ftp.connect({host: ftp_host, user: ftp_user, password: ftp_password}).then(function (serverMessage) {
		ftp.put(fpath, fname);
		return ftp.list('/');}).then(function (list) {
			console.log('Directory listing:');
			
			list.forEach(function (element, index, array) {
				
				flist = flist + element.name + "</br>"
			});
			console.log(flist);
			resultpage = resultpage + flist + "</p>\n</body></html>";
			res.send(resultpage);
			return ftp.end();
  });
  
  //res.sendFile(__dirname + "/" + UNAME + ".html");
});

app.get('/', function(req, res){
  res.sendFile(__dirname + "/" + "login.html");
});

// JWT
app.get("/index", requireJWTAuth, (req, res) => {
	// For support jwt in next release
   //res.send("test");
   // Check token in http header
});

app.get('/login', function(req, res){
  
  res.sendFile(__dirname + "/" + "login.html");
});

app.use(function (req, res, next) {
  res.status(404).send("(404) Page not found!")
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('(500) Server error!!')
});



app.listen(PORT, () => console.log(`Listening on ${ PORT }`));