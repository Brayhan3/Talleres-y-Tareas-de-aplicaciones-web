document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("calculadora-sin-interfaz");
    const contenedorResultados = document.getElementById("resultados");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const num1 = parseFloat(document.getElementById("numero1").value);
        const num2 = parseFloat(document.getElementById("numero2").value);

        // Se añade "Módulo (%)" al arreglo
        const operaciones = ["Suma", "Resta", "Multiplicación", "División", "Módulo (%)"];

        contenedorResultados.innerHTML = "<h2>Resultados por vuelta:</h2>";

        for (let i = 0; i < operaciones.length; i++) {
            let mensaje = "";

            switch (operaciones[i]) {
                case "Suma":
                    let suma = num1 + num2;
                    mensaje = `Vuelta ${i + 1} (${operaciones[i]}): La suma de ${num1} y ${num2} es ${suma}`;
                    break;

                case "Resta":
                    let resta = num1 - num2;
                    mensaje = `Vuelta ${i + 1} (${operaciones[i]}): La resta de ${num1} y ${num2} es ${resta}`;
                    break;

                case "Multiplicación":
                    let multiplicacion = num1 * num2;
                    mensaje = `Vuelta ${i + 1} (${operaciones[i]}): La multiplicación de ${num1} y ${num2} es ${multiplicacion}`;
                    break;

                case "División":
                    if (num2 !== 0) {
                        let division = num1 / num2;
                        mensaje = `Vuelta ${i + 1} (${operaciones[i]}): La división de ${num1} entre ${num2} es ${division}`;
                    } else {
                        mensaje = `Vuelta ${i + 1} (${operaciones[i]}): Error, no se puede dividir entre cero.`;
                    }
                    break;

                case "Módulo (%)":
                    if (num2 !== 0) {
                        let modulo = num1 % num2;
                        mensaje = `Vuelta ${i + 1} (${operaciones[i]}): El módulo de ${num1} % ${num2} es ${modulo}`;
                    } else {
                        mensaje = `Vuelta ${i + 1} (${operaciones[i]}): Error, no se puede calcular el módulo por cero.`;
                    }
                    break;
            }

            const parrafo = document.createElement("p");
            parrafo.textContent = mensaje;
            contenedorResultados.appendChild(parrafo);
        }
    });
});