/* ## Validação de chaves de objeto
A ideia é analisar todas as propriedades do objeto recebido e identificar quais delas possuem um valor undefined.

### Entrada
Um objeto de input.

### Saída
Um objeto contendo duas propriedades, uma isError booleana e uma errors com a lista de chaves inválidas.

### Exemplos de implementação

**validateInput({ id: 1, name: undefined, email: undefined })** retorna
{
	isError: true,
	errors: ["name", "email"]
}


**validateInput({ id: 1, name: “astrodev”, email: “astrodev@gmail.com” })** retorna
{
	isError: false,
	errors: []
}

**validateInput({ })** retorna
{
	isError: false,
	errors: []
}
*/
const validaInput = (input) => {
    const resposta = {
        isErro: false,
        errors: []
    }

    const chaves = Object.keys(input)

    for (let chave of chaves) {
        if (input[chave] === undefined) {
            resposta.isErro = true
            resposta.errors.push(chave)
        }
    }

    return resposta
}

console.log(validaInput({ id: 1, nome: undefined, email: undefined }))
console.log(validaInput({ id: 1, name: "astrodev", email: "astrodev@gmail.com"}))
console.log(validaInput({ }))