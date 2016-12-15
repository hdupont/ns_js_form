/**
 * On ajoute au DOM un formulaire permettant à l'utilisateur de saisir des
 * informations. Si elles sont valides les informations du formulaire sont
 * affichées sous forme clé/valeur.
 * 
 * NOTE L'appli gère automatiquement l'ajout de nouveaux champs. Il suffit
 * des les ajouter au tableau de champs fields.
 */
(function(Form, Field) {
	
	/**
	 * Ajoute le formulaire au DOM
	 * @param {array} fields L'ensemble des formulaires que contiendra le
	 * formulaire.
	 */
	function addFormToDom(fields) {
		var form = new Form(fields, function(validationOk) {
			// Dans tous les cas on vide la zone d'affichage.
			clearKeyValueObjectDisplay();
			
			// Si tout s'est bien passé on affiche les clés/valeurs.
			if (validationOk) {
				var keyValueObject = form.toKeyValueObject(); 
				console.log(keyValueObject);
				displayKeyValueObject(keyValueObject);	
			}
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
	
	/**
	 * Les champs gérés par le formulaire. 
	 */
	var fields = [
          new Field("nom"),
          new Field("prenom"),
          new Field("email", "email")
	];
	
	addFormToDom(fields);
	
})(nsform.Form, nsform.Field);