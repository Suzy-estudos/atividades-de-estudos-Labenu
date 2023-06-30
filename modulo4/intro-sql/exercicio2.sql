/*
## Exercício 2
Desenvolva uma query (ou queries) que insira na tabela criada no Exercício 1 os 
seguintes 3 usuários:
    Usuário 1 = {
        id: "001",
        name: "Luana",
        email: "lua@lbn.com"
    };

    Usuário 2 = {
        id: "002",
        name: "Vinicius",
        email: "vini@lbn.com"
    };

    Usuário 3 = {
        id: "003",
        name: "Laura",
        email: "lau@lbn.com"
    };

Dica: Utilize o comando INSERT.
*/
INSERT INTO `Funcionarios` (id, nome, email)
VALUES 
    ("001", "Luana", "lua@lbn.com"),
    ("002", "Vinicius", "vini@lbn.com"),
    ("003", "Laura", "lau@lbn.com");

