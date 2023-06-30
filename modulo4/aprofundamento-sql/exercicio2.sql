/*
## Exercício 2
Desenvolva uma query (ou queries) que insira na tabela criada no Exercício 1 os 
seguintes 3 usuários:
    Projeto 1 = {
        id: "001",
    name: "LabeSky",
    title: "LSy",
        date: "05/10/2023"
    };

    Projeto 2 = {
        id: "002",
        name: "Labefy",
        title: "LFy",
        date: "06/01/2024"
    };

    Projeto 3 = {
        id: "003",
        name: "AstroZoom",
        title: "AZm",
        date: "20/12/2022"
    };

Dica: Para cadastrar uma data válida no SQL, é necessário que passemos a data no 
      formato “ANO/MÊS/DIA”.
*/
INSERT INTO `Projetos` (id, name, title, date)
VALUES ("001", "LabeSky", "LSy", "2023/10/05"),
       ("002", "Labefy", "LFy", "2024/01/06"),
       ("003", "AstroZoom", "AZm", "2022/12/20");