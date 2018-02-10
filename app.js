var Dab = require(__dirname+"/dab");
var express = require("express");
var fs = require("fs");

function renderPage(page, data) {
	data = (data)? data: {};
	return (
		fs.readFileSync(__dirname+"/pages/header.html", "utf8")
			.replace(/\[content\]/g, fs.readFileSync(__dirname+"/pages/"+page+".html", "utf8"))
			.replace(/\[data\]/g, data)
	);
};

module.exports = function(app, dir) {

	dir = (dir)? dir: "";

	app.use(dir, express.static(__dirname+"/public"))
	app.get(dir+"/", function(req, res) {
		res.send(renderPage("game"));
	});

}