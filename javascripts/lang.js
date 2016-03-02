window['LITERALS'] = {
	'en-US' : {
		url: 'thank-you/',
		messages:{
			"user[first_name]"  : {
				required: "First name field is required"
			},
			"user[last_name]"  : {
				required: "Last name field is required"
			},
			"account[name]"  : {
				required: "You'll need to tell us where you work",
				minlength: "Company name should exceed 2 characters"
			},
			"account[domain]": {
				required: "Give your helpdesk a name",
				maxlength: "Helpdesk name shouldn't exceed 25 characters",
				subdomain:"Only letters, numbers and hyphen allowed"
			},
			"user[email]":{
				required: "Please enter a valid email",
				email:"Please enter a valid email"
			}
		},
		already_exists: 'This Helpdesk already exists',
		email_like:'This Helpdesk already exists',
		thankyoumsg:["Setting up your self service portal", 
					"Cranking up your knowledge base",
					"Configuring your Community Platform", "_redirect"]
	},
	'pt-BR' : {
		url: 'thank-you/',
		messages:{
			"account[name]"  : {
				required: "Você precisa nos dizer onde trabalha",
				minlength: "O nome da empresa deve ser superior a 2 caracteres"
			},
			"account[domain]": {
				required: "Dê um nome ao seu apoio técnico",
				maxlength: "O nome do apoio técnico não deve ser superior a 25 caracteres",
				subdomain:"Apenas letras, números e &#39;-&#39; são permitidos"
			},
			"user[email]":{
				required: "Informe um endereço de e-mail válido",
				email: "O e-mail deve ter a forma de um endereço de e-mail"
			}
		},
		already_exists: 'Esse apoio técnico já existe',
		email_like:"O e-mail deve ter a forma de um endereço de e-mail",
		thankyoumsg:["Configurar o seu portal de auto-atendimento", 
					"Acionando sua base de conhecimento",
					"Configurando sua Plataforma Comunidade", "_redirect"]
	},
	'de-DE' : {
		url: 'thank-you/',
		messages:{
			"account[name]"  : {
				required: "Sie müssen uns sagen, wo Sie arbeiten ",
				minlength: "Der Firmenname sollte mehr als 2 Zeichen haben "
			},
			"account[domain]": {
				required: "Geben Sie Ihrem Helpdesk einen Namen",
				maxlength: "Der Helpdesk-Name sollte nicht mehr als 25 Zeichen haben",
				subdomain:"Nur Buchstaben, Zahlen und '-' erlaubt"
			},
			"user[email]":{
				required: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
				email: "Die E-Mail sollte wie eine E-Mail-Adresse aussehen"
			}
		},
		already_exists: 'Dieser Helpdesk existiert bereits',
		email_like:'Die E-Mail sollte wie eine E-Mail-Adresse aussehen',
		thankyoumsg:["Einrichten Ihres Self-Service-Portal", 
					"Kurbelt Ihre Wissensbasis",
					"Konfigurieren Sie Ihre Community-Plattform", "_redirect"]
	},
	'es' : {
		url: 'thank-you/',
		messages:{
			"account[name]"  : {
				required: "Necesitará indicar dónde trabaja",
				minlength: "El nombre de la empresa debe tener al menos dos caracteres"
			},
			"account[domain]": {
				required: "Facilite el nombre de su equipo de asistencia técnica",
				maxlength: "El nombre del departamento técnico no debe exceder de 25 caracteres",
				subdomain:"Sólo se permiten letras, números y &#45;"
			},
			"user[email]":{
				required: "Por favor, introduzca una dirección de correo electrónico válida",
				email: "Por favor, introduzca una dirección de correo electrónico válida"
			}
		},
		already_exists: 'Este nombre de departamento técnico ya existe',
		email_like:'El correo electrónico debe completarse como una dirección de correo electrónico normal',
		thankyoumsg:["Configuración del portal de autoservicio", 
					"Poniendo encima de su base de conocimientos",
					"Configuración de la Plataforma Comunitaria", "_redirect"]
	},
	'fr' : {
		url: 'thank-you/',
		messages:{
			"account[name]"  : {
				required: "Vous devez nous dire où vous travaillez",
				minlength: "Le nom de la société doit faire plus de deux caractères"
			},
			"account[domain]": {
				required: "Donnez un nom à votre service d'assistance",
				maxlength: "Le nom du service d'assistance ne doit pas dépasser 25 caractères",
				subdomain:"Seuls sont autorisés les lettres, les nombres et « - »"
			},
			"user[email]":{
				required: "Veuillez entrer une adresse e-mail valide",
				email: "L&#39;adresse e-mail doit ressembler à une adresse e-mail"
			}
		},
		already_exists: 'Ce service d&#39;assistance existe déjà',
		email_like:'L&#39;adresse e-mail doit ressembler à une adresse e-mail',
		thankyoumsg:["Configuration de votre portail en self-service", 
					"Démarrage de votre base de connaissances",
					"Configuration de votre plate-forme communautaire", "_redirect"]
	},
	'nl' : {
		url: 'thank-you/',
		messages:{
			"account[name]"  : {
				required: "U moet ons vertellen waar u werkt",
				minlength: "Bedrijfsnaam moet uit meer dan 2 karakters bestaan"
			},
			"account[domain]": {
				required: "Geef uw helpdesk een naam",
				maxlength: "De naam van de helpdesk mag uit niet meer dan 25 tekens bestaan",
				subdomain:"Alleen letters, cijfers en &#39;-&#39; toegestaan"
			},
			"user[email]":{
				required: "Vul een geldig e-mailadres in",
				email: "E-mail moet er uitzien als een e-mailadres"
			}
		},
		already_exists: 'Deze helpdesk bestaat al',
		email_like:'E-mail moet er uitzien als een e-mailadres',
		thankyoumsg:["Het opzetten van uw self service portal", 
					"Zwengelen uw kennis",
					"Configureren van uw Gemeenschap Platform", "_redirect"]
	}
}