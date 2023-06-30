import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";
import { Perfume } from "../models/Perfume";

export const createPerfume = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const name = req.body.name
        const brand = req.body.brand
        const price = req.body.price
        const ml = req.body.ml

        if (!name || !brand || !price || !ml) {
            throw new Error("Erro: Parâmetros ausentes! Informe 'name', 'brand', price e 'ml'.")
        }

        if (typeof name !== "string") {
            errorCode = 422
            throw new Error("Erro: Parâmetro 'name' deve ser string.")
        }

        if (typeof brand !== "string") {
            errorCode = 422
            throw new Error("Erro: Parâmetro 'brand' deve ser string.")
        }

        if (typeof price !== "number") {
            errorCode = 422
            throw new Error("Erro: Parâmetro 'price' deve ser number.")
        }

        if (typeof ml !== "number") {
            errorCode = 422
            throw new Error("Erro: Parâmetro 'ml' deve ser number.")
        }

        if (price <= 0) {
            errorCode = 422
            throw new Error("Erro: Parâmetro 'price' deve ser number maior que 0.")
        }

        if (ml <= 0) {
            errorCode = 422
            throw new Error("Erro: Parâmetro 'ml' deve ser number maior que 0.")
        }

        const newPerfume: Perfume = {
            id: Date.now().toString(),
            name: name,
            brand: brand,
            price: price,
            ml: ml
        }

        await connection(TABLE_PERFUMES)
        .insert({
            id: newPerfume.id,
            name: name,
            brand: newPerfume.brand,
            price: newPerfume.price,
            ml: newPerfume.ml
        })

        res.status(200).send({ perfume: newPerfume, message: "Perfume adicionado com sucesso!"})
    } catch (error) {
        res.status(errorCode).send({ message: error.message})
    }
}