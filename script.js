function(){

var memory_array = ['Apple','Apple','Book','Book','Cat','Cat','Dog','Dog','Ear','Ear','Foot','Foot','Gate','Gate','Hat','Hat','Ice','Ice','Jam','Jam','Kit','Kit','Lamp','Lamp'];
var memory_value = [];
var memory_tile_ids = [];
var tile_flipped = 0;
Array.prototype.memory_tile_shuffle = function () {
  var i = this.length, j, temp;
  while (--i > 0) {
    j= Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[i] = temp;
  }
}
function newBoard () {
  tiles_flipped = 0;
  var output = '';
  memory_array.memory_tile_shuffle();
  for (var i = 0; i < memory_array.length; i++){
    output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\ '' + memory_array[i]+'\')"></div>';
  }
  document.getElementById('.container').InnerHTML = output;
}
window.addEventListener(newBoard());




};
