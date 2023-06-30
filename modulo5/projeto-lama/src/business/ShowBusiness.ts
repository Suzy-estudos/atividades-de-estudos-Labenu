import { ShowDatabase } from "../database/ShowDatabase"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { tickets } from "../database/migrations/data"
import { RequestError } from "../errors/RequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { IBuyTicketInputDTO, ICreateShowInputDTO, ICreateShowOutputDTO, ITicketDB, Show } from "../models/Show"
import { USER_ROLES } from "../models/User"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public createShow = async (input: ICreateShowInputDTO) => {

        const { token, band, startAt } = input

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Token ausente/inválido.")
        }

        if (!band || !startAt) {
            throw new RequestError("Parâmetros ausentes.")
        }

        if (typeof band !== "string") {
            throw new RequestError("Parâmetro 'band' inválido: deve ser uma string.")
        }

        if (typeof startAt !== "string") {
            throw new RequestError("Parâmetro 'band' inválido: deve ser uma string.")
        }

        if (payload.role === USER_ROLES.NORMAL) {
            throw new UnauthorizedError("Somente admins podem acessar esse recurso.")
        }

        const busyDate = await this.showDatabase.verifyDate(new Date(startAt))

        if (busyDate) {
            throw new RequestError("Data de show ocupada.")
        }

        if (startAt > "2022/12/11") {
            throw new RequestError("Data de show inválida, não pode ultrapassar dia 11 de dezembro.")
        }

        if (startAt < "2022/12/05") {
            throw new RequestError("Data de show inválida, não pode anteceder dia 05 de dezembro.")
        }

        const id = this.idGenerator.generate()

        const show = new Show(
            id,
            band,
            new Date(startAt)
        )

        await this.showDatabase.createShow(show)

        const response: ICreateShowOutputDTO = {
            message: "Show cadastrado com sucesso!",
            show
        }

        return response
    }

    public getShows = async () => {
        const showsDB = await this.showDatabase.getShows()

        const shows = showsDB.map(showDB => {
            return new Show(
                showDB.id,
                showDB.band,
                showDB.starts_at
            )
        })

        for (let show of shows) {
            const tickets: any = await this.showDatabase.getTickets(show.getId())

            show.setTickets(show.getTickets() - tickets)
        }

        const response = {
            shows
        }

        return response
    }

    public buyTicket = async (input: IBuyTicketInputDTO) => {
        const { token, showId } = input

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Token ausente/inválido.")
        }

        if (!showId) {
            throw new RequestError("Parâmetros ausentes.")
        }

        if (typeof showId !== "string") {
            throw new RequestError("Parâmetro 'showId' inválido: deve ser uma string.")
        }

        const findShow = await this.showDatabase.verifyShow(showId)

        if (!findShow) {
            throw new NotFoundError("Show não encontrado.")
        }

        const findTicket = await this.showDatabase.verifyTicketShow(showId, payload.id)

        if (findTicket) {
            throw new ConflictError("Você já comprou ingresso para esse show.")
        }

        const shows = await this.getShows()

        const [ticketsShow] = shows.shows.filter((show: any) => {
            return show.id === showId
        })

        if (ticketsShow.getTickets() < 1) {
            throw new RequestError("Ingressos esgotados.")
        }

        const id = this.idGenerator.generate()

        const ticket: ITicketDB = {
            id: id,
            show_id: showId,
            user_id: payload.id
        }

        await this.showDatabase.newTicket(ticket)

        const response = {
            message: "Ingresso comprado com sucesso!"
        }

        return response
    }
}
