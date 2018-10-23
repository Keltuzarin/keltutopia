// Constantes del mapa
var animationCounterEntries = 0;
var landArray = ['black', 'blue', 'brown', 'cyan', 'green', 'pink', 'purple', 'red', 'yellow'];
var heroPosition = 5;
var blockClickEvent = false;
var selectedSquareId;
var innCoords;
var monsterRate = 25;
var newInnRate = 5;

// eventos
// Si se hace zoom o se cambian las dimensiones de la pantalla
window.addEventListener("resize", calcElementsSize);

// no podemos generar un height deseado desde CSS, asiq lo hacemos con JS
function calcElementsSize(){
	var bodyHeight = window.innerHeight;
	// partimos del ancho como referencia para obtener cosas "cuadradas"
	var boardWidth = $('.board').width();
	// Asginamos el height deseado al elemento board
	$('.board').css({'height':boardWidth+'px'});
	// Asignamos el height deseado a los elementos que tapan el board
	$('.top-onBoard').css({'height':(boardWidth*1/5)+'px'});
	$('.left-onBoard').css({'height':(boardWidth*3/5)+'px'});
	$('.right-onBoard').css({'height':(boardWidth*3/5)+'px'});
	$('.bottom-onBoard').css({'height':(bodyHeight-(boardWidth*4/5))+'px'});
	$('.onBoard').css({'height':bodyHeight+'px'});
	$('.board-container').css({'height':bodyHeight+'px'});
	// Asignamos el height deseado a las fuentes
	$('body').css({'font-size':((boardWidth*1/5)/3)+'px'});
}

// anadimos un evento que escuche cuando termina una animacion de desplazamiento
$(".board").bind(
	"animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", 
	function(){
		// ya que tiene que entrar 25 veces, por que genera 25 animaciones, que solo entre en la primera
		if(animationCounterEntries==0){
			// actualizamos estados
			updateInn();
			regenerateBoard();
			// guardamos
			saveGame();
			// actualizamos mensajes de UX
			analizeSquare();
			whereIsInn();
		}
		animationCounterEntries++;
		if(animationCounterEntries==25){
			animationCounterEntries = 0;
		}
	}
);

// funcion inicial de la aplicacion
function startApp(){
	// primero generar el height de los elementos deseados
	calcElementsSize();
	// generamos los terrenos del board
	loadGame();
	// anadimos los eventos onclick a los elementos seleccionables
	for(var i=1;i<=9;i++){
		document.getElementById('onSquare-'+i).addEventListener("click", clickOnSquare);
	}
	// analizamos las acciones que se pueden hacer
	analizeSquare();
	// actualizamos el mensaje de la posada (inn.js)
	whereIsInn();
}

function loadGame(){
	// inicialmente obtenemos los datos almacenados
	var boardHTML = localStorage.getItem('boardHTML');
	var innCoordsValue = localStorage.getItem('innCoords');
	// generamos la posada si no existe
	if(innCoordsValue==null || innCoordsValue=='null'){
		innCoords = [0,0];
		saveGame();
	} else {
		innCoords = JSON.parse(innCoordsValue);
	}
	// generamos el tablero si no existe
	if(boardHTML==null || boardHTML=='null'){
		for(var i=1;i<=25;i++){
			generate(i);
		}
		saveGame();
	} else {
		$('.board').html(boardHTML);
	}
}

function saveGame(){
	localStorage.setItem('boardHTML', $('.board').html());
	saveInn();
}

// En un futuro, cada codigo de generacion tendra que ir a un JS independiente con su logica
function generate(pos){
	// Tipo de terreno
	var landId = Math.floor(Math.random() * 9);
	document.getElementById('square-'+pos).style.backgroundImage = 'url(img/glass_'+landArray[landId]+'.png)';
	// Posada Principal
	var squarePos = $('#square-'+pos);
	var posX = parseInt(squarePos.data('x'));
	var posY = parseInt(squarePos.data('y'));
	if(innCoords[0]==posX && innCoords[1]==posY){
		document.getElementById('square-'+pos).innerHTML = '<div class="inn"></div>';
	}
	// Enemigo
	if(canGenerate(pos)){
		var numRamdon = Math.floor(Math.random() * 100);
		if(numRamdon>(100-monsterRate)){
			// generamos el json de un enemigo en la posicion dada
			generateEnemy(pos);
		}
	}
	// Nuevas Posadas
	if(canGenerate(pos)){
		var numRamdon = Math.floor(Math.random() * 100);
		if(numRamdon>(100-newInnRate)){
			document.getElementById('square-'+pos).innerHTML = '<div class="inn"></div>';
		}
	}
}

function generateEnemy(pos){
	var enemyInfo = {
			name:"Mega Enemigo",
			hp:65,
			hp_max:65,
			mp:12,
			mp_max:12,
			lvl:2,
			attack:3,
			defence: 10,
			gold: 10,
			abilities: {},
			drop: [{item: 'huevo_de_gallina', chance: 0.5}, {item: 'huevo_de_oro', chance: 0.0005}]
		};
	var enemyOrientation = Math.floor(Math.random() * 4);
	document.getElementById('square-'+pos).innerHTML = '<div class="enemy spin'+enemyOrientation+'" data-enemy-info="'+encodeURI(JSON.stringify(enemyInfo))+'"></div>';
}

function canGenerate(pos){
	var canGenerateElement = true;
	var squarePos = $('#square-'+pos);
	// no se puede generar en el heroe
	if(pos==13){
		canGenerateElement = false;
	}
	// no se puede generar en una posada
	if(squarePos.find('.inn').length>0){
		canGenerateElement = false;
	}
	// no se puede generar si ya existe un enemigo
	if(squarePos.find('.enemy')>0){
		canGenerateElement = false;
	}
	return canGenerateElement;
}

