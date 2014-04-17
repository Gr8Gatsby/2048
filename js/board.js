// Create the game board
function Board(rows, cols) {
	this.rows = rows;
	this.cols = cols;
	this.matrix = new Array(this.rows);
}

Board.prototype.initialize = function() {
	for(var i = 0; i < this.rows; i++) {
		this.matrix[i] = new Array(this.cols);
		for(var j = 0; j < this.cols; j++ ) {
			this.matrix[i][j] = 0;
		}
	}
}

Board.prototype.addTile = function() {
	this.matrix[0][0] = new Tile(new Position(0,0), 2);
	//this.matrix[0][1] = new Tile(new Position(0,1), 2);
	this.matrix[0][2] = new Tile(new Position(0,2), 2);
	this.matrix[0][3] = new Tile(new Position(0,3), 4);
	this.matrix[0][5] = new Tile(new Position(0,5), 32);

	this.matrix[1][4] = new Tile(new Position(1,4), 32);
	this.matrix[1][5] = new Tile(new Position(1,5), 32);
	console.log("added tiles");
}

Board.prototype.move = function(direction) {
	// Check if game is over
	if(direction === 0) {
		var column = [];
		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < this.cols; j++) {
				if(this.matrix[i][j] instanceof Tile) {
					column.push(this.matrix[i][j]);
				}
			}
			// There are tiles to process
			if(column.length > 0)
			{
				var combined = [];
				for(var k = 0; k < column.length; k++) {
					// The end column tile can't move for the direction
					if(k > 0) {
						// Handle tile combining
						if(column[k].value === column[k-1].value && !column[k-1].combined) {
							column[k-1].combine(column[k]);	// Values are equal combine tiles
							combined.push(column[k-1]);		// Sort the combined values
							this.deleteTile(column[k]);		// Delete the tile from the matrix
							column[k].value = 0;			// reset the value
						} else if(column[k].value != 0) {
							combined.push(column[k]);		// Add any other tile that can't be combined
						}
					}
				}
				// Rearrange the grid
				for(var l = 0; l < combined.length; l++) {
					this.moveTile(combined[l], new Position(combined[l].position.x, l));
				}
				combined = [];
				column = [];
			}
		}		
	}
}

Board.prototype.deleteTile = function(tile) {
	this.matrix[tile.position.x][tile.position.y] = 0;
}

Board.prototype.moveTile = function(tile, position) {
	this.matrix[tile.position.x][tile.position.y] = 0;
	tile.position = position;
	this.matrix[tile.position.x][tile.position.y] = tile;
}

//Test board
var b = new Board(6,6);
b.initialize();
b.addTile();
b.move(0);