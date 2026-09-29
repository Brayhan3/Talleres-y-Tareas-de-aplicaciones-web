document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("calculadora-sin-interfaz");
    const contenedorResultados = document.getElementById("resultados");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Detener el recargo de la página

        // Obtener los valores de los inputs usando sus IDs
        const num1 = parseFloat(document.getElementById("numero1").value);
        const num2 = parseFloat(document.getElementById("numero2").value);

        const operaciones = ["Suma", "Resta", "Multiplicación", "División"];

        // Limpiar los resultados de ejecuciones anteriores
        contenedorResultados.innerHTML = "<h2>Resultados por vuelta:</h2>";

        // Bucle para iterar exactamente sobre la cantidad de operaciones
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
            }

            // Crear un párrafo <p> en el DOM e insertarlo en la página
            const parrafo = document.createElement("p");
            parrafo.textContent = mensaje;
            contenedorResultados.appendChild(parrafo);
        }
    });
});