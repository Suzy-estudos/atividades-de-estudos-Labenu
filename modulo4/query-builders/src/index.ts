import { createPerfume } from './endpoints/createPerfume';
import express from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";
import { getPerfumes } from './endpoints/getPerfume';
import { editPerfumePrice } from './endpoints/editPerfumePrice';
import { deletePerfume } from './endpoints/deletePerfume';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

app.get("/ping", ping)

// Create perfume (Endpoint que implementa o cadastro de um novo perfume.)
app.post("/perfumes", createPerfume)

// GET perfumes (Endpoint que implementa a busca de um perfume da lista, com
//              a possibilidade de filtragem por nome e marca ao mesmo tempo.)
app.get("/perfumes", getPerfumes)

// Edit perfume price (Endpoint que implementa a edição do preço de um perfume.)
app.put("/perfumes/:id", editPerfumePrice)

// Delete perfume (Endpoint que implementa a remoção de um perfume através de sua 'id'.)
app.delete("/perfumes/:id", deletePerfume)