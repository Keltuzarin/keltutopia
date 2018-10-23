// eventos
// Si se hace zoom o se cambian las dimensiones de la pantalla
window.addEventListener("resize", calcElementsSize);
// funcion inicial de la aplicacion
function startApp(){
	// primero generar el height de los elementos deseados
	calcElementsSize();
	// generamos los terrenos del board
	loadGame();
	// evento de click de item para ver detalle
	$('.shop .item .pick').on('click', mostrarDetalle);
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
	
	var pickWidth = $('.item .pick').width();
	
	$('.item .pick').css({'height':pickWidth+'px'});
	$('.item').css({'height':pickWidth+'px'});
	
	$('.item .info, .item .button').css({'font-size':pickWidth/4+'px'});
	$('.item .info, .item .button').css({'line-height':pickWidth/4+'px'});
	
	$('.item .info .name').css({'height':(pickWidth/4)*3+'px'});
	$('.item .info .value').css({'height':pickWidth/4+'px'});
	
	$('.item .button').css({'margin-top':(pickWidth/2-$('.item .button').height()/2-3)+'px'});
	
	var navigationHeight = $('.navigation').height();
	var itemListHeight = bodyHeight - navigationHeight;
	$('.items-list').css({'height':itemListHeight+'px'});
	// Asignamos el height deseado a las fuentes
	
	$('.shop .money-gold, .shop .money-silver, .shop .money-copper').css({'background-size':(pickWidth/4)+'px '+(pickWidth/4)+'px'});
	$('.shop .money-gold, .shop .money-silver, .shop .money-copper').css({'padding-right':(pickWidth/4)+'px'});
	
	$('body').css({'font-size':((boardWidth*1/5)/3)+'px'});
	
	// ELEMENTOS DE DETALLE
	var boardWidth = $('.detail-panel').width();
	// Asignamos el height deseado a las fuentes
	$('.detail-panel').css({'font-size':((boardWidth*1/4)/4)+'px'});
	$('.detail-panel').css({'line-height':(((boardWidth*1/4)/4)+2)+'px'});
	$('.detail-panel .money-gold, .detail-panel .money-silver, .detail-panel .money-copper').css({'background-size':((boardWidth*1/4)/4)+'px '+((boardWidth*1/4)/4)+'px'});
	$('.detail-panel .money-gold, .detail-panel .money-silver, .detail-panel .money-copper').css({'padding-right':((boardWidth*1/4)/4)+'px'});
}

function ocultarDetalle(){
	$('.detail-panel').hide();
}

function mostrarDetalle(){
	$('.detail-panel').show();
}

$(".item-detail").on( "click", closeWindow);
$(".item .pick").on( "click", openWindow);

function openWindow(){
	$(".item-detail").show();
}

function closeWindow(){
	$(".item-detail").hide();
}

startApp();