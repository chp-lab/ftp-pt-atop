const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Re-write 11232018
var server = express();


const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/', function(req, res){
  
  res.sendFile(__dirname + "/" + "homepage.html");
});

server.get('/home', function(req, res){
  
  res.sendFile(__dirname + "/" + "homepage.html");
});

server.get('/index', function(req, res){
  console.log(__dirname);
  res.sendFile(__dirname + "/" + "index.html");
});

server.get('/powermeter', function(req, res){
  
  res.sendFile(__dirname + "/" + "powermeter.html");
});

server.get('/office', function(req, res){
  
  res.sendFile(__dirname + "/" + "office.html");
});

server.get('/gauge', function(req, res){
  console.log(__dirname);
  res.sendFile(__dirname + "/" + "gauge.html");
});

server.get('/live/powermeter', function(req, res){
  
  res.sendFile(__dirname + "/live/" + "powermeter.html");
});

server.get('/live/rm266', function(req, res){
  
  res.sendFile(__dirname + "/live/" + "rm266.html");
});

server.get('/rm266', function(req, res){
  console.log(__dirname);
  res.sendFile(__dirname + "/rm266.html");
});

server.get('/bill', function(req, res){
 
  res.sendFile(__dirname + "/bill.html");
});

server.get('/design', function(req, res){
  
  res.sendFile(__dirname + "/mycss.html");
});

server.get('/mqtt', function(req, res){
  
  res.sendFile(__dirname + "/mymqtt.html");
});

server.get('/rm100', function(req, res){
  
  res.sendFile(__dirname + "/rm100.html");
});

server.get('/symp', function(req, res){
  console.log("req symp received");
  res.sendFile(__dirname + "/symp.html");
});

server.get('/5610110106', function(req, res){
  console.log("req 5610110106 received");
  res.sendFile(__dirname + "/5610110106.html");
});

server.get('/rm315', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room315.html");
});

server.get('/rm316', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room316.html");
});

server.get('/rm317', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room317.html");
});

server.get('/rm318', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room318.html");
});

server.get('/rm321', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room321.html");
});

server.get('/rm322', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room322.html");
});

server.get('/rm323', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room323.html");
});

server.get('/rm324', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room324.html");
});

server.get('/rm325', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room325.html");
});

server.get('/rm326', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room326.html");
});

server.get('/rm327', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room327.html");
});

server.get('/rm328', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room328.html");
});

server.get('/rm331', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room331.html");
});

server.get('/rm332', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room332.html");
});

server.get('/rm333', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room333.html");
});

server.get('/rm334', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room334.html");
});

server.get('/rm335', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room335.html");
});

server.get('/rm336', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room336.html");
});

server.get('/rm337', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room337.html");
});

server.get('/rm338', function(req, res){
  
  res.sendFile(__dirname + "/phuket/room338.html");
});


//login
server.post('/home', function(req, res){

  console.log(req.body.uname);
  console.log(req.body.pwd);
/*
  if((req.body.uname == "chatpeth") && (req.body.pwd == "pweng_0406"))
  {
	  res.sendFile(__dirname + "/" + "lamp.html");
  }
  else
  {
	response = {
		username: "Incorect username or password of " + req.body.uname,
	};
	console.log(response);
	res.end(JSON.stringify(response));
  }
  */
	response = {
		username: req.body.uname,
	};
	res.end(JSON.stringify(response));
  
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


