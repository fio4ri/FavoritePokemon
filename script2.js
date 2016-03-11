
initilizeGame = function() {
	//preload pokemon images
	
	var percentageNode = document.getElementById('percentage').querySelector('span');
	var fillNode = document.getElementById('percentage-fill');
	for(var i = 1; i <= 718; i++) {
		var tmpImage = new Image();
		tmpImage.src = 'images/' + i + '.png';
		
		//update progress bar
		percentageNode.innerText = i/720;
		fillNode.style.width = ''+i/720*100+'%';
		console.log(i/720 * 100);
	}
	
	//set event handelers
	for(var node in document.getElementsByClassName('egg')) {
		node.onclick = pickPokemon;
	}
	
}

function pickPokemon() {
	
}

document.body.onload = initilizeGame();
