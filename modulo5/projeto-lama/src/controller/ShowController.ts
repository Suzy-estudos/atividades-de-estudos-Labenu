import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BaseError } from "../errors/BaseError";
import { IBuyTicketInputDTO, ICreateShowInputDTO } from "../models/Show";
export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) {}

    public createShow = async (req: Request, res: Response) => {
        try {
            const input: ICreateShowInputDTO = {
                token: req.headers.authorization,
                band: req.body.band,
                startAt: req.body.startAt
            }

            const response = await this.showBusiness.createShow(input)
            res.status(201).send(response)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao cadastrar show." })
        }
    }

    public getShows = async (req: Request, res: Response) => {
        try {

            const response = await this.showBusiness.getShows()
            res.status(200).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao buscar todos os show." })
        }
    }

    public buyTicket = async (req: Request, res: Response) => {
        try {
            const input: IBuyTicketInputDTO= {
                token: req.headers.authorization,
                showId: req.body.showId
            }

            const response = await this.showBusiness.buyTicket(input)
            res.status(200).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao buscar todos os show." })
        }
    }
}