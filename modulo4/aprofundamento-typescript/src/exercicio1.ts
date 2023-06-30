/*
## Exercício 1
Crie uma variável chamada ano, do tipo string, e atribua um valor a ela. 
Em seguida, tente reatribuir um número a esta variável. 
O que acontece? Como fazer para que esta variável também aceite number?
*/

//let ano:string = "2022"
//ano = 2022 
//(o typescript mostra um aviso de erro, informando que o tipo number não pode ser 
//atribuído a uma variável do tipo string)

let ano:string | number = "2022"
ano = 2022
//(variável refatorada, podendo dessa forma receber o ano tanto em string,
//como em number, utilizando na tipagem o operador "|")