var list_data = {
	all : {
		id : 0,
		first : 1,
		last : 890
	},
	gen1 : {
		id : 1,
		first : 1,
		last : 151
	},
	gen2 : {
		id: 2,
		first : 152,
		last : 251
	},
	gen3 : {
		id : 3,
		first : 252,
		last : 386
	},
	gen4 : {
		id : 4,
		first : 387,
		last : 493
	},
	gen5 : {
		id : 5,
		first : 494,
		last : 649
	},
	gen6 : {
		id : 6,
		first : 650,
		last : 721
	},
	gen7 : {
		id : 7,
		first : 722,
		last : 809
	},
	gen8 : {
		id : 8,
		first : 810,
		last : 890
	},
	test: {
		id : 9,
		first : 1,
		last : 12
	},
	mega: {
		id : 'm',
		gen : 6,
		contents : ['m3','m6x','m6y','m9','m15','m18','m65','m80','m94','m115','m127','m130','m142','m150x','m150y','m181','m208','m212','m214','m229','m248','m254','m257','m260','m282','m302','m303','m306','m308','m310','m319','m323','m334','m354','m359','m362','m373','m376','m380','m381','m384','m428','m445','m448','m460','m475','m531','m719']
  },
  gigantamax: {
  	id : 'x',
  	contents : ['x6','x12','x25','x52','x68','x94','x99','x131','x133','x143','x569','x809','x823','x826','x834','x839','x841','x844','x849','x851','x858','x861','x869','x879','x884','x890']
  },
  regional: {
  	contents : []
  },
  alolan: {
  	id : 'a',
  	contents : ['a19','a20','a26','a27','a28','a37','a38','a50','a51','a52','a53','a74','a75','a76','a88','a89','a103','a105']
  },
  galarian: {
  	id : 'g',
  	contents : ['g52','g77','g78','g79','g83','g110','g122','g222','g263','g264','g554','g555','g562','g618']
  },
  other: {
  	id : 'o',
  	contents : ['o351r','o351s','o351w','o382','o383','o386a','o386d','o386s','o412s','o412t','o413s','o413t','o421','o479f','o479h','o479m','o479r','o479w','o487','o492','o555','o585a','o585s','o585w','o586a','o586s','o586w','o641','o642','o645','o646b','o646w','o647','o648','o718c','o718t','o720','o741a','o741m','o741o','o745d','o745m','o746','o774','o791','o792','o800a','o800d','o800l','o801','o849','o875','o877','o888','o889','890']
  }
};



var maxPokemon = list_data.all.last;
var pokemonList = [];
var topGridImgArray = document.querySelectorAll('#grid img');
var TESTING = false;
var imagePath = 'images/art/'

Array.removeRandom = function(array) {
	var _randIndex = Math.floor(Math.random() * array.length);
	return array.splice(_randIndex, 1)[0];
}

//recursive method to load each image
function loadImage(index) {
	if(index > maxPokemon) { //reached last image
		document.getElementById('loader-screen').style.display = 'none';
		document.getElementById('game').style.display = 'block';
		document.getElementById('settings').style.display = 'inline-block';
		return;
	}
	
	var _tmpImage = new Image();
	_tmpImage.onload = function() {
		
		//update progress bar
		var _percentageNode = document.getElementById('percentage').querySelector('span');
		var _fillNode = document.getElementById('percentage-fill');
		
		_percentageNode.innerText = index/maxPokemon*100;
		_fillNode.style.width = ''+index/maxPokemon*100+'%';
		loadImage(index + 1);
	};
	if(document.getElementById('sprites').checked && pkmId <= 721)
			_tmpImage.src = 'images/sprites/' + index + '.png';
		else
			_tmpImage.src = imagePath + index + '.png';
}

function createIntegerArray(startValue, endValue) {
	var _array = [];
	for(j = startValue; j <= endValue; j++) {
		_array.push(j);
	}
	return _array;
}

