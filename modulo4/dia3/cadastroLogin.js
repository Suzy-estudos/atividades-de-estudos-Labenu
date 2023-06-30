/* Sistema de login
### Entrada
E-mail e senha, ambas do tipo string.

### Saída
Frases de sucesso e erro para cada caso.

### Validações
E-mail deve possuir o caractere especial @ e a senha precisa ter no mínimo 6 caracteres.

### Exemplos de implementação básica
login(”astrodev@labenu.com”, “abc123”) retorna “login bem-sucedido”
login(”bananinha@gmail.com”, “banana”) retorna “e-mail ou senha incorretos”

### Exemplos de validações
login(”astrodev.labenu.com”, “abc123”) retorna “e-mail inválido”
login(”bananinha@gmail.com”, “ba”) retorna “senha deve possuir no mínimo 6 caracteres”
*/
const contas = [
	{
		email: "astrodev@labenu.com",
		password: "abc123"
	},
	{
		email: "bananinha@gmail.com",
		password: "bananinha"
	}
]

const login = (email, password) => {
    if (email.includes("@") && password.length >= 6){
        for (let i=0; i<=contas.length; i++){
            const validaEmail = contas[i].email === email
            const validaPassword = contas[i].password === password
            const autoriza = validaEmail && validaPassword

            if (autoriza){
                return "login bem-sucedido"
            }else{
                return "e-mail ou senha incorretos"
            }
        }
    }else{
        return "ERRO: revise os dados inseridos - e-mail inválido ou senha com menos de 6 caracteres"
    }
}

console.log(login("astrodev@labenu.com", "abc123"))
console.log(login("bananinha@gmail.com", "banana"))
console.log(login("astrodev.labenu.com", "abc123"))
console.log(login("bananinha@gmail.com", "ba"))