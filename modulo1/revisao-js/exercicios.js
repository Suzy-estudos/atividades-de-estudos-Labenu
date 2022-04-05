// ATENÇÃO!!!
//    -> NÃO COMENTE NENHUMA DAS FUNÇÕES DECLARADAS!!! 
//    -> NÃO MODIFIQUE OS PARÂMETROS DAS FUNÇÕES!!! ()


// EXERCÍCIO 01
function retornaTamanhoArray(array) {
    return array.length
}

// EXERCÍCIO 02
function retornaArrayInvertido(array) {
    return array.reverse()  
}

// EXERCÍCIO 03
function retornaArrayOrdenado(array) {
    array.sort((a, b) => a - b)
    return array
}

// EXERCÍCIO 04
function retornaNumerosPares(array) {
    const numerosPares = array.filter ((numero) => {
        return numero % 2 === 0
    })
    return numerosPares
}

// EXERCÍCIO 05
function retornaNumerosParesElevadosADois(array) {
    const numerosPares = array.filter((numero) => {
        return numero % 2 === 0
    })
    
    const numerosParesElevadosAoQuadrado = numerosPares.map((numero) => {
        return numero * numero
    })
    
    return numerosParesElevadosAoQuadrado
}

// EXERCÍCIO 06
function retornaMaiorNumero(array) {
    let maiorNumero = -Infinity
    for (let i = 0; i < array.length; i++) {
        if (array[i] > maiorNumero) {
            maiorNumero = array[i]
        }
    }
    return maiorNumero
}

// EXERCÍCIO 07
function retornaObjetoEntreDoisNumeros(num1, num2) {
    let numeros = {}
    if (num1 > num2) {
        numeros = {
            maiorNumero: num1,
            maiorDivisivelPorMenor: num1 % num2 === 0,
            diferenca: num1 - num2
        }
    } else if (num2 > num1) {
        numeros = {
            maiorNumero: num2,
            maiorDivisivelPorMenor: num2 % num1 ===0,
            diferenca: num2 - num1
        }
    } else if (num1 === num2) {
        numeros = {
            maiorNumero: num1,
            maiorDivisivelPorMenor: num1 % num2 === 0,
            diferenca: num1 - num2
        }
    }
    return numeros
}

// EXERCÍCIO 08
function retornaNPrimeirosPares(n) {
    let numerosPares = [];
    for (let i = 0; numerosPares.length < n; i++) {
        if (i % 2 === 0) {
            numerosPares.push(i)
        }
    }
    return numerosPares   
}

// EXERCÍCIO 09
function classificaTriangulo(ladoA, ladoB, ladoC) {
    if (ladoA === ladoB === ladoC) {
        return "Equilátero"
    } else if (ladoA === ladoB !== ladoC) {
        return "Isósceles"
    } else if (ladoA !== ladoB !== ladoC) {
        return "Escaleno"
    }  
}

// EXERCÍCIO 10
function retornaSegundoMaiorESegundoMenor(array) {  

}

// EXERCÍCIO 11
function retornaChamadaDeFilme(filme) {
   const filme = {
       nome: 'O Diabo Veste Prada',
       ano: 2006,
       diretor: 'David Frankel',
       atores: ['Meryl Streep', 'Anne Hathaeay', 'Emily Blunt', 'Stanley Tucci']
   }
   return filme = `Venha assistir ao filme ${nome}, de ${ano}, dirigidp por ${diretor} e estrelado por ${atores}`
}

// EXERCÍCIO 12
function retornaPessoaAnonimizada(pessoa) {
   
}

// EXERCÍCIO 13A
function retornaPessoasAutorizadas(pessoas) {
   
}

// EXERCÍCIO 13B
function retornaPessoasNaoAutorizadas(pessoas) {
  
}

// EXERCÍCIO 14
function retornaContasComSaldoAtualizado(contas) {

}

// EXERCÍCIO 15A
function retornaArrayOrdenadoAlfabeticamente(consultas) {
  
}

// EXERCÍCIO 15B
function retornaArrayOrdenadoPorData(consultas) {
   
}