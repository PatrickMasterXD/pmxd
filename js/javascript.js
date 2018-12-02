var canvas, contexto;
var img;
var cont = 0, ultimoTempo, intervalo = 60;
var centroX, centroY;
var angulo = 0, rotacao;
var ajuste = 20;
var musica, acertou, errou;
var jogo = {
	pause: true,
	vida: 1,
	pontos: 0,
	record: 0
}

var heroi = {
	x: 200,
	y: 0,
	pulo: 0,
	vel: 0,
	grav: 1.2,
	larg: 59,
	alt: 74
}
var exercito = [];

var vilao = {
	centroX: 0,
	centroY: 0,
	timer: 0,
	vel: 45,
	larg: 59,
	alt: 74
}
var chao = {
	x: 0,
	y: 0,
	raio: 300,
	superficie: 0,
	larg: 600,
	alt: 600
}
var satelite = {
	x: 0,
	larg: 163,
	alt: 148
}
var fundo = {
	larg: 600,
	alt: 600,
	x1: -600,
	x: 0
}
function desenhaHeroi(){
	contexto.drawImage(img, (cont*heroi.larg), 76, heroi.larg, heroi.alt, heroi.x, heroi.y, heroi.larg, heroi.alt);
	
}
function atualizaHeroi(){
	heroi.vel += heroi.grav;
	heroi.y += heroi.vel;
	if (heroi.y > chao.superficie){
		heroi.y = chao.superficie;
		heroi.vel = 0;
		heroi.pulo = 0;

	}
}
function moveHeroi(){
	if(heroi.pulo < 2 && jogo.pause != true){
		heroi.pulo++;
		heroi.vel = -16;
	}
	
}
function insereExercito(){
	exercito.push({
		inc: 90,
		x: Math.floor(vilao.centroX + chao.raio * Math.cos(90 / vilao.vel)),
		y: Math.floor(vilao.centroY + chao.raio * Math.sin(90 / vilao.vel))
	});
	vilao.timer = 25 + Math.floor(31 * Math.random());

}
function desenhaVilao(){
	for(i=0; i<exercito.length; i++){
		contexto.drawImage(img, (cont*vilao.larg), 0, vilao.larg, vilao.alt, exercito[i].x, exercito[i].y, vilao.larg, vilao.alt);

	}
	
}
function atualizaVilao(){
	if(vilao.timer == 0){
		insereExercito();
	}else{
		vilao.timer--;
		for(i=0, tam=exercito.length; i<tam; i++){
			exercito[i].x = Math.floor(vilao.centroX + chao.raio * Math.cos(exercito[i].inc / vilao.vel));
			exercito[i].y = Math.floor(vilao.centroY + chao.raio * Math.sin(exercito[i].inc / vilao.vel));
			exercito[i].inc++;
			if(exercito[i].inc >= 380){
				exercito.splice(i, 1);
				tam--;
				i--;
			}else if( (heroi.y == exercito[i].y || (heroi.y + heroi.alt > exercito[i].y + ajuste && heroi.y + heroi.alt <= exercito[i].y + vilao.alt)) && (heroi.x >= exercito[i].x + vilao.larg / 2 - ajuste && heroi.x <= exercito[i].x + vilao.larg - ajuste)){
				heroi.y = 10;
				heroi.vel = 0;
				errou.play();
				jogo.vida--;
				exercito = [];
				break;

			}else if( heroi.y + heroi.alt >= exercito[i].y && heroi.y + heroi.alt <= exercito[i].y + vilao.alt /2 && heroi.x >= exercito[i].x - ajuste && heroi.x <= exercito[i].x + vilao.larg / 2 + ajuste){
				exercito[i].inc = 380;
				heroi.vel = -10;
				acertou.play();
				jogo.pontos++;
				break;
				
			}

		}
	}
}
function desenhaChao(){
	contexto.save();
	contexto.translate(centroX, centroY);
	contexto.rotate(angulo);
	contexto.drawImage(img, 0, 210, chao.larg, chao.alt, -chao.x, -chao.y, chao.larg, chao.alt);
	contexto.restore();
}
function atualizaChao(){
	angulo += rotacao;
}
function desenhaFundo(){
	contexto.drawImage(img, 626, 0, fundo.larg, fundo.alt, fundo.x, 0, fundo.larg, fundo.alt);
	contexto.drawImage(img, 626, 0, fundo.larg, fundo.alt, fundo.x1, 0, fundo.larg, fundo.alt);
	contexto.drawImage(img, 625, 611, satelite.larg, satelite.alt, satelite.x, 120, satelite.larg, satelite.alt);
	fundo.x+=0.3;
	fundo.x1+=0.3;
	satelite.x++;
	if(fundo.x > canvas.width){
		fundo.x = fundo.x1 - fundo.larg;
	}else if(fundo.x1 > canvas.width){
		fundo.x1 = fundo.x - fundo.larg;
	}
	if(satelite.x > canvas.width){
		satelite.x = -600;
	}
}
function atualizaQuadro(){
	var agora = new Date().getTime(); // retorna a data em milisegundos

	// verifica se o ultimo tempo nao foi medido
	if(!ultimoTempo){
		ultimoTempo = agora;
	}

	// verifica se a diferença entre os tempos eh menor que 60
	// caso seja menor sai da funçao
	if(agora - ultimoTempo < intervalo){
		return;
	}

	//caso contrario incrementa a variavel cont
	if(cont<9){
		cont++;
	}else{
		cont = 0;
	}
	ultimoTempo = agora;
}
function desenhaPlacar(){
	contexto.save();
	contexto.fillStyle = "white";
	contexto.font = "15px Bernard MT Condensed";
	contexto.fillText("Pontos: " + jogo.pontos, 60, 25);
	contexto.fillText("Continues:", 160, 25);
	contexto.restore();
	for(i=0; i < jogo.vida; i++){
		contexto.drawImage(img, 833, 625, 60, 65, 235 + (20 * i), 5, 20, 25);
	}
}
function pausaJogo(){
	if(jogo.pause != true){
		cancelAnimationFrame(jogo.pause);
		jogo.pause = true;
		mucia.pause();
	}else{
		musica.play();
		gameLoop();
	}
}
function desenhaRecord(){
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	contexto.drawImage(img, 931, 625, 295, 297, x - 147, y - 143, 295, 297);
	if (jogo.pontos > jogo.record){
		jogo.record = jogo.pontos;
		window.localStorage.setItem("record", jogo.record);
	}
	contexto.save();
	contexto.fillStyle = "white";
	contexto.font = "24px Bernard MT Condensed";
	contexto.fillText(jogo.pontos, x - 100, y - 10);
	contexto.fillStyle = "red";
	contexto.fillText(jogo.record, x + 80, y - 10);
	contexto.restore();
	$("#reinicio").show();
}
function reiniciarJogo(){
	if (jogo.pause != true){
		jogo.vida = 1;
		jogo.pontos = 0;
		heroi.pulo = 2;
		$("#reinicio").hide();
	}
}
function gameLoop(){
	atualizaQuadro();
	desenhaFundo();
	desenhaChao();
	desenhaPlacar();
	atualizaChao();
	if(jogo.vida > 0){
		desenhaVilao();
		desenhaHeroi();		
		atualizaHeroi();
		atualizaVilao();
	}else{
		desenhaRecord();
	}

	jogo.pause = requestAnimationFrame(gameLoop);
}


