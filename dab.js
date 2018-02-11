function twod(width, height, val) {
	let arr = [];
	for (var x=0; x<width; x++) {
		arr[x] = [];
		for (var y=0; y<height; y++) {
			arr[x][y] = val;
		}
	}
	return arr;
}

function isComplete(dab) {
	let sum = 0;
	for (let p=0; p<dab.score.length; p++) {
		sum += dab.score[p];
	}

	if (sum == dab.width*dab.height) {
		return true;
	} else {
		return false;
	}
}

function isWinning(dab) {
	let winner_index = -1;
	let winner_score = -1;
	for (let p=0; p<dab.players; p++) {
		if (dab.score[p]>winner_score) {
			winner_score=dab.score[p];
			winner_index=p;
		}
	}

	return winner_index;
}

var defaults = {
	width: 6,
	height: 6,
	players: {
		min: 2,
		max: 4
	},
	debug: false
} 

var Dab = function(obj) {
	// obj = {
	// 	width, height,
	// 	players
	// }

	obj = (obj)? obj: {};
	this.width = (obj.width)? obj.width: defaults.width; 
	this.height = (obj.height)? obj.height: defaults.height;
	this.players = (
		obj.players>=defaults.players.min &&
		obj.players<=defaults.players.max)? obj.players: 2;
	this.debug = (obj.debug)? obj.debug: defaults.debug;

	this.score = [];
	for (var p=0; p<this.players; p++) {
		this.score[p] = 0;
	};

	this.boxes = twod(this.width, this.height, -1),
	this.lines = {
		h: twod(this.width, this.height+1, -1),
		v: twod(this.width+1, this.height, -1)
	}

	this.complete = function(info){};
	this.turn = 0;
		
	if (this.debug) console.log("New game: ");
	if (this.debug) console.log(this);

	this.nextTurn = function() {
		if (this.turn>=this.players-1) {
			this.turn = 0;
		} else {
			this.turn++;
		}
		if (this.debug) console.log("Turn changed: "+this.turn);
		return this.turn;
	}

	this.line = function(dir, x, y, p, callback) {
		callback = (callback)? callback: function(){};
		if (dir===undefined||x===undefined||
			y===undefined||p===undefined) {
			if (this.debug) console.log("Missing a value.");
			return callback();
		}

		if (p>=this.players) {
			if (this.debug) console.log("Player doesnt exist.");
			return callback();
		}

		try {
			this.lines[dir][x][y] = p;
		} catch(err) {
			if (this.debug) console.log(err);
			return callback();
		}

		let win = false;
		for (var x=0; x<this.width; x++) {
			for (var y=0; y<this.height; y++) {
				if (this.boxes[x][y]>-1) continue;
				try {
					let n = 0;
					if (this.lines.h[x][y]>-1)   { n++ } else { continue; }
					if (this.lines.v[x][y]>-1)   { n++ } else { continue; }
					if (this.lines.h[x][y+1]>-1) { n++ } else { continue; }
					if (this.lines.v[x+1][y]>-1) { n++ } else { continue; }
					if (n==4) {
						this.boxes[x][y] = p;
						this.score[p]++;
						if (this.debug) console.log("Added box!");
						win = true;
					}
				} catch(err) {
					if (this.debug) console.log(err);
					return callback();
				}
			}
		}

		if (this.debug) console.log("Added line!");
		if (this.debug) console.log("Boxes:");
		if (this.debug) console.log(Object.values(this.boxes));
		if (this.debug) console.log("Score:");
		if (this.debug) console.log(Object.values(this.score));
		if (this.debug) console.log("Complete: "+isComplete(this));
		if (this.debug) console.log("Winning: "+isWinning(this));

		if (!win) this.nextTurn();
		if (isComplete(this)) this.complete(isWinning(this));
		return callback();
	}
}

// module.exports = Dab;