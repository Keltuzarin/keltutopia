// eventos
// Si se hace zoom o se cambian las dimensiones de la pantalla
window.addEventListener("resize", calcElementsSize);

// no podemos generar un height deseado desde CSS, asiq lo hacemos con JS
function calcElementsSize(){
	
	var bodyHeight = window.innerHeight;
	// partimos del ancho como referencia para obtener cosas "cuadradas"
	var boardWidth = $('.detail-panel').width();
	// Asignamos el height deseado a las fuentes
	$('.detail-panel').css({'font-size':((boardWidth*1/4)/4)+'px'});
	$('.detail-panel').css({'line-height':(((boardWidth*1/4)/4)+2)+'px'});
	$('.money-gold, .money-silver, .money-copper').css({'background-size':((boardWidth*1/5)/3)+'px '+((boardWidth*1/5)/3)+'px'});
	$('.money-gold, .money-silver, .money-copper').css({'padding-right':((boardWidth*1/5)/3)+'px'});
}

// funcion inicial de la aplicacion
function startApp(){
	// primero generar el height de los elementos deseados
	calcElementsSize();
}

function ocultarDetalle(){
	$('.detail-panel').hide();
}

startApp();