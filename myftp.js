var PromiseFtp = require('promise-ftp');
var fs = require('fs');
  
var ftp = new PromiseFtp();

ftp.connect({host: "ftp.dlptest.com", user: "dlpuser@dlptest.com", password: "fLDScD4Ynth0p4OJ6bW6qCxjh"})
  .then(function (serverMessage) {
	
	console.log("put foo.txt");
    ftp.put('foo.txt', 'foo-remote-copy.txt');
	return ftp.list('/');
	
  }).then(function (list) {
    console.log('Directory listing:');
    console.dir(list);
    return ftp.end();
  });