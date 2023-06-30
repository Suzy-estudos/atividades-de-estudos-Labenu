import { Request, Response } from "express"
import connection from "../database/connection"
import { TABLE_PURCHASES, TABLE_USERS } from "../database/tableNames"

export const searchUserPurchases = async (req: Request, res: Response) => {
    let errorCode: number = 400
    try {
        const id = req.params.userId

        if (!id) {
            errorCode = 422
            throw new Error("The 'id' parameter must be sent.")
        }

        const userIdExists = await connection(TABLE_USERS)
            .select()
            .where("id", "=", `${id}`)

        if (!userIdExists[0]) {
            errorCode = 404
            throw new Error("User not found.")
        }

        const purchasesExists = await connection(TABLE_PURCHASES)
            .select()
            .where("user_id", "=", `${id}`)

        if (!purchasesExists[0]) {
            errorCode = 409
            throw new Error("User has no purchases.")
        }

        const user = await connection(TABLE_USERS)
            .select("email")
            .where("id", "=", `${id}`)

        const [userPurchases] = await connection.raw(`
        SELECT
        email, name, price, quantity, total_price
        FROM Labe_Purchases
        JOIN Labe_Products
        ON Labe_Purchases.product_id = Labe_Products.id
        JOIN Labe_Users
        ON Labe_Purchases.user_id = Labe_Users.id
        WHERE Labe_Purchases.user_id = ${id};
        `)

        res.status(200).send({
            purchases: userPurchases
        })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}