//returns a List containing the pokemon selected based on which settings are checked
function getPokemonList() {
	var list = [];
	
	if(TESTING) {
		return createIntegerArray(list_data.test.first, list_data.test.last);
	}
	//all gens
	if(document.getElementById('gen-all').checked) {
		list = createIntegerArray(list_data.all.first, list_data.all.last);
	}
	
	var inputs = document.getElementsByClassName('gen-checkbox');
	//add each generation that is checked to the list
	for(i = 0; i < inputs.length; i++) {
		if(inputs[i].checked) {
			var generation = inputs[i].value;
			var dataObj = list_data['gen'+generation];
			list = list.concat(createIntegerArray(dataObj.first, dataObj.last));
		}
	}

	//add each form set that is checked to the list based on criteria
	if(document.querySelector('input[name="forms-radio"]:checked').value == 'poke'){//add forms by pokemon
		//add forms based on already included pokemon
		var tempFormList = []
		
		if(document.getElementById('forms-all').checked){//add all forms by pokemon
			tempFormList = tempFormList.concat(list_data['alolan'].contents);
			tempFormList = tempFormList.concat(list_data['galarian'].contents);
			tempFormList = tempFormList.concat(list_data['mega'].contents);
			tempFormList = tempFormList.concat(list_data['gigantamax'].contents);
			tempFormList = tempFormList.concat(list_data['other'].contents);
		}
		else{//add chcked forms by pokemon
			if(document.getElementById('regional-all').checked){ //handle regionals
				tempFormList = tempFormList.concat(list_data['alolan'].contents);
				tempFormList = tempFormList.concat(list_data['galarian'].contents);
			}
			
			if(document.getElementById('forms-other').checked){//check if other forms need to be added
				tempFormList = tempFormList.concat(list_data['other'].contents);
			}
			
			if(document.getElementById('mega').checked)//check if megas need to be added
				tempFormList = tempFormList.concat(list_data['mega'].contents);
			
			if(document.getElementById('gigantamax').checked)//check if gigantas need to be added
				tempFormList = tempFormList.concat(list_data['gigantamax'].contents);
			}
		list = list.concat(matchPokemon(tempFormList,list));
	}
		
	else{//include forms by region
		if(Document.getElementById('forms-all').checked){//add all forms by region
			if(list.includes(722)) list = list.concat(list_data['alolan'].contents);
			if(list.includes(810)) list = list.concat(list_data['galarian'].contents);
			if(list.includes(650)) list = list.concat(list_data['mega'].contents);
			if(list.includes(810)) list = list.concat(list_data['gigantamax'].contents);
			list = list.concat(matchPokemon(list_data['other'].contents,list));
		}
		else{//add checked forms by region
			
			if(document.getElementById('regional-all').checked){ //handle regionals
				if(list.includes(722)) list = list.concat(list_data['alolan'].contents);
				if(list.includes(810)) list = list.concat(list_data['galarian'].contents);
			}
			
			if(document.getElementById('forms-other').checked){//check if other forms need to be added
				list = list.concat(matchPokemon(list_data['other'].contents,list));
			}
			
			if(list.includes(650) && document.getElementById('mega').checked) list = list.concat(list_data['mega'].contents); //add megas if gen 6 is added
			if(list.includes(810) && document.getElementById('gigantamax').checked) list = list.concat(list_data['gigantamax'].contents); //add gigantas if gen 8 is added
		}
	}
	return list;
}

//returns an array of all elements of arrayA that have a matching string of numbers in arrayB
function matchPokemon(sourceArray,dictionaryArray){
	var matchArray = [];
	for(j = 0; j < sourceArray.length; j++){
			if(dictionaryArray.includes(Number(sourceArray[j].replace(/\D/g,'')))){
				matchArray.push(sourceArray[j]);
			}
	}
	console.log(matchArray);
	return matchArray;
}

initilizeGame = function() {
	//preload pokemon images
	//loadImage(1);
	document.getElementById('loader-screen').style.display = 'none';
	document.getElementById('game').style.display = 'block';
	document.getElementById('settings').style.display = 'block';

	//set event handlers
	var nodes = document.getElementsByClassName('egg');
	for(i = 0; i < nodes.length; i++) {
		nodes[i].onclick = startGame;	
	}
	
	document.getElementById('gen-all').onchange = function(e) {
		nodes = document.getElementsByClassName('gen-checkbox');

		if(this.checked) { //disabled all other generation checkboxes
			for(i = 0; i < nodes.length; i++) {
				nodes[i].checked = false;
				nodes[i].disabled = true;
			}
		} else { //enable all other generation checkboxes
			for(i = 0; i < nodes.length; i++) {
				nodes[i].removeAttribute('disabled');
			}
		}
	}
	
	document.getElementById('forms-all').onchange = function(e) {
		nodes = document.getElementsByClassName('form-checkbox');

		if(this.checked) { //disabled all other form checkboxes
			for(i = 0; i < nodes.length; i++) {
				nodes[i].checked = false;
				nodes[i].disabled = true;
			}
		} else { //enable all other form checkboxes
			for(i = 0; i < nodes.length; i++) {
				nodes[i].removeAttribute('disabled');
			}
		}
	}
	
	document.getElementById('button-skip').onclick = skip;
	document.getElementById('button-undo').onclick = undo;
	document.getElementById('button-reset').onclick = resetGame;
}

displayPokemon = function() {
	if(TESTING) {
		console.log('------- length: ' + pokemonList.length);
	}
	var _myListElement = document.getElementById('pkmnList');
	_myListElement.innerHTML = '';
	for(i = 0; i < pokemonList.length; i++) {
		var tmpNode = document.createElement('li');
		tmpNode.innerHTML = pokemonList[i];
		_myListElement.appendChild(tmpNode);
		if(TESTING)
			console.log(pokemonList[i]);
	}
	
}

