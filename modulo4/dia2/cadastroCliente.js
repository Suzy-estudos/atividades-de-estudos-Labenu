const clientes = [
	{ id: 1, nome: "Fulano" },
	{ id: 2, nome: "Ciclano" },
	{ id: 3, nome: "Beltrano" },
	{ id: 4, nome: "Fulana" }
]

function adicionaCliente (cliente){
    let index = clientes.findIndex(objeto => objeto.id === cliente.id)
    if (index < 0){
        clientes.push(cliente)
        return clientes
    }else{
        return `Erro. Parâmetro inválido - id: ${cliente.id} já existe’).`
    }
}

adicionaCliente({id: 5, nome: "Suzy"})
adicionaCliente({id: 1, nome: "Suzy"})
console.log(clientes)
console.log(adicionaCliente({id:1, nome: "Suzy"}))