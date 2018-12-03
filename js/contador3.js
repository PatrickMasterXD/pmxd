var cont=new Number();
var cont=1180;
var min=20;
var seg=1;
function start(){
	if((cont - 1) >= 0){
		cont = cont - 1;
		seg = seg - 1;
		setTimeout('start();',1000);
		if(cont == 0){
			alert("O tempo acabou comece do primeiro desafio!");
			window.location.href = "philosophus1.html";
		}
		if(seg == 0){
			min--;
		}if(seg == 0){
			seg = seg + 59;
		}
		tempo.innerText = "Tente antes do tempo acabar!\n" + min + " : " + seg;
	}
}