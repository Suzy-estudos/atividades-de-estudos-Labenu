export type Statement = [
    {
        billValue: number,
        descriptionBillToPay: string,
        billPaymentDate: string
    }
]

export type User = {
    id: number,
    name: string,
    cpf: string,
    birthDate: string,
    balance: number
    statement: Statement
}

export let users: User[] = [
    {
        id: 1,
        name: "Suzy",
        cpf: "12345678900",
        birthDate: "22/10/1974",
        balance: 3500,
        statement: [{
            billValue: 150,
            descriptionBillToPay: "internet",
            billPaymentDate: "10/06/2022"
        }]
    },
    {
        id: 2,
        name: "Luna",
        cpf: "23456789001",
        birthDate: "21/12/1998",
        balance: 4000,
        statement: [{
            billValue: 200,
            descriptionBillToPay: "telephone",
            billPaymentDate: "08/06/2022"
        }]
    },
    {
        id: 3,
        name: "Annie",
        cpf: "34567890012",
        birthDate: "30/08/1996",
        balance: 4500,
        statement: [{
            billValue: 250,
            descriptionBillToPay: "health care",
            billPaymentDate: "12/06/2022"
        }]
    },
    {
        id: 4,
        name: "Luigi",
        cpf: "45678900123",
        birthDate: "28/02/2004",
        balance: 5000,
        statement: [{
            billValue: 300,
            descriptionBillToPay: "lighting",
            billPaymentDate: "10/06/2022"
        }]
    },
    {
        id: 5,
        name: "Samael",
        cpf: "56789001234",
        birthDate: "29/05/1980",
        balance: 7000,
        statement: [{
            billValue: 350,
            descriptionBillToPay: "signature streaming",
            billPaymentDate: "10/06/2022"
        }]
    },
]