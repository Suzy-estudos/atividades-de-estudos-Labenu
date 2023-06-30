/* ## Gerador de itens únicos
A ideia é unir duas listas de objetos, mas sem repetir os que possuem o mesmo valor em uma propriedade.

### Entrada
Duas listas de objetos com propriedade nome.

### Saída
Uma lista unificada com todos os objetos recebidos, porém sem repetir nomes.
*/
const primeiraLista = [
	{
		nome: "Banana"
	},
	{
		nome: "Laranja"
	}
]

const segundaLista= [
	{
		nome: "Laranja"
	},
	{
		nome: "Cebola"
	}
]

const geraItensUnicos = (primeiraLista, segundaLista) => {
    const listaConcatenada = primeiraLista.concat(segundaLista)
    const resultado = []

    for (let itemConcatenado of listaConcatenada) {
        const itemResultado = resultado.find((item) => item.nome === itemConcatenado.nome)

        if(!itemResultado) {
            resultado.push(itemConcatenado)
        }
    }

    return resultado
}

console.log(geraItensUnicos(primeiraLista, segundaLista))