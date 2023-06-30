/*
## Exercício 4
O array abaixo traz as pessoas colaboradoras de uma empresa, com seus salários, 
setores e se trabalham presencialmente ou home office:
[
    { nome: "Marcos", salário: 2500, setor: "marketing", presencial: true },
    { nome: "Maria", salário: 1500, setor: "vendas", presencial: false },
    { nome: "Salete", salário: 2200, setor: "financeiro", presencial: true },
    { nome: "João", salário: 2800, setor: "marketing", presencial: false },
    { nome: "Josué", salário: 5500, setor: "financeiro", presencial: true },
    { nome: "Natalia", salário: 4700, setor: "vendas", presencial: true },
    { nome: "Paola", salário: 3500, setor: "marketing", presencial: true }
]

Considerando o array acima, crie um ENUM para os setores e um type para as pessoas 
colaboradoras. Em seguida, crie uma função que receba este array como parâmetro e 
retorne apenas as pessoas do setor de marketing que trabalham presencialmente. 
- Entrada esperada → type[ ]
- Saída esperada → type[ ]
- Exemplo de saída:
[
    { nome: "Marcos", salário: 2500, setor: "marketing", presencial: true },
    { nome: "Paola", salário: 3500, setor: "marketing", presencial: true }
]

Dicas:
- Após criar o ENUM você irá precisar alterar o array original, incluindo o ENUM no 
  lugar das strings.
- Para fazer a separação dentro das condições use o método .filter()
*/

enum Setores {
    MARKETING = "marketing",
    VENDAS = "vendas",
    FINANCEIRO = "financeiro"
}

type Colaboradores = {
    nome:string,
    salario:number,
    setor:Setores,
    presencial:boolean
}

const colaboradores: Colaboradores[] = [
    { nome: "Marcos", salario: 2500, setor: Setores.MARKETING, presencial: true },
    { nome: "Maria", salario: 1500, setor: Setores.VENDAS, presencial: false },
    { nome: "Salete", salario: 2200, setor: Setores.FINANCEIRO, presencial: true },
    { nome: "João", salario: 2800, setor: Setores.MARKETING, presencial: false },
    { nome: "Josué", salario: 5500, setor: Setores.FINANCEIRO, presencial: true },
    { nome: "Natalia", salario: 4700, setor: Setores.VENDAS, presencial: true },
    { nome: "Paola", salario: 3500, setor: Setores.MARKETING, presencial: true }
]

function colaboradoresPresenciais(colaboradores:Colaboradores[]):Colaboradores[] {
    let listaColaboradores = colaboradores.filter((colaborador) => {
        return colaborador.setor === "marketing" && colaborador.presencial === true
    })
    return listaColaboradores
}

console.log(colaboradoresPresenciais(colaboradores))