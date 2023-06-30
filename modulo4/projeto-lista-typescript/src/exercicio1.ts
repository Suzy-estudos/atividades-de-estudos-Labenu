/*
## Exercício 1
Crie uma função que receba um parâmetro qualquer e que imprima no console o tipo 
da variável. 
- Entrada esperada →  Várias possibilidades
- Saída esperada → Nenhuma
*/

function imprimeTipo(input:any):void {
    console.log(typeof input)
}

imprimeTipo("Suzy")
imprimeTipo(47)
imprimeTipo(true)
imprimeTipo({nome:"Suzy", idade:47})
imprimeTipo(["Suzy", "Sophia"])