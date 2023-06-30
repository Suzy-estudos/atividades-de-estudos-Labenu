import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";

export const putEditPrice = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id
        const price = req.body.price as number

        if (!id) {
            errorCode = 422
            throw new Error("Erro: Parâmetro ausente.");
        }

        const [productId] = await connection.raw(`
        SELECT * FROM ${TABLE_PRODUCTS}
        WHERE id = "${id}";
        `)

        if (!productId[0]) {
            errorCode = 404
            throw new Error("Erro: Produto não encontrado.");
        }

        await connection.raw(`
        UPDATE ${TABLE_PRODUCTS}
        SET price = ${price}
        WHERE id = "${id}"
        `)

        res.status(200).send({mensagem: "Preço alterado com sucesso!"})


    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
} 