import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { BaseError } from "../errors/BaseError";
import { IAddTagInputDTO, IGetProductsInputDTO, IPostProductInputDTO } from "../models/Products";


export class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ) { }

    public getProducts = async (req: Request, res: Response) => {
        try {
            const input: IGetProductsInputDTO = {
                search: req.query.search as string
            }

            const response = await this.productBusiness.getProducts(input)
            res.status(200).send(response)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Unexpected error while fetching products." }) //Erro inesperado ao buscar produtos.

        }
    }

    public getProductsTag = async (req: Request, res: Response) => {
        try {
            const input: IGetProductsInputDTO = {
                search: req.query.search as string
            }

            const response = await this.productBusiness.getProductsTags(input)
            res.status(200).send(response)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Unexpected error fetching tag." }) //Erro inesperado ao buscar tag.
        }
    }

    public postProduct = async (req: Request, res: Response) => {
        try {
            const input: IPostProductInputDTO = {
                token: req.headers.authorization,
                name: req.body.name
            }

            const response = await this.productBusiness.postProduct(input)
            res.status(201).send(response)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Unexpected error when registering product." }) //Erro inesperado ao cadastrar produto.
        }
    }

    public addTag = async (req: Request, res: Response) => {
        try {
            const input: IAddTagInputDTO = {
                token: req.headers.authorization,
                id: req.params.id as string,
                tagName: req.body.tagName as string,
            }

            const response = await this.productBusiness.addTag(input);
            res.status(200).send(response);
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Unexpected error adding tag." }) //Erro inesperado ao adicionar tag.
        }
    }
}