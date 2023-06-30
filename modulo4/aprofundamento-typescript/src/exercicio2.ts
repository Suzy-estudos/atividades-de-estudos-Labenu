/*
## Exercício 2
Crie 1 objeto que representa a sua pessoa e possua 3 propriedades:
- nome, de tipo string;
- idade, de tipo number;
- corFavorita, enum das cores do arco-íris.
*/
type Pessoa = {
    nome: string,
    idade: number,
    corFavorita: CoresArcoIris
}

enum CoresArcoIris{
    AZUL= "Azul",
    VERMELHO = "Vermelho",
    LARANJA = "Laranja",
    VERDE = "Verde",
    AMARELO = "Amarelo",
    VIOLETA = "Violeta"
}

const suzy: Pessoa = {
    nome: "Suzy",
    idade: 47,
    corFavorita: CoresArcoIris.VIOLETA
}

console.log(suzy)