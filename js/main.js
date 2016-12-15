/**
 * On ajoute au DOM un formulaire permettant à l'utilisateur de saisir des
 * informations. Si elles sont valide les informations du formulaire sont
 * ensuite affiché à coté du formulaire.
 */
(function(Form, Field) {
	
	/**
	 * Ajoute le formulaire au DOM
	 * @param {array} fields L'ensemble des formulaires que contiendra le
	 * formulaire.
	 */
	function addFormToDom(fields) {
		var form = new Form(fields, function() {
			var keyValueObject = form.toKeyValueObject(); 
			console.log(keyValueObject);
			displayKeyValueObject(keyValueObject);
		});
		var formNode = form.buildDomNode();
		
		var formContainer = document.getElementById("form");
		formContainer.appendChild(formNode);	
	}
	
	/**
	 * Affiche les couples clé/valeur contenus dans le formulaire quand il a
	 * été validé.
	 * @param {object} keyValueObject L'objet contenant les couples clé/valeur.
	 */
	function displayKeyValueObject(keyValueObject) {
		
		var table = document.createElement("table");
		
		for(var prop in keyValueObject) {
			var row = document.createElement("tr");
			
			var keyCell = document.createElement("td");
			keyCell.innerHTML = prop;
			row.appendChild(keyCell);
			
			var valueCell = document.createElement("td");
			valueCell.innerHTML = keyValueObject[prop];
			row.appendChild(valueCell);
			
			table.appendChild(row)
		}
		
		var display = document.getElementById("display");
		display.innerHTML = "";
		display.appendChild(table);
	}
	
	/**
	 * Supprime l'affichage des couples clé/valeur affichés  par
	 * displayKeyValueObject
	 */
	function clearKeyValueObjectDisplay() {
		var display = document.getElementById("display");
		display.innerHTML = "";
	}
	
	var fields = [
          new Field("nom"),
          new Field("prenom"),
          new Field("email", "email")
	];
	
	addFormToDom(fields);
	
})(nsform.Form, nsform.Field);