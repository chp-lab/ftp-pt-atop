const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// Re-write 07092019
var server = express();


const PORT = process.env.PORT || 80;
const INDEX = path.join(__dirname, 'index.html');

server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/', function(req, res){
  
  res.sendFile(__dirname + "/" + "index.html");
});

server.get('/home', function(req, res){
  
  res.sendFile(__dirname + "/" + "homepage.html");
});

server.get('/index', function(req, res){
  console.log(__dirname);
  res.sendFile(__dirname + "/" + "index.html");
});


//login
server.post('/home', function(req, res){

  console.log(req.body);
  console.log(req.body);

  if((req.body.uname == "operator") && (req.body.pwd == "default"))
  {
	  console.log("login ok");
	  res.sendFile(__dirname + "/" + "operator.html");
	  
  }
  else if((req.body.uname == "supper") && (req.body.pwd == "atopiiot"))
  {
	  console.log("login ok");
	  res.sendFile(__dirname + "/" + "suppervisor.html");
	  
  }
  else
  {
	response = {
		username: "Incorect username or password of " + req.body.uname,
	};
	console.log("__err user not found!");
	console.log(response);
	res.end(JSON.stringify(response));
  }
  
	
  
});

server.use(function (req, res, next) {
  res.status(404).send("(404) Page not found!")
});

server.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('(500) Server error!!')
});

//server.use((req, res) => res.sendFile(INDEX) );
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));


