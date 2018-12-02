function trocaPagina() {
    var texto = document.getElementById("texto").value;
        
	if(texto == "Game over" || texto == "game over") {
        //redirecionar
        window.location.href = "sobre.html";
	}else{
        alert("Tente Novamente!");
    }
}