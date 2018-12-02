function trocaPagina() {
    var texto = document.getElementById("texto").value;
      
	
	if(texto == "Só sei que nada sei" || texto == "só sei que nada sei") {
        //redirecionar
        window.location.href = "2.html";
	}else{
        alert("Tente Novamente!");
		document.getElementById("img").src="img/erro.gif";  
    } 
}