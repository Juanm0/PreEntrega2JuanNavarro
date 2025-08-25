
function division(numeroA, numeroB){
    let division = numeroA / numeroB
    if(numeroB === 0){
        return alert("NO PODES DIVIDIR SOBRE CERO (0)")
    }else{
        console.log(numeroA,numeroB)
        return alert(`El resultado de la division es ${division}`)
    }
   
}

function multiplicacion(numeroA, numeroB){
    let multiplicacion = numeroA * numeroB
    return alert(`El resultado de la multiplicacion es ${multiplicacion}`)
}

function resta(numeroA, numeroB){
    let resta = numeroA - numeroB
    return alert(`El resultado de la resta es ${resta}`)
}


function suma(numeroA, numeroB) {
    let suma = numeroA + numeroB
    return alert(`El resultado de la suma es ${suma}`)
}

function menu() {
    let opcion
    opcion = prompt("--------------------------\n" +
        "CALCULADORA\n" +
        "--------------------------\n" +
        "1) Suma\n" +
        "2) Resta\n" +
        "3) Multiplicacion\n" +
        "4) Division\n" +
        "Ingrese la operacion que quiera realizar: ")
    opcion = Number(opcion)
    let num1
    let num2
    if (opcion >= 1 && opcion <= 4){
        num1 = parseFloat(prompt("Ingrese el primer número: "))
        num2 = parseFloat(prompt("Ingrese el segundo número: "))
    }
    
    
    switch (opcion) {
        case 1:
            suma(num1, num2)
            break
        case 2:
            resta(num1, num2)
            break
        case 3:
            multiplicacion(num1, num2)
            break
        case 4:
            division(num1,num2)
            break
        default:
            alert("Opcion incorrecta")
            break
    }

}

menu()