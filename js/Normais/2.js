function trocaPagina() {
    var texto = document.getElementById("texto").value;
        
	if(texto == "Imagem" || texto == "imagem") {
        //redirecionar
        window.location.href = "imagini3.html";
	}else{
        alert("Tente Novamente!");
    }
}
