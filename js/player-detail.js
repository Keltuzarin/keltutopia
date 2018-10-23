// eventos
// Si se hace zoom o se cambian las dimensiones de la pantalla
window.addEventListener("resize", calcPlayerDetailSize);

// se anade el menu de navegacion de la aplicacion
function addPlayerDetails(){
	
	var playerMoney = '<div><span class="money-gold">3</span> <span class="money-silver">43</span> <span class="money-copper">11</span></div>';
	$('.player-detail').append(playerMoney);
}

// no podemos generar un height deseado desde CSS, asiq lo hacemos con JS
function calcPlayerDetailSize(){
	var boardWidth = $('.player-detail').width();
	
	$('.player-detail').css({'line-height':((boardWidth*1/5)/3)+'px'});
	$('.player-detail').css({'font-size':((boardWidth*1/5)/3)+'px'});
	
	$('.player-detail .money-gold, .player-detail .money-silver, .player-detail .money-copper').css({'background-size':((boardWidth*1/5)/3)+'px '+((boardWidth*1/5)/3)+'px'});
	$('.player-detail .money-gold, .player-detail .money-silver, .player-detail .money-copper').css({'padding-right':((boardWidth*1/5)/3)+'px'});
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

addPlayerDetails();
calcPlayerDetailSize();