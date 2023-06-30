/*
## Exercício 4
### Letra A
Após certo tempo, a equipe de desenvolvimento chegou a conclusão da necessidade de 
existir uma descrição mínima do projeto, que facilite o entendimento do seu significado. 
Dito isto, desenvolva uma query que adicione uma propriedade chamada “description” a 
tabela de projetos, sem apagar a tabela inteira. 
Confirme o sucesso da operação.

Dica 1: Utilize os comandos ALTER TABLE e ADD.
Dica 2: Para confirmação de mudanças na estrutura da tabela, utilize o comando DESCRIBE.
*/
ALTER TABLE `Projetos`
ADD description VARCHAR(255) NOT NULL;

DESCRIBE `Projetos`;

/*
### Letra B
Desenvolva uma query que atualize o campo “description” de cada projeto existente 
no banco de dados. Tome como referência as seguintes descrições:
    Projeto 1 = {
        ...
        description: "Projeto de sistema em nuvem da Labenu." 
    };

    Projeto 2 = {
        ...
        description: "Projeto de sistema de gerenciamento de músicas da Labenu."
    };

    Projeto 3 = {
        ...
        description: "Projeto de rede de comunicação da Labenu."
    };

Ao final, confirme o sucesso da operação.

Dica 1: Utilize os comandos UPDATE, SET e WHERE.
Dica 2: Para confirmação de mudanças na estrutura da tabela, utilize o comando DESCRIBE.
*/
UPDATE `Projetos`
SET description = "Projeto de sistema em nuvem da Labenu."
WHERE id = "001";

UPDATE `Projetos`
SET description = "Projeto de sistema de gerenciamento de músicas da Labenu."
WHERE id = "002";

UPDATE `Projetos`
SET description = "Projeto de rede de comunicação da Labenu."
WHERE id = "003";

DESCRIBE `Projetos`;

SELECT FROM * `Projetos`;