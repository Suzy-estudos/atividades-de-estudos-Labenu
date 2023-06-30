import express, { application } from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";
import { userList } from "./endpoints/userList";
import { tasksList } from "./endpoints/tasksList";
import { userResponsible } from "./endpoints/userResponsible";
import { addResponsibleUser } from "./endpoints/addResponsibleUser";
import { editUserNickname } from "./endpoints/editUserNickname";
import { editStatusTask } from "./endpoints/editStatusTask";
import { deleteTask } from "./endpoints/deleteTask";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

// Endpoint com o callback vindo por import da pasta endpoints
app.get("/ping", ping)

// Endpoint que busca lista de usuários
app.get("/users", userList)

//Endpoint que busca lista de tarefas
app.get("/tasks", tasksList)

//Endpoint que busca usuário responsável por uma tarefa
app.get("/tasks/:taskId/users", userResponsible)

//Endpoint que adiciona um usuário como responsável por uma tarefa
app.post("/tasks/:taskId/users", addResponsibleUser)

//Endpoint que edita o apelido de um usuário
app.put("/users/:userId", editUserNickname)

//Endpoit que edita o status de uma tarefa
app.put("/tasks/:taskId", editStatusTask)

//Endpoint que deleta uma tarefa
app.delete("/tasks/:taskId", deleteTask)