skip = function() {
	var _dexNumber = document.querySelector('#pkm2 img').getAttribute('dexnumber');
	pokemonList.push(_dexNumber);
	generatePokemon(document.querySelector('#pkm1 img'), false);
}

undo = function() {
		/* remove most recent node from undoList
		
	   check if the savedChoice id number matches the randomly generated
	   number for either choice
			if it does, then do not add the matchingChoice back into the list
			otherwise, add both currentChoices into the list
	
		next update the src of each location's choice
	
		check if we are at the top 10 choices and update that number as well
		
		update elminated text
		
		check if we need to disable the undo button (list is null)
	*/
	var _history = undoArray.pop();
	var _pkm1 = document.querySelector('#pkm1 img');
	var _pkm2 = document.querySelector('#pkm2 img');
	
	_history.saved = _history[1];
	_history.deleted = _history[0];
	
	//check if we need to remove the saved pokemon from the array (to prevent duplicates)
	if(_history.saved.value != _pkm1.getAttribute('dexnumber') &&
	   _history.saved.value != _pkm2.getAttribute('dexnumber')) {
	   pokemonList.splice(pokemonList.indexOf(_history.saved.value), 1);
	}
	
	//check if we need to add the currently displayed pokemon back into the array
	if(_history.saved.value != _pkm1.getAttribute('dexnumber') &&
		_history.deleted.value != _pkm1.getAttribute('dexnumber')) {
		pokemonList.push(_pkm1.getAttribute('dexnumber'));
	}
	if(_history.saved.value != _pkm2.getAttribute('dexnumber') &&
		_history.deleted.value != _pkm2.getAttribute('dexnumber')) {
		pokemonList.push(_pkm2.getAttribute('dexnumber'));
	}
  

   //update the top 10 grid
   if(pokemonList.length + 1 <= topGridImgArray.length)
	{
		topGridImgArray[pokemonList.length].src = 'images/fill.png';
	}
   
   //update the eliminated count
   document.querySelector('#choice span#remaining').innerText = maxPokemon - pokemonList.length - 2;
   
   
   //pokemonList, etc. should be ready now, so let's update the pokemon
   if(document.getElementById('sprites').checked && imagePath+_history.saved.value <= 721)
			document.querySelector('#' + _history.saved.sourceId + ' img').src = 'images/sprites/'+_history.saved.value + '.png';
	 else
			document.querySelector('#' + _history.saved.sourceId + ' img').src = imagePath+_history.saved.value + '.png';
			
   document.querySelector('#' + _history.saved.sourceId + ' img').setAttribute('dexnumber', _history.saved.value);
   document.querySelector('#' + _history.saved.sourceId + ' img').title = _history.saved.value;
   
      if(document.getElementById('sprites').checked && imagePath+_history.deleted.value <= 721)
			document.querySelector('#' + _history.deleted.sourceId + ' img').src = 'images/sprites/'+_history.deleted.value + '.png';
	 else
			document.querySelector('#' + _history.deleted.sourceId + ' img').src = imagePath+_history.deleted.value + '.png';

   document.querySelector('#' + _history.deleted.sourceId + ' img').setAttribute('dexnumber', _history.deleted.value);
   document.querySelector('#' + _history.deleted.sourceId + ' img').title = _history.deleted.value;
   
   if(undoArray.length == 0)
   		document.getElementById('button-undo').disabled = true;
   
   if(TESTING) {
	   console.log('action: undo pressed');
	   console.log(_history.deleted.value + '  ' + _history.saved.value);
	   displayPokemon();
   }
}

startGame = function() {

		//set imagepath variables
	if(document.querySelector('input[name="art-radio"]:checked').value == 'art')
		imagePath = 'images/art/'
	else
		imagePath = 'images/models/'

	//generate the pokemon list we will use.
	pokemonList = getPokemonList();
	
	//show the playing board
	document.getElementById('settings').style.display = 'none';
	document.getElementById('grid').style.display = 'block';
	document.getElementById('button-reset').style.display = 'block';
	
	//update the maximum pokemon number
	maxPokemon = pokemonList.length;
	document.querySelector('#choice span#total').innerText = maxPokemon;
	//update the minimum pokemon number
	document.querySelector('#choice span#remaining').innerText = maxPokemon - pokemonList.length;
	
	//set the eggs to two random pokemon
	generatePokemon(document.querySelector('#pkm1 img'), false);
	
	//enable the skip and undo buttons
	document.getElementById('button-skip').removeAttribute('disabled');
}

