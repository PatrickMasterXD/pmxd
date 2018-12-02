function trocaPagina() {
    var texto = document.getElementById("texto").value;
        
	if(texto == "saitama" || texto == "Saitama") {
        //redirecionar
        window.location.href = "mylife.html";
	}else{
        alert("Tente Novamente!");
    }
}
