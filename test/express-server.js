var express = require("express");
var app = express();

require("../app.js")(app);

app.listen(1337, function(){
	console.log("Server is open.")
});