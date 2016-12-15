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
	function addFormToDom(fields, formId, displayId) {
		var form = new Form(fields, function(validationOk) {
			// Dans tous les cas on vide la zone d'affichage.
			clearKeyValueObjectDisplay(displayId);
			
			// Si tout s'est bien passé on affiche les clés/valeurs.
			if (validationOk) {
				var keyValueObject = form.toKeyValueObject(); 
				console.log(keyValueObject);
				displayKeyValueObject(keyValueObject, displayId);	
			}
		});
		var formNode = form.buildDomNode();
		
		var formContainer = document.getElementById(formId);
		formContainer.appendChild(formNode);	
	}
	
	/**
	 * Affiche les couples clé/valeur contenus dans le formulaire quand il a
	 * été validé.
	 * @param {object} keyValueObject L'objet contenant les couples clé/valeur.
	 */
	function displayKeyValueObject(keyValueObject, displayId) {
		
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
		
		var display = document.getElementById(displayId);
		display.innerHTML = "";
		display.appendChild(table);
	}
	
	/**
	 * Supprime l'affichage des couples clé/valeur affichés  par
	 * displayKeyValueObject
	 */
	function clearKeyValueObjectDisplay(displayId) {
		var display = document.getElementById(displayId);
		display.innerHTML = "";
	}
	
	/**
	 * Les champs gérés par le formulaire. 
	 */
	var fieldsFr = [
          new Field("nom"),
          new Field("prenom"),
          new Field("email", "email")
	];
	
	var fieldsEn = [
        new Field("last name"),
        new Field("first name"),
        new Field("email", "email")
	];

	addFormToDom(fieldsFr, "formfr", "displayfr");
	addFormToDom(fieldsEn, "formen", "displayen");
	
})(nsform.Form, nsform.Field);