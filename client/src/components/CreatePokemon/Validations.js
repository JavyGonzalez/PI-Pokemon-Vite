

const validate = (input) => {

  let errorInput = {}
  let expRegName = /^[a-zA-Z\s]*$/; //Expresión regular solo permite letras. 
  let expRegUrl = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/;//Expresión regular que solo permite rutas seguras.

  if (!input.name) {
    errorInput.name1 = 'Debe ingresar un Pokemón.'
  }

  if (!expRegName.test(input.name)) {
    errorInput.name2 = 'El Pokemón solo debe contener letras.'
  }

  if (input.name.length > 20) {
    errorInput.name3 = 'El Pokemón no puede contener mas de 20 letras.'
  }

  if (!input.img) {
    errorInput.img1 = 'Debe ingresar una ruta de la imágene del Pokemón.'
  }

  if (!expRegUrl.test(input.img)) {
    errorInput.img2 = 'Debe ingresar una ruta segura, extensiones png, jpg, jpeg o gif.'
  }

  if (input.hp < 1 || input.hp > 150) {
    if (input.hp < 1) {
      errorInput.hp1 = 'La Vida del Pokemón debe ser mayor que 1.'
    }
    if (input.hp > 150) {
      errorInput.hp2 = 'La Vida del Pokemón debe ser menor que 150.'
    }
  }

  if (input.attack < 1 || input.attack > 200) {
    if (input.attack < 1) {
      errorInput.attack1 = 'El ataque del Pokemón debe ser mayor que 1.'
    }
    if (input.attack > 200) {
      errorInput.attack2 = 'El ataque del Pokemón debe ser menor que 200.'
    }
  }

  if (input.defense < 1 || input.defense > 200) {
    if (input.defense < 1) {
      errorInput.defense1 = 'La defensa del Pokemón debe ser mayor que 1.'
    }
    if (input.defense > 200) {
      errorInput.defense2 = 'La defensa del Pokemón debe ser menor que 200.'
    }
  }

  if (input.speed < 1 || input.speed > 100) {
    if (input.speed < 1) {
      errorInput.speed = 'La velocidad del Pokemón debe ser mayor que 1.'
    }
    if (input.speed > 100) {
      errorInput.speed = 'La velocidad del Pokemón debe ser menor que 100.'
    }
  }

  if (input.height < 1 || input.height > 80) {
    if (input.height < 1) {
      errorInput.height1 = 'La altura del Pokémon debe ser mayor a 1 decámetro (dam)'
    }
    if (input.height > 80) {
      errorInput.height1 = 'La altura del Pokémon debe ser menor a 80 decámetros (dam)'
    }
  }

  if (input.weight < 1 || input.weight > 1500) {
    if (input.weight < 1) {
      errorInput.weight1 = 'El peso del Pokemón debe ser mayor que 1.'
    }
    if (input.weight > 1500) {
      errorInput.weight2 = 'El peso del Pokemón debe ser menor que 1500.'
    }
  }

  if (!input.type.length) {
    errorInput.type1 = 'Debe elegir al menos 1 tipo de Pokemón.'
  }
  if (input.type.length > 2) {
    errorInput.type2 = `No puede elegir más de 2 tipos por Pokemón.`
  }

  return errorInput;
};

export default validate;