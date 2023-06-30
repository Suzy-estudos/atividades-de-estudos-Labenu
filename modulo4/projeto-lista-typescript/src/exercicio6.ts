/*
## Exercício 6
Agora, pediram para você ajudar a fazer uma funcionalidade de um banco digital. 
Antes de explicar a sua tarefa, você precisa entender como eles guardam as contas dos 
clientes. Basicamente, eles salvam o nome do cliente, o saldo total e uma lista 
contendo todas os débitos realizados pelo cliente. 

Exemplo de entrada:
[
	{ cliente: "João", saldoTotal: 1000, debitos: [100, 200, 300] },
	{ cliente: "Paula", saldoTotal: 7500, debitos: [200, 1040] },
	{ cliente: "Pedro", saldoTotal: 10000, debitos: [5140, 6100, 100, 2000] },
	{ cliente: "Luciano", saldoTotal: 100, debitos: [100, 200, 1700] },
	{ cliente: "Artur", saldoTotal: 1800, debitos: [200, 300] },
	{ cliente: "Soter", saldoTotal: 1200, debitos: [] }
]

Pensando em aumentar seu lucros, o banco quer identificar possíveis clientes precisando 
de empréstimos. Dessa forma, a sua tarefa é criar uma função que receba este array como 
parâmetro, atualize o saldo total descontando todos os débitos e retorne apenas os 
clientes com saldo negativo.

- Entrada esperada → type[ ]
- Saída esperada → type[ ]
- Exemplo de saída:
[ 
  { cliente: 'Pedro', saldoTotal: -3340, debitos: [] },
  { cliente: 'Luciano', saldoTotal: -1900, debitos: [] }
]

Dicas:
- Crie um type para os dados dos clientes.
- Para soma dos débitos use o método .reduce()
*/

type Cliente = {
	cliente: string,
	saldoTotal: number,
	debitos: number[]
}

const clientes: Cliente[] = [
	{ cliente: "João", saldoTotal: 1000, debitos: [100, 200, 300] },
	{ cliente: "Paula", saldoTotal: 7500, debitos: [200, 1040] },
	{ cliente: "Pedro", saldoTotal: 10000, debitos: [5140, 6100, 100, 2000] },
	{ cliente: "Luciano", saldoTotal: 100, debitos: [100, 200, 1700] },
	{ cliente: "Artur", saldoTotal: 1800, debitos: [200, 300] },
	{ cliente: "Soter", saldoTotal: 1200, debitos: [] }
]

function emprestimo(clientes: Cliente[]): Cliente[] {

	const devedores = clientes.map((cliente) => {
		let saldoNegativo = cliente.debitos.reduce((total, divida) => total + divida, 0)
		cliente.saldoTotal = cliente.saldoTotal - saldoNegativo
		cliente.debitos = []
		return cliente

	}).filter((saldo) => {
		return saldo.saldoTotal < 0
	})

	return devedores
}

console.log(emprestimo(clientes))