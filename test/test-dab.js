var Dab = require("../dab");

var game = new Dab({
	width: 5,
	height: 5,
	players: 2,
	debug: true
});

game.complete = function(results) {
	console.log("yay!");
	console.log(results);
}

function printDab(dab) {
	let out = "";
	for (var y=0; y<dab.height+1; y++) {
		for (var i=0; i<2; i++) {
			if (i==0) {
				for (var x=0; x<dab.width; x++) {
					out += (dab.lines.h[x][y]>-1)?
						"o----": "o    ";
				} out += "o\n";
			} else if (y!=dab.height) {
				for (var x=0; x<dab.width; x++) {
					out += (dab.lines.v[x][y]>-1)?
						"|  ": "   "; 
					out += (dab.boxes[x][y]>-1)?
						dab.boxes[x][y]+" ": "  ";
				}
				out += (dab.lines.v[dab.width][y]>-1)?
					"|\n": " \n";
			}
		}
	} console.log(out);
}

function boxTest() {
	game.line("h", 0, 0, 0, function() { printDab(game); });
	game.line("v", 0, 0, 0, function() { printDab(game); });
	game.line("h", 0, 1, 0, function() { printDab(game); });
	game.line("v", 1, 0, 0, function() { printDab(game); });
	game.line("h", 1, 0, 0, function() { printDab(game); });
	game.line("h", 2, 0, 0, function() { printDab(game); });
	game.line("v", 3, 0, 0, function() { printDab(game); });
	game.line("v", 3, 1, 0, function() { printDab(game); });
	game.line("h", 3, 1, 0, function() { printDab(game); });
	game.line("v", 4, 1, 0, function() { printDab(game); });
	game.line("h", 4, 2, 0, function() { printDab(game); });
	game.line("v", 4, 2, 0, function() { printDab(game); });
	game.line("h", 3, 5, 0, function() { printDab(game); });
	game.line("h", 3, 4, 0, function() { printDab(game); });
	game.line("h", 3, 3, 0, function() { printDab(game); });
	game.line("h", 3, 2, 1, function() { printDab(game); });
}

function gameOverTest() {
	for (var x=0; x<5; x++) {
		for (var y=0; y<6; y++) {
			game.line("h", x, y, Math.floor(Math.random()*2), function() { printDab(game); });
		}
	}

	for (var x=0; x<6; x++) {
		for (var y=0; y<5; y++) {
			game.line("v", x, y, Math.floor(Math.random()*2), function() { printDab(game); });
		}
	}
}

gameOverTest();