// recoge el evento click sobre el tablero
function clickOnSquare(){
	// esto devuelve un valor entre el 1 y el 9
	var selectedSquarePosition = parseInt(this.id.slice(-1));
	if(isSquareFree(selectedSquarePosition)){
		blockClickEvent = true;
		// ocultamos todas las acciones que podia hacer
		cleanMessageBoard();
		// almacenamos la casilla que hemos seleccionado
		selectedSquareId = selectedSquarePosition;
		// anadimos las clases que generaran la animacion de los elementos del tablero
		for(var i=1;i<=25;i++){
			document.getElementById('square-'+i).className += ' walkTo'+selectedSquarePosition;
		}
	}
}

function isSquareFree(pos){
	// lo primero, restringir si esta moviendose o quiere ir al medio
	isAllow = (heroPosition!=pos && !blockClickEvent);
	// despues, restringir si a donde quiere ir existe un enemigo
	if(isAllow){
		var upSquare = $('#onSquare-'+pos);
		var downSquare = $('.square[data-x="'+upSquare.data('x')+'"][data-y="'+upSquare.data('y')+'"] .enemy');
		if(downSquare.length>0){
			isAllow = false;
		}
	}
	return isAllow;
}

function regenerateBoard(){
	var selectedSquare = $('#onSquare-'+selectedSquareId);
	var posX = parseInt(selectedSquare.data('x'));
	var posY = parseInt(selectedSquare.data('y'));
	// copiamos las propiedades del div del fondo en la parte de arriba (espejo)
	for(x=-1;x<=1;x++){
		for(y=1;y>=-1;y--){
			var downSquare = $('.square[data-x="'+(x+posX)+'"][data-y="'+(y+posY)+'"]');
			var upSquare = $('.onSquare[data-x="'+x+'"][data-y="'+y+'"]');
			var backgroundImage = downSquare.css('background-image');
			upSquare.css({'background-image': backgroundImage});
			upSquare.html(downSquare.html());
		}
	}
	// regeneramos el tablero entero
	$('.board').html('');
	var addingSquareId = 1;
	for(y=2;y>=-2;y--){
		for(x=-2;x<=2;x++){
			$('.board').append('<div id="square-'+addingSquareId+'"  class="square" data-x="'+x+'" data-y="'+y+'"></div>');
			generate(addingSquareId);
			addingSquareId++;
		}
	}
	// devolvemos las propiedades almacenadas en el tablero de arriba al tablero inferior
	for(x=-1;x<=1;x++){
		for(y=1;y>=-1;y--){
			var downSquare = $('.square[data-x="'+x+'"][data-y="'+y+'"]');
			var upSquare = $('.onSquare[data-x="'+x+'"][data-y="'+y+'"]');
			var backgroundImage = upSquare.css('background-image');
			downSquare.css({'background-image': backgroundImage});
			downSquare.html(upSquare.html());
			upSquare.css({'background-image': 'none'});
			if(x==0 && y==0){
				upSquare.html('<div class="hero"></div>');
			} else {
				upSquare.html('');
			}
		}
	}
	// ya podemos volver a lanzar los eventos de click
	blockClickEvent = false;
}

function analizeSquare(){
	// Analizamos si estamos en una posada (inn.js)
	var showingPanel = analizeInn();
	// Analizamos si algun enemigo nos esta mirando (enemy.js)
	if(!showingPanel){
		showingPanel = analizeEnemy();
	}
}

function cleanMessageBoard(){
	$('.combat-panel').css({'display':'none'});
	$('.inn-panel').css({'display':'none'});
	$('.new-main-inn').css({'display':'none'});
}

function saveInn(){
	localStorage.setItem('innCoords', JSON.stringify(innCoords));
}

function updateInn(){
	var selectedSquare = $('#onSquare-'+selectedSquareId);
	var posX = parseInt(selectedSquare.data('x'));
	var posY = parseInt(selectedSquare.data('y'));
	innCoords[0] = innCoords[0]-posX;
	innCoords[1] = innCoords[1]-posY;
}

function whereIsInn(){
	$('#innCoords').html(JSON.stringify(innCoords));
}

// Analizamos si estamos en una posada
function analizeInn(){
	// recogemos el cuadrado central
	var centerSquare = $('#square-13');
	if(centerSquare.find('.inn').length>0){
		$('.inn-panel').css({'display':'inherit'});
		if(innCoords[0]==0 && innCoords[1]==0){
			$('.new-main-inn').css({'display':'none'});
		} else {
			$('.new-main-inn').css({'display':'inherit'});
		}
		return true;
	}
	return false;
}

function makeMainInn(){
	innCoords[0] = 0;
	innCoords[1] = 0;
	saveInn();
	whereIsInn();
	analizeInn();
}

function analizeEnemy(){
	var leftEnemy = $('.square[data-x="-1"][data-y="0"] .enemy'); //spin2
	var topEnemy = $('.square[data-x="0"][data-y="1"] .enemy'); //spin3
	var rightEnemy = $('.square[data-x="1"][data-y="0"] .enemy'); //spin0
	var bottomEnemy = $('.square[data-x="0"][data-y="-1"] .enemy'); //spin1
	if(leftEnemy.hasClass('spin2')){
		$('.combat-panel').css({'display':'inherit'});
		return true;
	} else if (topEnemy.hasClass('spin3')) {
		$('.combat-panel').css({'display':'inherit'});
		return true;
	} else if (rightEnemy.hasClass('spin0')) {
		$('.combat-panel').css({'display':'inherit'});
		return true;
	} else if (bottomEnemy.hasClass('spin1')) {
		$('.combat-panel').css({'display':'inherit'});
		return true;
	}
	return false;
}

startApp();