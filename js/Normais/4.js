function trocaPagina() {
    var texto = document.getElementById("texto").value;
        
	if(texto == "Espectro" || texto == "espectro") {
        //redirecionar
        window.location.href = "5.html";
	}else{
        alert("Tente Novamente!");
    }
}
