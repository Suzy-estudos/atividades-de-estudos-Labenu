import { ShowBusiness } from "../../src/business/ShowBusiness"
import { ShowDatabase } from "../../src/database/ShowDatabase"
import { BaseError } from "../../src/errors/BaseError"
import { ICreateShowInputDTO } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testando ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock() as ShowDatabase,
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Create show bem sucedido", async () => {
        const input: ICreateShowInputDTO = {
            token: "token-astrodev",
            band: "Slipknot",
            startAt: "2022/12/08"
        }

        const response = await showBusiness.createShow(input)

        expect(response.message).toEqual("Show cadastrado com sucesso!")
        expect(response.show.getId()).toEqual("id-mock")
        expect(response.show.getBand()).toEqual("Slipknot")
        expect(response.show.getStartsAt()).toEqual(new Date("2022/12/08"))
        expect(response.show.getTickets()).toEqual(5000)
    })

    test("retorna erro se token não for do admin", async () => {
        expect.assertions(2)
        try {
            const input: ICreateShowInputDTO = {
                token: "token-mock",
                band: "Slipknot",
                startAt: "2022/12/08"
            }

            await showBusiness.createShow(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("Somente admins podem acessar esse recurso.")
            }
        }
    })

    test("retorna erro se data de show já estiver ocupada", async () => {
        expect.assertions(2)
        try {
            const input: ICreateShowInputDTO = {
                token: "token-astrodev",
                band: "Slipknot",
                startAt: "2022/12/07"
            }

            await showBusiness.createShow(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Data de show ocupada.")
            }
        }
    })

    test("retorna erro se data de show ultrapassar dia 11/12", async () => {
        expect.assertions(2)
        try {
            const input: ICreateShowInputDTO = {
                token: "token-astrodev",
                band: "Slipknot",
                startAt: "2022/12/12"
            }

            await showBusiness.createShow(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Data de show inválida, não pode ultrapassar dia 11 de dezembro.")
            }
        }
    })

    test("retorna erro se data de show anteceder dia 05/12", async () => {
        expect.assertions(2)
        try {
            const input: ICreateShowInputDTO = {
                token: "token-astrodev",
                band: "Sliknot",
                startAt: "2022/12/04"
            }

            await showBusiness.createShow(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Data de show inválida, não pode anteceder dia 05 de dezembro.")
            }
        }
    })
})