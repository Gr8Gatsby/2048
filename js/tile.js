function Tile(position, value) {
	this.value = value || 2;
	
	this.position = position;
	this.startPosition = null;
	this.combined = false;
}

Tile.prototype.saveStart = function() {
	this.startPosition = this.position;
}


Tile.prototype.combine = function(tile) {
	this.value += tile.value;
	this.combined = true;
	tile.combined = true;
	console.log("Combined value = " + this.value);
	delete tile;
	// return this.value;
}
/*

0,0 [-]
0,1 [2]
0,2 [-]
0,3 [2]

0,1 moveTo 0,0
0,3 moveTo 0,0 combineWith 0,0



*/