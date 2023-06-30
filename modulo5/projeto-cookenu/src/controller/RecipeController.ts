import { Request, Response } from "express";
import { RecipeDatabase } from "../database/RecipeDatabase";
import { Recipe } from "../models/Recipe";
import { USER_ROLES } from "../models/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class RecipeController {
    public createRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const title = req.body.title
            const description = req.body.description

            if (!token) {
                errorCode = 401
                throw new Error("Token ausente")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido.")
            }

            if (!title || !description) {
                errorCode = 422
                throw new Error("Parâmetro(s) ausente(s).")
            }

            if (typeof title !== "string") {
                errorCode = 422
                throw new Error("Parâmetro 'title' deve ser do tipo string.")
            }

            if (typeof description !== "string") {
                errorCode = 422
                throw new Error("Parâmetro 'description' deve ser do tipo string.")
            }

            if (title.length < 3) {
                errorCode = 422
                throw new Error("Parâmetro 'title' deve possuir ao menos 3 caracteres.")
            }

            if (description.length < 10) {
                errorCode = 422
                throw new Error("Parâmetro 'description' deve possuir ao menos 10 caracteres.")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const recipe = new Recipe(
                id,
                title,
                description,
                new Date(),
                new Date(),
                payload.id
            )

            const recipeDataBase = new RecipeDatabase()
            await recipeDataBase.createRecipe(recipe)

            res.status(201).send({ message: "Receita cadastrada com sucesso!", recipe })

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public editRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const id = req.params.id
            const title = req.body.title
            const description = req.body.description

            if (!token) {
                errorCode = 422
                throw new Error("Token ausente.")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido.")
            }

            if (!title && !description) {
                errorCode = 422
                throw new Error("Parâmetro(s) ausente(s).")
            }

            if (title && typeof title !== "string") {
                errorCode = 422
                throw new Error("Parâmetro 'title' deve ser uma string.")
            }

            if (description && typeof description !== "string") {
                errorCode = 422
                throw new Error("Parâmetro 'description' deve ser uma string.")
            }

            if (title && title.length < 3) {
                throw new Error("Parâmetro 'title' deve possuir ao menos 3 caracteres.")
            }

            if (description && description.length < 10) {
                throw new Error("Parâmetro 'description' deve possuir ao menos 10 caracteres.")
            }

            const recipeDataBase = new RecipeDatabase()
            const receitaDB = await recipeDataBase.findById(id)

            if (!receitaDB) {
                errorCode = 404
                throw new Error("Receita não localizada.")
            }

            if (payload.role === USER_ROLES.NORMAL) {
                if (payload.id !== receitaDB.creator_id) {
                    errorCode = 403
                    throw new Error("Usuário não autorizado! Solicite a alteração dessa receita a um ADMIN.")
                }
            }

            const recipe = new Recipe(
                receitaDB.id,
                receitaDB.title,
                receitaDB.description,
                receitaDB.created_at,
                receitaDB.updated_at = new Date(),
                receitaDB.creator_id
            )

            title && recipe.setTitle(title)
            description && recipe.setDescription(description)

            await recipeDataBase.editRecipe(recipe)

            res.status(201).send({ message: "Receita editada com sucesso!", recipe })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public deleteRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const id = req.params.id

            if (!token) {
                errorCode = 422
                throw new Error("Token ausente.")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido.")
            }

            const recipeDataBase = new RecipeDatabase()
            const receitaDB = await recipeDataBase.findById(id)

            if (!receitaDB) {
                errorCode = 404
                throw new Error("Receita não localizada.")
            }

            if (payload.role === USER_ROLES.NORMAL) {
                if (payload.id !== receitaDB.creator_id) {
                    errorCode = 403
                    throw new Error("Usuário não autorizado! Solicite a exclusão dessa receita a um ADMIN.")
                }
            }

            await recipeDataBase.deleteRecipe(id)

            res.status(200).send({ message: "Receita excluída com sucesso!" })

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public getAllRecipes = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const search = req.query.search as string
            const sort = req.query.sort as string || "title"
            const order = req.query.order as string || "asc"
            const limit = Number(req.query.limit) || 5
            const page = Number(req.query.page) || 1
            const offset = limit * (page - 1)

            if (!token) {
                errorCode = 401
                throw new Error("Token faltando")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido")
            }

            if (typeof search !== "string") {
                throw new Error("Parâmetro 'search' deve ser uma string")
            }

            const recipeDatabase = new RecipeDatabase()
            const recipesDB = await recipeDatabase.getAllRecipes(search, sort, order, limit, page, offset)

            const recipes = recipesDB.map((recipeDB) => {
                return new Recipe(
                    recipeDB.id,
                    recipeDB.title,
                    recipeDB.description,
                    recipeDB.created_at,
                    recipeDB.updated_at,
                    recipeDB.creator_id
                )
            })

            res.status(200).send({ recipes })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }    
}