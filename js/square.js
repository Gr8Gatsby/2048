function Square(position){
	this.tile = undefined;
	this.position = position;
}

Square.prototype.getPosition = function(){
	return this.position;
}