resetGame = function() {
	document.getElementById('grid').style.display = 'none';
	document.getElementById('remaining').innerHTML = '---';
	document.getElementById('total').innerHTML = '---';
	document.getElementById('settings').style.display = 'inherit';
	document.getElementById('button-reset').style.display = 'none';
	document.getElementById('button-skip').disabled = true;
	document.getElementById('button-undo').disabled = true;
	document.querySelector('#pkm1 img').src = 'images/egg.png';
	document.querySelector('#pkm2 img').src = 'images/egg.png';
	document.querySelector('#pkm1 img').onclick = startGame;
	document.querySelector('#pkm2 img').onclick = startGame;
	document.querySelector('#pkm1 img').className = 'egg';
	document.querySelector('#pkm2 img').className = 'egg';
	document.querySelector('#pkm1 img').removeAttribute('dexnumber');
	document.querySelector('#pkm2 img').removeAttribute('dexnumber');
	topGridImgArray[0].src = 'images/fill.png';
	topGridImgArray[1].src = 'images/fill.png';
	topGridImgArray[2].src = 'images/fill.png';
	topGridImgArray[3].src = 'images/fill.png';
	topGridImgArray[4].src = 'images/fill.png';
	topGridImgArray[5].src = 'images/fill.png';
	topGridImgArray[6].src = 'images/fill.png';
	topGridImgArray[7].src = 'images/fill.png';
	topGridImgArray[8].src = 'images/fill.png';
	pokemonList = [];
	undoArray = [];
}

/*undoArray[ {value: 1, action: 'delete', sourceId: callLocation},
			 {value: 1, action: 'save', sourceId: callLocation} ]
	 );

	value: dexnumber
	action: 'delete' or 'save'
	sourceId: 'pkm1' or 'pkm2'
*/
var undoArray = [];

generatePokemon = function(callLocation, updateUndo) {	
	
	var uncalledLocation;
	
	if(callLocation.parentNode.id == 'pkm1') 
		uncalledLocation = document.querySelector('#pkm2 img');
	else if(callLocation.parentNode.id == 'pkm2') {
		uncalledLocation = document.querySelector('#pkm1 img');
	}
	
	
	//update the undo list
	if(updateUndo) {
		var unlikedPkm = {
			value: uncalledLocation.getAttribute('dexnumber'),
			action: 'delete',
			sourceId: uncalledLocation.parentNode.id
		};
		
		var likedPkm = {
			value: callLocation.getAttribute('dexnumber'),
			action: 'save',
			sourceId: callLocation.parentNode.id	
		};
		
		undoArray.push([unlikedPkm, likedPkm]);
	} else {
		callLocation.className = '';
		uncalledLocation.className ='';
	}
	
	//need to update the top list before changing the displayed src
	if(pokemonList.length + 1 <= topGridImgArray.length)
	{
		topGridImgArray[pokemonList.length].src = uncalledLocation.src;
	}
	
	if(pokemonList.length > 0) {
		
		var pkmId = Array.removeRandom(pokemonList);
		
		//add the liked pokemon back into the list
		if(callLocation.getAttribute('dexnumber')) {
			pokemonList.push(callLocation.getAttribute('dexnumber'));
		}
		
		//update pkm1 and pkm2
		if(document.getElementById('sprites').checked && pkmId <= 721)
			callLocation.src = 'images/sprites/' + pkmId + '.png';
		else
			callLocation.src = imagePath + pkmId + '.png';
			
		callLocation.setAttribute('dexnumber', pkmId);
		callLocation.onclick = function(e) { generatePokemon(this, true); };
		callLocation.title = callLocation.getAttribute('dexnumber');
		
		pkmId = Array.removeRandom(pokemonList);
		
		if(document.getElementById('sprites').checked && pkmId <= 721)
			uncalledLocation.src = 'images/sprites/' + pkmId + '.png';
		else
			uncalledLocation.src = imagePath + pkmId + '.png';
			
		uncalledLocation.setAttribute('dexnumber', pkmId);
		uncalledLocation.onclick = function(e) { generatePokemon(this, true); };
		uncalledLocation.title = uncalledLocation.getAttribute('dexnumber');
		
		//update pokemon remaining
		document.querySelector('#choice span#remaining').innerText = maxPokemon - pokemonList.length - 2;
		if(TESTING) {
			console.log('action: generated pokemon');
			console.log(callLocation.getAttribute('dexnumber') + '  ' + uncalledLocation.getAttribute('dexnumber'));
			displayPokemon();
		}
	} else {
		//no pokemon left in list
		callLocation.onclick = '';
		uncalledLocation.onclick = '';
		uncalledLocation.className = 'hidden';
		document.querySelector('#choice span#remaining').innerText = maxPokemon;
	}
	
	if(document.getElementById('button-undo').disabled && undoArray.length > 0)
		document.getElementById('button-undo').disabled = false;
	
}

document.body.onload = initilizeGame();

