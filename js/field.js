/**
 * ------------
 * @class Field
 * ------------
 * Un field est un champ d'un formulaire.
 * Il possède  un libellé et une input.
 * Il sait produire sa représentation HTML.
 */
nsform.Field = (function() {

	function Field(name, type) {
		this._name = name;
		this._type = type;
		this._input = null;
		this._errorMessage = "";
	}
	
	/**
	 * Construit la ligne de formulaire du champ.
	 * Le libellé apparait devant l'input.
	 */
	Field.prototype.buildDomNode = function() {
		
		function buildLabelNode(name) {
			var labelNode = document.createElement("span");
			labelNode.innerHTML = name;
			return labelNode;
		}
		
		function buildInputNode() {
			var inputNode = document.createElement("input");
			inputNode.setAttribute("type", "text");
			return inputNode;
		}
		
		var fieldRow = document.createElement("tr");
		
		var labelCell = document.createElement("td");
		labelCell.appendChild(buildLabelNode(this._name));
		fieldRow.appendChild(labelCell);
		
		var inputCell = document.createElement("td");
		this._input = buildInputNode();
		inputCell.appendChild(this._input);
		fieldRow.appendChild(inputCell);
		
		return fieldRow;
	};
	
	/**
	 * Retourne le libellé du champ.
	 * @returns {string} Le libellé du champ.
	 */
	Field.prototype.getLabel = function() {
		return this._name;
	};

	/**
	 * Retourne la valeur du champ lu dans le DOM.
	 * @returns {string} La valeur du champ lu dans le DOM.
	 */
	Field.prototype.getValue = function() {
		return getInputTrimmedValue(this);
	};
	
	/**
	 * Retourne le message d'erreur du champ si le champ est en erreur.
	 * @returns {string} Le message d'erreur du champ.
	 */
	Field.prototype.getErrorMessage = function() {
		return this._errorMessage;
	};
	
	/**
	 * Vide l'input du champ dans le DOM.
	 */
	Field.prototype.emptyFieldInput = function() {
		this._input.value = "";
	};
	
	/**
	 * Vérifie si la valeur du champ est valide.
	 * @returns {boolean} true si la valeur du champ est valide, false sinon.
	 */
	Field.prototype.check = function() {
		var checkOk = checkNotEmpty(this);
		if (! checkOk) {
			setError(this, "Champ vide");
			return false;
		}
		
		if (this._type === "email") {
			checkOk &= checkIfEmail(this);
		}
		
		if (! checkOk) {
			setError(this, "Format d'email incorrect");
			return false;
		}
		
		return checkOk;
	};
	
	/**
	 * Vérifie que le champ n'est pas vide.
	 * @param {object} self Le champ.
	 * @returns {boolean} true si le champ n'est pas vide, false sinon.
	 */
	function checkNotEmpty(self) {
		return getInputTrimmedValue(self) !== "";
	}
	
	
	/**
	 * Vérifie si le champ contient un email valide.
	 * @returns {boolean} true si le champ contient un email valide, false sinon.
	 */
	function checkIfEmail(self) {
		var val = getInputTrimmedValue(self);
		if (val.indexOf("@") === -1) {
			return false;
		}
		
		return true;
	}

	/**
	 * Retourne la valeur du champ débarrassé des espaces au début et à la fin.
	 * @returns {string} La valeur du champ débarrassé des espaces au début et à la fin
	 */
	function getInputTrimmedValue(self) {	
		var val = self._input.value;
		var trimmedVal = val.trim();
		
		return trimmedVal;
	}
	
	/**
	 * Renseigne le message d'erreur.
	 * @param {object} self Le champ.
	 * @param {string} message Le message d'erreur. 
	 */
	function setError(self, message) {
		self._errorMessage = message;
	}
	
	return Field; 
})();