
function carregaIndex (){


	var objJson = 
 	  	{
   			token: "1170706277ae0af0486017711353ee73",
			collection : "index"
 	  	};
 	   rest_remover (objJson, carregaIndexProcesso, semAcao); 	   
};

function carregaIndexProcesso (){
	
	
	console.log ("iniciou cria index");
 
	carregaIndexElemento(rest_listaReturn ("habilidades"),"habilidades" );
    $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);
	
	carregaIndexElemento(rest_listaReturn ("objetivos"), "objetivos");
    $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);

    carregaIndexElemento(rest_listaReturn ("badges"), "badges");
    $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);

    carregaIndexElemento(rest_listaReturn ("cursos"), "cursos");
    $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);

    carregaIndexElemento(rest_listaReturn ("areaAtuacao"), "areaAtuacao");
    $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);

    carregaIndexElemento(rest_listaReturn ("areaConhecimento"), "areaConhecimento");
    $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);

    carregaIndexElemento(rest_listaReturn ("usuarios"), "usuarios");
    $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);
	
	console.log ("terminou cria index");
	
	sessionStorage.setItem("rotina", "atualizaCursosHabilidadeMsg");  	
}; 

function carregaIndexElemento(data, assunto){

	sessionStorage.setItem("index", 1);
    sessionStorage.setItem("totalRecords", data.length);
	
	$.each(data, function (i, index) {
		sessionStorage.setItem("index", i);
		var texto = "";
		if (index){
			var entidade = "";
			var id = "";
			var descricao = "";
			if (index){
				if (index.name){
					texto  = texto + carregaTextoIndex (index.name);
					entidade = index.name;
					id = index.idHabilidade;
					descricao = index.descricao;
				};
				if (index.firstName){
					texto  = texto + carregaTextoIndex (index.firstName);
					entidade = index.firstName;
					id = index._id;
					descricao = index.firstName + " " + index.lastName
				};
				if (index.lastName){
					texto  = texto + "," + carregaTextoIndex (index.lastName);
					entidade = index.lastName;
					id = index._id;
					descricao = index.firstName + " " + index.lastName
				};
				if (index.nome){
					texto  = texto + carregaTextoIndex (index.nome);
					entidade = index.nome;
					id = index.idHabilidade;
				};
				if (index.idCurso){
					id = index.idCurso;
				};
				if (index.id){
					id = index.id;
				};
				if (index.descricao) {
					texto  = texto + "," + carregaTextoIndex (index.descricao);
					descricao = index.descricao;
				};
				if (index.tags){
					$.each(index.tags, function (i, tag) {
						texto  = texto + "," + carregaTextoIndex (tag);
					});
				};
			};
		};
		if (texto != ""){
			var textoArray = texto.split(",");
			
			var objJson = 
				{
					token: "1170706277ae0af0486017711353ee73",
					collection : "index",
					insert :
						{
						documento : 
							{
							texto : textoArray,
							assunto : assunto,
							entidade : entidade,
							id : id,
							descricao : descricao				
							}
						}
				};
			
			rest_incluir (objJson, restOk, semAcao);
		  	i = sessionStorage.getItem("index");
		  	totalRecords = sessionStorage.getItem("totalRecords");
			var percentLoaded = Math.round((i / totalRecords) * 100);
			if (percentLoaded < 100) {
			     progress.style.width = percentLoaded + '%';
			     progress.textContent = percentLoaded + '%';
			};
		    $('.progress-bar').css('width', percentLoaded + '%').attr('aria-valuenow', percentLoaded);
		};
	});
	
};

function carregaTextoIndex (texto){
	if (texto){
		texto = texto.toLowerCase();
		texto = limpaTexto (texto);
		var textoArray = texto.split(" ");
		return textoArray;
	};
	
	return "";
};

function limpaTexto (texto){
	if (texto){
		var i = 0;
		var textoOut = "";
		while (i < texto.length) {
			var char = texto.substring(i, i + 1);
			switch(char) {
			case "ã":
		        char = "a"
		        break;
			case "á":
		        char = "a"
		        break;
			case "à":
		        char = "a"
		        break;
			case "â":
		        char = "a"
		        break;
		    case "é":
		    	char = "e"
		        break;
		    case "ê":
		    	char = "e"
		        break;
		    case "í":
		    	char = "i"
		        break;
		    case "ô":
		    	char = "o"
		        break;
		    case "õ":
		    	char = "o"
		        break;
		    case "ô":
		    	char = "o"
		        break;
		    case "ó":
		    	char = "o"
		        break;
		    case "ú":
		    	char = "u"
		        break;
		    case "ç":
		    	char = "c"
		        break;
		    case "(":
		    	char = ""
		        break;
		    case ")":
		    	char = ""
		        break;
		    case "-":
		    	char = ""
		        break;
		    case "  ":
		    	char = " "
		        break;
		    default:
		    	break;
			}			
			textoOut = textoOut + char;
			++i;
		};
		return textoOut;
	};
	
	return "";
		
};
