import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";

export const getPerfumes = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const search = req.query.q
        const sort = req.query.sort || "name"
        const order = req.query.order || "asc"
        const limit = Number(req.query.limit) || 5
        const page = Number(req.query.page) || 1
        const offset = limit * (page - 1)

        if (search) {
            const result = await connection(TABLE_PERFUMES)
                .select()
                .where("name", "LIKE", `%${search}%`)
                .andWhere("brand", "LIKE", `%${search}%`)
                .orderBy(`${sort}`, `${order}`)
                .limit(limit)
                .offset(offset)

            res.status(200).send({ perfumes: result })
        }

        const result = await connection(TABLE_PERFUMES)
            .select()
            .orderBy(`${sort}`, `${order}`)
            .limit(limit)
            .offset(offset)

        res.status(200).send({ perfumes: result })

    } catch (error) {
        res.status(errorCode).send({ error: error.message })
    }
}