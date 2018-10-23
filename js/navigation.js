// eventos
// Si se hace zoom o se cambian las dimensiones de la pantalla
window.addEventListener("resize", calcNavegationSize);

// se anade el menu de navegacion de la aplicacion
function addNavegationMenu(){
	$('.navigation').append('<div class="element"><div class="pick inicio">M</div></div>');
	$('.navigation').append('<div class="element"><div class="pick tienda1">I</div></div>');
	$('.navigation').append('<div class="element"><div class="pick tienda2">S</div></div>');
	/*$('.navigation').append('<div class="element"><div class="pick combate1">B1</div></div>');*/
	/*$('.navigation').append('<div class="element"><div class="pick combate2">B2</div></div>');*/
	/*$('.navigation').append('<div class="element"><div class="pick combate3">B3</div></div>');*/
	$('.navigation').append('<div class="element"><div class="pick combate4">B</div></div>');
	/*$('.navigation').append('<div class="element"><div class="pick detail">D</div></div>');*/
	$('.navigation').append('<div class="element"><div class="pick example">X</div></div>');
	$('.navigation').append('<div class="element"><div class="pick example">Y</div></div>');
	
	$('.element .inicio').on('click', goToMap);
	$('.element .tienda1').on('click', goToShop1);
	$('.element .tienda2').on('click', goToShop2);
	$('.element .combate1').on('click', goToBatle1);
	$('.element .combate2').on('click', goToBatle2);
	$('.element .combate3').on('click', goToBatle3);
	$('.element .combate4').on('click', goToBatle4);
	$('.element .detail').on('click', goToDetail);
}

// no podemos generar un height deseado desde CSS, asiq lo hacemos con JS
function calcNavegationSize(){
	// partimos del ancho como referencia para obtener cosas "cuadradas"
	var boardWidth = $('.navigation').width();
	
	$('.element').css({'width':(((boardWidth)/6)-14)+'px'});
	var itemWidth = $('.element').width();
	$('.element').css({'height':itemWidth+'px'});
	$('.element').css({'line-height':itemWidth+'px'});
	$('.element').css({'font-size':((boardWidth*1/5)/3)+'px'});
}

function goToMap(){
	window.location.href = "index.html";
}

function goToShop1(){
	window.location.href = "shop.html";
}

function goToShop2(){
	window.location.href = "shop2.html";
}

function goToBatle1(){
	window.location.href = "batle.html";
}

function goToBatle2(){
	window.location.href = "batle2.html";
}

function goToBatle3(){
	window.location.href = "batle3.html";
}

function goToBatle4(){
	window.location.href = "batle4.html";
}

function goToDetail(){
	window.location.href = "detail.html";
}

addNavegationMenu();
calcNavegationSize();