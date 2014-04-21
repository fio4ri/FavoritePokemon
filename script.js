var limit = {
	min: 1, max: 718
};
var pkmElim = new Array();
var pkmLike = new Array();
function startG() {
	var _tmp = document.getElementsByTagName('select')[0];
	_tmp.setAttribute('disabled', 'disabled');
	document.getElementById('newPkm').setAttribute('disabled', 'disabled');
	document.getElementById('settings').className = 'disabled';
	document.getElementById('skip').removeAttribute('disabled');

	//make sure the gen used will be what is selected
	pkmElim = new Array();
	pkmLike.length = 0;;
	updateGen(_tmp.value, true);
	reroll(0);
}

function updateGen(value, start) {
	var _limits = [ [1, 718], 
					[1, 151], [152, 251], [252, 386], 
					[387, 493], [494, 649], [650, 718]];
	for(i = 0; i < _limits.length; i++) {
		if(i == value) {
			limit.min = document.getElementById('newPkm').checked ? _limits[i][0] : 1;
			limit.max = _limits[i][1];
			document.getElementsByTagName('span')[1].innerHTML = ''+ (limit.max - limit.min + 1);
			if(!start)
				break;
			for(j = limit.min; j <= limit.max; j++) {
				pkmLike.push(j);
			}
			break;
		}
	}
}

function reroll(fav) {
	console.log(pkmElim.length + '\t' + pkmLike.length);
	if(pkmElim.length >= limit.max - limit.min) {
		return;
	}
	var _tmp = [document.getElementById('choice').getElementsByTagName('img')[0],
				document.getElementById('choice').getElementsByTagName('img')[1]];
		//parse the dex# from choice image
		_tmp.push(_tmp[0].src.slice(_tmp[0].src.search(/[0-9]*.png/), _tmp[0].src.length - 4));
		_tmp.push(_tmp[1].src.slice(_tmp[1].src.search(/[0-9]*.png/), _tmp[1].src.length - 4));

	switch(fav) {
		case 0: //It is the first roll. Need to change the image's onclick event
			_tmp[0].setAttribute('onclick', 'reroll(1)');
			_tmp[1].setAttribute('onclick', 'reroll(2)');
			break;
		case 1:
			pkmElim.push(_tmp[3]);
			pkmLike.push(_tmp[2]);
			break;
		case 2:
			pkmElim.push(_tmp[2]);
			pkmLike.push(_tmp[3]);
			break;
		case 3: //skipped was press. don't eliminate.
			pkmLike.push(_tmp[2]);
			pkmLike.push(_tmp[3]);
	}
	
	//update top 9 image src
	if(pkmLike.length < 10 && fav != 3) {
		var x = document.getElementsByClassName('fav');
		x[pkmLike.length - 1].src = 'images/' + pkmElim[pkmElim.length -1] + '.png';
	}

	//update choice image src
	_tmp[0].src = 'images/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';
	if(pkmLike.length == 0)
		_tmp[1].src = _tmp[0].src;
	else 
		_tmp[1].src = 'images/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';

	//update eliminated text
	if(pkmElim.length == limit.max - 1)
		pkmElim.push(0);
	document.getElementsByTagName('span')[0].innerHTML = ''+ pkmElim.length;
} 
