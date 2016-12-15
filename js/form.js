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
	 * @property {function} _onValidationOk Le traitement à exécuter lorsque la
	 * validation a été effectuée.
	 * @property {HTMLElement} _errorCell La zone d'affichage des erreurs.
	 */
	function Form(fields, onValidationOk) {
		this._fields = fields;
		this._errorCell = null;
		this._onValidationOk = onValidationOk;
	}
	
	/**
	 * Construit le noeud DOM du formulaire.
	 * @returns {HTMLElement} Le noeud DOM du formulaire.
	 */
	Form.prototype.buildDomNode = function() {
		// Le formulaire est affiché dans un tableau.
		var formNode = document.createElement("table");
		
		// On ajoute la zone d'affichage des erreurs.
		var errorRow = document.createElement("tr");
		this._errorCell = document.createElement("td");
		this._errorCell.setAttribute("colspan", 2);
		this._errorCell.style.backgroundColor = "red";
		this._errorCell.style.display = "none";
		errorRow.appendChild(this._errorCell);
		errorRow.setAttribute("kind", "errorrow");
		formNode.appendChild(errorRow);
		
		// On ajoute les lignes des champs.
		this._fields.forEach(function(field) {
			var fielRow = field.buildDomNode();
			formNode.appendChild(fielRow);			
		});
		
		// On ajoute le bouton.
		var buttonRow = document.createElement("tr");
		var buttonNode = document.createElement("button");
		buttonNode.innerHTML = "Envoyer";
		buttonRow.appendChild(buttonNode);
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
	 * Affiche les messages d'erreurs des champs en erreurs.
	 * @param {object} self Le formulaire.
	 * @param {array} fieldsOnError La liste des champs en erreurs. 
	 */
	function setAndShowErrorMessage(self, fieldsOnError) {
		var errorsContainer = document.createElement("div");
		fieldsOnError.forEach(function(field) {
			var errorNode = document.createElement("div");
			errorNode.innerHTML = "Le champ \"" + field.getLabel() + "\" est en erreur : " + field.getErrorMessage();
			errorsContainer.appendChild(errorNode);
		});
		
		self._errorCell.appendChild(errorsContainer);
		// On rend la zone d'affichage des erreurs visible.
		self._errorCell.style.display = "";
	}

	/**
	 * Vide la zone d'affichage des erreurs.
	 * @param {object} self Le formulaire.
	 */
	function resetAndHideErrorMessage(self) {
		self._errorCell.innerHTML = "";
		self._errorCell.style.display = "none";
	}

	/**
	 * Vide le formulaire.
	 * @param {object} self Le formulaire.
	 * 
	 */
	function resetForm(self) {
		self._fields.forEach(function(field) {
			field.emptyFieldInput();
		});
	}
	
	/**
	 * Ajoute l'écouteur au bouton de validation.
	 */
	function addButtonListener(button, self) {
		button.addEventListener("click", function() {
			resetAndHideErrorMessage(self);
			
			var fields = self._fields;
			var checkOk = true;
			var fieldsOnError = [];
			for (var i = 0; i < fields.length; i++) {
				var currentField = fields[i];
				checkOk &= currentField.check();
				if (! checkOk) {
					fieldsOnError.push(currentField);
				}
			} 
			if (fieldsOnError.length > 0) { 
				setAndShowErrorMessage(self, fieldsOnError);
			}
			else {
				console.log("Form check ok :)");
				self._onValidationOk();
				resetForm(self);
			}
			
		});
	}
	
	return Form; 
})();