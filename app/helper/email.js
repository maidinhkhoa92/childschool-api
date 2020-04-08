module.exports.staff = {
  subject: "Bienvenid@ a Ontább",
  content: `
    <p>Hola, a partir de hoy formas parte de la familia de OntáBb. Sigue el siguiente link para crear tu perfil <a href="www.myontabb.com/registro-staff">www.myontabb.com/registro-staff</a><p>
    <p>Un saludo.</p>
    `
};

module.exports.family = {
  subject: "Bienvenid@ a la familia Ontább",
  content: `
    <p>Hola, bienvenid@ a la familia Ontább. Es una útil herramienta para la gestión de guarderías. Permite una mejora sustancial en la interacción con los padres a los cuales les mostramos el días a día de sus hij@s a través de fotos, videos y otras herramientas de fácil acceso. OntáBb está demostrado que ahorra tiempo para el personal, lo que permite un tiempo considerablemente mayor con los estudiantes, al tiempo que ofrece una experiencia mucho mejor para los padres. Sigue el siguiente link <a href="www.myontabb.com/registro-familiar">www.myontabb.com/registro-familiar</a> donde podrás acceder al perfil que hemos creado de tu hij@. Luego completa la información correspondiente.<p>
    <p>Un saludo.</p>
    `
};

module.exports.director = {
  subject: "Bienvenid@ a Ontább",
  content: `
    <p>Hola,<br/> Si has recibido este email es porque eres Director o Responsable de un centro de educación infantil. Sigue el siguiente link para que completes el registro y puedas crear tu centro.</p>
    <a href="https://www.myontabb.com/register">https://www.myontabb.com/register</a>
    <p>Un saludo.</p>
    `
};

module.exports.forgot = {
  subject: "Mírate esta novedosa web",
  content: digit => `
    <p>Hola! Introduce este nuevo PIN temporal ${digit} para crear uno nuevo que puedas recordar fácilmente.</a>
    <p>Un saludo.</p>
    `
};

module.exports.contact = {
  subject: "New Contact",
  content: content => `
    <p>Email: ${content.email}</p>
    <p>First name: ${content.firstName}</p>
    <p>Last name: ${content.lastName}</p>
    <p>Telephone: ${content.telephone}</p>
    <p>Type: ${content.typeOfUser}</p>
  `
};

module.exports.forgot = {
  subject: "Reset password",
  content: link => `
    <p>Please access this link to change your password: ${link}</p>
  `
};