function iniciar(){
	canvas = document.getElementById("meuCanvas");
	contexto = canvas.getContext("2d");
	//verifica a largura da janela
	if(window.innerWidth < 400){
		canvas.width = window.innerWidth;
		$("#reinicio").css("left", canvas.width/2 - 17);
		$("#fundo").css("width", canvas.width);
		$("#capa").css("width", canvas.width);
	}
	//verifica a altura da janela
	if(window.innerHeight < 600){
		canvas.height = window.innerHeight;
		$("#reinicio").css("top", canvas.height/2 + 40);
		$("#fundo").css("height", canvas.height);
		$("#capa").css("height", canvas.height);
	}
	musica = document.getElementById("musica");
	acertou = document.getElementById("som1");
	errou = document.getElementById("som2");
	
	$("#texto").hide();
	$("#ajuda").click(function(event){
		$("#texto").toggle("slow");
	});
	$("#meuCanvas").click(moveHeroi);
	$("#pause").click(pausaJogo);
	$("#reinicio").hide();
	$("#reinicio").click(reiniciarJogo);
	jogo.record = window.localStorage.getItem('record');
	if(jogo.record == null){
		jogo.record = 0;
	}
	
	img = new Image();
	img.src = "imagens/spritesheet.png";
	centroX = canvas.width / 2;
	centroY = canvas.height + chao.raio / 2;
	chao.x = chao.larg / 2;
	chao.y = chao.alt / 2;
	chao.superficie = (canvas.height - chao.raio / 2) - (heroi.alt - heroi.alt / 4);
	rotacao = 1.3 * Math.PI / 180;
	heroi.x = centroX;
	vilao.centroX = centroX - (vilao.larg - vilao.larg / 4);
	vilao.centroY = centroY - (vilao.alt - vilao.alt / 4);
	$("#inicio").click(function(){
		$("#inicio").hide();
		$("#capa").hide();
		musica.play();
		gameLoop();
	});
	
	
}

window.addEventListener('load', iniciar, false);