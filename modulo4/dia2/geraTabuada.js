function geraTabuada(num){
    if( typeof(num) === "number" ){
        if(num <= 10 && num >= 1){
            let tabuada = [
                `${num} x 0 = ${num * 0}`,
                `${num} x 1 = ${num * 1}`,
                `${num} x 2 = ${num * 2}`,
                `${num} x 3 = ${num * 3}`,
                `${num} x 4 = ${num * 4}`,
                `${num} x 5 = ${num * 5}`,
                `${num} x 6 = ${num * 6}`,
                `${num} x 7 = ${num * 7}`,
                `${num} x 8 = ${num * 8}`,
                `${num} x 9 = ${num * 9}`,
                `${num} x 10 = ${num * 10}`
            ]
            return tabuada

        }else{
            return "Erro. Parâmetro inválido - o número precisa valer entre 1 e 10."
        }
    }else{
        return "Erro. Parâmetro inválido - deve ser um número."
    }
}

console.log(geraTabuada(5))
console.log(geraTabuada("10"))
console.log(geraTabuada(50))