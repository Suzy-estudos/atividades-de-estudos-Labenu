import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";

export const editPerfumePrice = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id
        const price = req.body.price

        if (!id) {
            errorCode = 422
            throw new Error("Erro: Parâmetro ausente. Informe a 'id' do produto.");
        }

        if (typeof price !== "number") {
            errorCode = 422
            throw new Error("Erro: Parâmetro 'price' deve ser number.")
        }

        if (price <= 0) {
            errorCode = 422
            throw new Error("Erro: Parâmetro 'price' deve ser number maior que 0.")
        }

        const checkPerfume = await connection(TABLE_PERFUMES)
            .select()
            .where("id", "=", `${id}`)

        if (checkPerfume.length === 0) {
            errorCode = 404
            throw new Error("Erro: Perfume não encontrado.")
        }

        await connection(TABLE_PERFUMES)
            .update({
                price: price
            })
            .where({
                id: id
            })

        res.status(200).send({ message: "Preço do perfume editado com sucesso!" })
    } catch (error) {
        res.status(errorCode).send({ error: error.message })
    }
} 