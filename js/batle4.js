// eventos
// Si se hace zoom o se cambian las dimensiones de la pantalla
window.addEventListener("resize", calcElementsSize);

// no podemos generar un height deseado desde CSS, asiq lo hacemos con JS
function calcElementsSize(){
	var bodyHeight = window.innerHeight;
	// partimos del ancho como referencia para obtener cosas "cuadradas"
	var boardWidth = $('.batle-panel').width();
	// Asignamos el height deseado a las fuentes
	$('.life-bar, .mana-bar').css({'height':((boardWidth*1/5)/3)+'px', 'line-height':((boardWidth*1/5)/3)+'px'});
	$('body').css({'font-size':((boardWidth*1/5)/3)+'px'});
	// Asignamos el height a los enemigos
	// Enemigos con lista ampliada
	var pickWidth = $('.enemy-list .enemy-detail .pick').width();
	var skillWidth = $('.enemy-list .enemy-detail .skills .skill').width();
	$('.enemy-list .enemy-detail .name, .combat-log .info-message').css({'font-size':(pickWidth/3)+'px'});
	$('.enemy-list .enemy-detail .name, .combat-log .info-message').css({'line-height':(pickWidth/3)+'px'});
	$('.enemy-list .enemy-detail .skills').css({'height':pickWidth+'px'});
	$('.enemy-list .enemy-detail .skills .skill').css({'height':skillWidth+'px'});
	$('.enemy-list .enemy-detail .info .enemy-life, .enemy-list .enemy-detail .info .enemy-mana, .enemy-list .enemy-detail .pick .level').css({'font-size':(pickWidth/4)+'px'});
	$('.enemy-list .enemy-detail .info .enemy-life, .enemy-list .enemy-detail .info .enemy-mana, .enemy-list .enemy-detail .pick .level').css({'line-height':(pickWidth/4)+'px'});
	$('.enemy-list .enemy-detail .info .enemy-life, .enemy-list .enemy-detail .info .enemy-mana, .enemy-list .enemy-detail .pick .level').css({'height':(pickWidth/4)+'px'});
	// Enemigos con vista reducida
	var enemyNumber = $('.enemy-list-minified .enemy-detail').length;
	// Tenemos que restar la suma del border, padding y margin
	$('.enemy-list-minified .enemy-detail').css({'width': ((boardWidth/enemyNumber)-(8))+'px'});
	var pickWidth = $('.enemy-list-minified .enemy-detail .pick').width();
	var skillWidth = $('.enemy-list-minified .enemy-detail .skills .skill').width();
	$('.enemy-list-minified .enemy-detail .name, .combat-log .info-message').css({'font-size':(pickWidth/3)+'px'});
	$('.enemy-list-minified .enemy-detail .name, .combat-log .info-message').css({'line-height':(pickWidth/3)+'px'});
	$('.enemy-list-minified .enemy-detail .skills').css({'height':pickWidth+'px'});
	$('.enemy-list-minified .enemy-detail .skills .skill').css({'height':skillWidth+'px'});
	$('.enemy-list-minified .enemy-detail .info .enemy-life, .enemy-list-minified .enemy-detail .info .enemy-mana, .enemy-list-minified .enemy-detail .pick .level').css({'font-size':(pickWidth/4)+'px'});
	$('.enemy-list-minified .enemy-detail .info .enemy-life, .enemy-list-minified .enemy-detail .info .enemy-mana, .enemy-list-minified .enemy-detail .pick .level').css({'line-height':(pickWidth/4)+'px'});
	$('.enemy-list-minified .enemy-detail .info .enemy-life, .enemy-list-minified .enemy-detail .info .enemy-mana, .enemy-list-minified .enemy-detail .pick .level').css({'height':(pickWidth/4)+'px'});
	// Log del combate
	$('.combat-log .damage-done').css({'font-size':(pickWidth/4)+'px'});
	$('.combat-log .damage-done').css({'line-height':(pickWidth/4)+'px'});
	$('.combat-log .enemy-pick').css({'height':(pickWidth/2)+'px', 'width': (pickWidth/2)+'px'});
	$('.combat-log .enemy-skill').css({'height':(pickWidth/4)+'px', 'width': (pickWidth/4)+'px'});
	// Otros
	$('.name-bar').css({'line-height':(boardWidth/16)+'px'});
	$('.name-bar').css({'font-size':(boardWidth/16)+'px'});
}

// funcion inicial de la aplicacion
function startApp(){
	// primero generar el height de los elementos deseados
	calcElementsSize();
}

function firstCombatAction(){
	
}

function setCooldown(container, time){
	var eventIsBlock = new String($(container).data('is-block'));
	if(eventIsBlock=="false"){
		// Deshabilitamos el boton de la habilidad para que no podamos entrar hasta que acabe
		$(container).data('is-block','true');
		$(container+" .cooldown").css({"opacity":1});
		$(container+" .cooldown-half-rotator-right").css({
			"transform":"rotate(180deg)",
			"transition":"transform "+(time/2000)+"s",
			"transition-timing-function":"linear"
		});
		
		setTimeout( function(){
			$(container+" .cooldown-half-rotator-left").css({
				"transform":"rotate(180deg)",
				"transition":"transform "+(time/2000)+"s",
				"transition-timing-function":"linear"
			});
			setTimeout( function(){
				$(container+" .cooldown-half-rotator-right").css({
					"transform":"rotate(0deg)",
					"transition":"transform 0s"
				});
				$(container+" .cooldown-half-rotator-left").css({
					"transform":"rotate(0deg)",
					"transition":"transform 0s"
				});
				$(container+" .cooldown").css({"opacity":0});
				// Volvemos a habilitar el boton de la habilidad
				$(container).data('is-block','false');
			}, time/2 );
		}, time/2 );
	}
}

function countDown(container){
	var containerValue = parseInt($(container).html());
	containerValue = containerValue - 10;
	$(container).html(String(containerValue));
}

/*
window.onload = function(){
	$(".cooldown-box").click(function(){						 
		setCooldown(".cooldown-box", 1000);
		// Por si en algun momento quiero adjuntar un contador de tiempo
		$(".cooldown-counter").html("1000");
		var intervalId = setInterval(countDown, 10, ".cooldown-counter");
		setTimeout( function(){ clearInterval(intervalId) }, 1000);
	});
}
*/

startApp();