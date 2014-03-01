function Board(board) {
    if (Array.isArray(board)) {
        var dup = []; //duplicate the matrix
        for (var row = 0; row < board.length; row++) {
            dup.push([]);
            for (var col = 0; col < board[row].length; col++) {
                dup[row][col] = board[row][col];
            }
        }
        this.b = dup;
    } else if (typeof board == "string") { 
        var rows = board.split("\n"), cells, x;
        for (var i = 0; i < rows.length; i++) {
            cells = rows[i].trim().split(" ");
            rows[i] = [];
            for (var j = 0; j < cells.length; j++) {
                rows[i][j] = parseInt(cells[j]);
            }
        }
        this.b = rows;
    }
}

Board.prototype.toString = function() {
    return this.b.join('\n').replace(/,/g, ' ');
};

Board.prototype.get = function(x, y) {
    // this could be modified for wrapping behavior
    if (this.b[x] !== undefined && this.b[x][y] !== undefined) {
        return this.b[x][y];
    } else {
        return 0;
    }
};

Board.prototype.neighborCount = function(x, y) {
    return this.get(x-1, y-1) + this.get(x-1, y) + this.get(x-1, y+1) +
        this.get(x, y-1) + this.get(x, y+1) + this.get(x+1, y-1) +
        this.get(x+1, y) + this.get(x+1, y+1);
};

Board.prototype.getNext = function(x, y) {
    var count = this.neighborCount(x,y);
    if (count == 3 || this.get(x,y) && count == 2) {
        return 1;
    } else {
        return 0;
    }
}

Board.prototype.nextGen = function() {
    var result = [];
    for (var row = 0; row < this.b.length; row++) {
        result.push([]);
        for (var col = 0; col < this.b[row].length; col++) {
            result[row][col] = this.getNext(row, col);
        }
    }
    
    return new Board(result);
}
///*
var test = "0 1 0 0 0 \n\
1 0 0 1 1 \n\
1 1 0 0 1 \n\
0 1 0 0 0 \n\
1 0 0 0 1";
/*
var test = [[0, 1, 0, 0, 0], 
[1, 0, 0, 1, 1], 
[1, 1, 0, 0, 1], 
[0, 1, 0, 0, 0],
[1, 0, 0, 0, 1]];
*/

brd = new Board(test);
console.log(brd.toString());

nbrd = brd.nextGen();
console.log("\n\n", nbrd.toString());


