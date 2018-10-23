// eventos
// Si se hace zoom o se cambian las dimensiones de la pantalla
window.addEventListener("resize", calcElementsSize);

// funcion inicial de la aplicacion
function startApp(){
	// funcion auxiliar para anadir items random a la tienda
	addItems();
	// generamos los terrenos del board
	loadGame();
	// Por ultimo, generar el height de los elementos deseados
	calcElementsSize();
	// Evento para cuando se selecciona un elemento
	$('.item .pick').on('click', showItemDetail);
}

function addItems(){
	$('.shop').append('<div class="items"></div>');
	for(var x=0;x<24;x++){
		$('.items').append('<div class="item"><div class="pick"></div></div>');
	}
}

function loadGame(){
	// inicialmente obtenemos los datos de la tienda
	
	// cuando carga el juego, hace un guardado, por si se ha tenido que generar algun nuevo elemento
	saveGame();
}

function saveGame(){
	//localStorage.setItem('boardHTML', $('.board').html());
}

// no podemos generar un height deseado desde CSS, asiq lo hacemos con JS
function calcElementsSize(){
	var bodyHeight = window.innerHeight;
	// partimos del ancho como referencia para obtener cosas "cuadradas"
	var boardWidth = $('.shop').width();
	
	$('.item').css({'width':(((boardWidth-10)/6)-14)+'px'});
	var itemWidth = $('.item').width();
	$('.item').css({'height':itemWidth+'px'});
	// Asignamos el height deseado a las fuentes
	$('.item-detail, .sell-panel').css({'font-size':((boardWidth*1/4)/4)+'px'});
	$('.item-detail, .sell-panel').css({'line-height':(((boardWidth*1/4)/4)+2)+'px'});
	$('.item-detail .money-gold, .item-detail .money-silver, .item-detail .money-copper').css({'background-size':((boardWidth*1/4)/4)+'px '+((boardWidth*1/4)/4)+'px'});
	$('.item-detail .money-gold, .item-detail .money-silver, .item-detail .money-copper').css({'padding-right':((boardWidth*1/4)/4)+'px'});
	$('.sell-panel .money-gold, .sell-panel .money-silver, .sell-panel .money-copper').css({'background-size':((boardWidth*1/4)/4)+'px '+((boardWidth*1/4)/4)+'px'});
	$('.sell-panel .money-gold, .sell-panel .money-silver, .sell-panel .money-copper').css({'padding-right':((boardWidth*1/4)/4)+'px'});
	
	
	// Calcular tamaños de los div siempre lo ultimo
	var navigationHeight = $('.navigation').height();
	var playerDetailHeight = $('.player-detail').height();
	var shopHeight = $('.shop').height();
	
	$('.next, .prev').css({'height':((boardWidth*1/4)/4)+'px', 'width':((boardWidth*1/4)/4)+'px'});
	var sellPanelHeight = $('.sell-panel').height();
	
	
	
	
	// Tambien tengo que restar los margin y padding de estos elementos
	var inventoryHeight = bodyHeight - navigationHeight - playerDetailHeight - shopHeight - sellPanelHeight - (1*2+3*2+1*2+1*2+3*2-1*2-1*2) - 14;
	$('.item-detail').css({'height':inventoryHeight+'px'});
}

function showItemDetail(){
	
}

startApp();