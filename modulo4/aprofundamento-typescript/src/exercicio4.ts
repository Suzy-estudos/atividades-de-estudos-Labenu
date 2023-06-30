/*
## Exercício 4
Considere que você esteja implementando uma rede social composta por 
posts de usuários, onde cada um dos posts possui um autor e um texto. 
A seguir, temos um exemplo de array de posts em JS:

const posts = [
  {
    autor: "Alvo Dumbledore",
    texto: "Não vale a pena viver sonhando e se esquecer de viver"
  },
  {
    autor: "Severo Snape",
    texto: "Menos 10 pontos para Grifinória!"
  },
  {
    autor: "Hermione Granger",
    texto: "É levi-ô-sa, não levio-sá!"
  },
  {
    autor: "Dobby",
    texto: "Dobby é um elfo livre!"
  },
  {
    autor: "Lord Voldemort",
    texto: "Avada Kedavra!"
  }
]

### Parte 1
Copie o código acima para um arquivo .ts e depois:
- Crie um type para representar um post;
- Utilize esse mesmo tipo criado acima para fazer a tipagem do array posts.
*/
type Posts = {
    autor: string,
    texto: string
}

const posts:Posts[] = [
    {
        autor: "Alvo Dumbledore",
        texto: "Não vale a pena viver sonhando e se esquecer de viver"
    },
    {
        autor: "Severo Snape",
        texto: "Menos 10 pontos para Grifinória!"
    },
    {
        autor: "Hermione Granger",
        texto: "É levi-ô-sa, não levio-sá!"
    },
    {
        autor: "Dobby",
        texto: "Dobby é um elfo livre!"
    },
    {
        autor: "Lord Voldemort",
        texto: "Avada Kedavra!"
    }
]

/*### Parte 2
Analise a função a seguir chamada buscarPostsPorAutor(), escrita em JS:


function buscarPostsPorAutor(posts, autorInformado) {
  return posts.filter(
    (post) => {
      return post.autor === autorInformado
    }
  )
}


Quais são as entradas e saídas dessa função? 
RESPOSTA: 
ENTRADA: UM ARRAY DE OBJETOS QUE RECEBE O AUTOR E O TEXTO DE UM POST.
SAÍDA: UM ARRAY CONTENDO UM OBJETO FILTRADO DO ARRAY DE OBJETOS.

Copie a função para o mesmo arquivo .ts do array de posts e faça a tipagem necessária.
*/

function buscarPostsPorAutor(posts:Posts[], autorInformado:string):Posts[] {
    return posts.filter(
        (post) => {
            return post.autor === autorInformado
        }
    )
}

console.log(buscarPostsPorAutor(posts, "Alvo Dumbledore")) 