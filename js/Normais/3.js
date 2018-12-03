function trocaPagina() {
    var texto = document.getElementById("texto").value;
        
	if(texto == "Sons" || texto == "sons") {
        //redirecionar
        window.location.href = "sonos4.html";
	}else{
        alert("Tente Novamente!");
    }
}
