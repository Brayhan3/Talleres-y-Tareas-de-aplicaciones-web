
// Espero a que la página HTML cargue por completo antes de ejecutar mi código
document.addEventListener("DOMContentLoaded", () => { // dentro de esta llave se guarda todo el codigo que se cargara cuando
//el hmtl este cargado.

  // Se selecciona el formulario y los campos de entrada mediante sus IDs
  const formulario = document.querySelector(".formulario_ingreso");
  const inputNombre = document.getElementById("nombre");
  const inputApellido = document.getElementById("apellido");
  const selectTipoDoc = document.getElementById("tipo-doc");
  const inputNumDoc = document.getElementById("num-doc");
  const inputCorreo = document.getElementById("correo");
  const inputPais = document.getElementById("pais");
  const inputDireccion = document.getElementById("direccion");

  // Reglas de expresiones regulares que se usa para validar tipos de texto y números
  const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const regexSoloNumeros = /^\d+$/;
 //Se le coloca el prefijo regex por buena práctica de programación,
        // para que al leer el código quede claro que esa variable contiene un patrón de validación y no un texto común.
        // Se usa un Select para cambiar la longitud máxima y el ejemplo según el tipo de documento.

  selectTipoDoc.addEventListener("change", () => {
    inputNumDoc.value = ""; // Limpia la casilla para evitar datos incoherentes
    if (selectTipoDoc.value === "cedula") {
      inputNumDoc.maxLength = 10;
      inputNumDoc.placeholder = "1312345678";
    } else if (selectTipoDoc.value === "ruc") {
      inputNumDoc.maxLength = 13;
      inputNumDoc.placeholder = "1312345678001";
    } else if (selectTipoDoc.value === "pasaporte") {
      inputNumDoc.maxLength = 15;
      inputNumDoc.placeholder = "A12345678";
    }
  });

  // Escucha el momento en que se intenta enviar el formulario al presionar el botón
  formulario.addEventListener("submit", (e) => {
    // Aqui se captura los valores escritos y elimina los espacios vacíos sobrantes al inicio/final
    // .trim() elimina espacios al principio o al final
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const tipoDoc = selectTipoDoc.value;
    const numDoc = inputNumDoc.value.trim();
    const correo = inputCorreo.value.trim();
    const pais = inputPais.value.trim();
    const direccion = inputDireccion.value.trim();

    // 1. Validar que absolutamente ningún campo se quede vacío
    if (!nombre || !apellido || !numDoc || !correo || !pais || !direccion) {
      e.preventDefault(); // Detengo el envío del formulario
      alert("Por favor, llena todos los campos del formulario.");
      return;
    }
       

    // 2. Validar que Nombres solo contenga letras y espacios
    if (!regexSoloLetras.test(nombre)) {
      e.preventDefault();
      alert(" 'Nombres' solo debe contener letras.");
      inputNombre.focus(); // Ubica el cursor en la casilla con error
      return;
    }
    // regexSoloLetras.test(cadena):Método de las Expresiones Regulares en JS. 
    //Evalúa si el texto pasado por argumento coincide con la regla. Retorna true o false

    // 3. Validar que Apellidos solo contenga letras y espacios
    if (!regexSoloLetras.test(apellido)) {
      e.preventDefault();
      alert(" 'Apellidos' solo debe contener letras.");
      inputApellido.focus();
      return;
    }

    // 4. Validar el número de documento según la opción seleccionada
    if (tipoDoc === "cedula") {
      if (!regexSoloNumeros.test(numDoc) || numDoc.length !== 10) {
        e.preventDefault();
        alert("La cédula debe tener exactamente 10 dígitos.");
        inputNumDoc.focus();
        return;
      }
    } else if (tipoDoc === "ruc") {
      if (!regexSoloNumeros.test(numDoc) || numDoc.length !== 13) {
        e.preventDefault();
        alert("El RUC debe tener exactamente 13 dígitos.");
        inputNumDoc.focus();
        return;
      }
    } else if (tipoDoc === "pasaporte") {
      if (numDoc.length < 5) {
        e.preventDefault();
        alert("El pasaporte debe incluir al menos 5 caracteres.");
        inputNumDoc.focus();
        return;
      }
    }

    // 5. Validar que el correo tenga formato correcto (incluya '@' y '.')
    if (!correo.includes("@") || !correo.includes(".")) {
      e.preventDefault();
      alert("El correo electrónico debe incluir un '@' y un punto '.'.");
      inputCorreo.focus();
      return;
    }

    // 6. Validar que País solo contenga letras
    if (!regexSoloLetras.test(pais)) {
      e.preventDefault();
      alert("El campo 'País' solo debe contener letras.");
      inputPais.focus();
      return;
    }

    // Si todas las comprobaciones son exitosas, permito el registro
    alert("¡Registro realizado con éxito!");
  });
});
