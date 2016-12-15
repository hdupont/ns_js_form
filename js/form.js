/**
 * -----------
 * @class Form
 * -----------
 * Une Form est un formulaire permettant à l'utilisateur de saisir des données.
 * Une Form est composée d'un ensemble de champs.
 */
nsform.Form = (function() {

	/**
	 * Construit une Form
	 * @property {array} _fields La liste des champs à saisir.
	 * @property {function} _onValidation Le traitement à exécuter lorsque la
	 * validation a été effectuée. Ce traitement prend en argument un booléen
	 * qui indique si la validation s'est bien passée.
	 */
	function Form(fields, onValidation) {
		this._fields = fields;
		this._onValidation = onValidation;
	}
	
	/**
	 * Construit le noeud DOM du formulaire.
	 * @returns {HTMLElement} Le noeud DOM du formulaire.
	 */
	Form.prototype.buildDomNode = function() {
		
		// Construit le bouton.
		function buildButton() {
			var button = document.createElement("button");
			button.innerHTML = "Envoyer";
			button.style.float = "right";
			button.style.backgroundColor = "#4CAF50"; /* Green */
			button.style.border = "none";
			button.style.color = "white";
			button.style.padding = "5px 10px";
			button.style.textAlign = "center";
			button.style.textDecoration = "none";
			button.style.display = "inline-block";
			button.style.fontSize = "16px";
			
			return button;
		}
		
		// Le formulaire est affiché dans un tableau.
		var formNode = document.createElement("table");
		
		// On ajoute les lignes des champs.
		this._fields.forEach(function(field) {
			var fielRow = field.buildDomNode();
			formNode.appendChild(fielRow);			
		});
		
		// On ajoute le bouton.
		var buttonNode =  buildButton();
		var buttonCell = document.createElement("td");
		buttonCell.setAttribute("colspan", 2);
		buttonCell.appendChild(buttonNode);
		var buttonRow = document.createElement("tr");
		buttonRow.appendChild(buttonCell);
		formNode.appendChild(buttonRow);
		
		// On ajoute son écouteur au bouton.
		addButtonListener(buttonNode, this);
		
		return formNode;
	};
	
	/**
	 * Retourne l'ensemble des couples clé/valeur correspondant au champ du
	 * formulaire.
	 * @returns {object} Un contenant l'ensemble des couples clé/valeur.
	 */
	Form.prototype.toKeyValueObject = function() {
		var fieldsData = {};
		this._fields.forEach(function(field) {
			fieldsData[field.getLabel()] = field.getValue(); 		
		});
		
		return fieldsData;
	};

	/**
	 * Vide le formulaire.
	 * @param {object} self Le formulaire.
	 * 
	 */
	function resetForm(self) {
		self._fields.forEach(function(field) {
			field.reset();
		});
	}
	
	/**
	 * Ajoute l'écouteur au bouton de validation.
	 */
	function addButtonListener(button, self) {
		button.addEventListener("click", function() {
			var fields = self._fields;
			var checkOk = true;
			var fieldsOnError = [];
			for (var i = 0; i < fields.length; i++) {
				var currentField = fields[i];
				checkOk &= currentField.check();
				if (! checkOk) {
					console.log("check KO - " + currentField.getLabel() + " : " + currentField.getErrorMessage());
				}
			}
			self._onValidation(checkOk);
			
			if (checkOk) {
				console.log("Form check ok :)");
				resetForm(self);
			}
		});
	}
	
	return Form; 
})();