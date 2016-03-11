var maxPokemon = 718;
var percentageNode = document.getElementById('percentage').querySelector('span');
var fillNode = document.getElementById('percentage-fill');

initilizeGame = function() {
	//preload pokemon images
	loadImage(1);
	
	//set event handelers
	for(var node in document.getElementsByClassName('egg')) {
		node.onclick = pickPokemon;
	}
	
}

//recursive method to make sure each image is loaded
function loadImage(index) {
	if(index > maxPokemon)
		return;
	
	var tmpImage = new Image();
	tmpImage.onload = function() {
		//update progress bar
		percentageNode.innerText = index/maxPokemon*100;
		fillNode.style.width = ''+index/maxPokemon*100+'%';
		loadImage(index + 1);
	}
	tmpImage.src = 'images/' + index + '.png';
} 

function pickPokemon() {
	
}

document.body.onload = initilizeGame();
