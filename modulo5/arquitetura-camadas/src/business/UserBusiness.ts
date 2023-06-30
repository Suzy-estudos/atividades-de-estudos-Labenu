import { UserDatabase } from "../database/UserDatabase"
import { User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
    public signup = async (input: any) => {
        const name = input.name
        const email = input.email
        const password = input.password

        if (!name || !email || !password) {
            throw new Error("Parâmetros faltando")
        }

        if (typeof name !== "string") {
            throw new Error("Parâmetro 'name' deve ser uma string")
        }

        if (typeof email !== "string") {
            throw new Error("Parâmetro 'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            throw new Error("Parâmetro 'password' deve ser uma string")
        }

        if (name.length < 3) {
            throw new Error("O parâmetro 'name' deve possuir ao menos 3 caracteres")
        }

        if (password.length < 6) {
            throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
        }

        if (!email.includes("@") || !email.includes(".com")) {
            throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL
        )

        const userDatabase = new UserDatabase()
        await userDatabase.createUser(user)

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)

        const response = {
            message: "Cadastro realizado com sucesso",
            token
        }

        return response
    }

    public login = async (input: any) => {
        const email = input.email
        const password = input.password

        if (!email || !password) {
            throw new Error("Email ou senha faltando")
        }

        if (typeof email !== "string") {
            throw new Error("Parâmetro 'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            throw new Error("Parâmetro 'password' deve ser uma string")
        }

        if (password.length < 6) {
            throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
        }

        if (!email.includes("@") || !email.includes(".com")) {
            throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
        }

        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.findByEmail(email)

        if (!userDB) {
            throw new Error("Email não cadastrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        const hashManager = new HashManager()
        const isPasswordCorrect = await hashManager.compare(
            password,
            user.getPassword()
        )

        if (!isPasswordCorrect) {
            throw new Error("Senha inválida")
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)

        const response = {
            message: "Login realizado com sucesso",
            token
        }

        return response
    }
    public getAllUsers = async (input: any) => {
        const token = input.token
        const search = input.search || ""
        const sort = input.sort || "ASC"
        const limit = Number(input.limit) || 10
        const page = Number(input.page) || 1
        const offset = limit * (page - 1)

        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token ausente ou inválido")
        }

        const userDatabase = new UserDatabase()
        const isUserExists = await userDatabase.checkIfExistsById(payload.id)

        if (!isUserExists) {
            throw new Error("Token inválido")
        }

        const usersDB = await userDatabase.getAllUsers(
            search,
            sort,
            limit,
            offset
        )

        const users = usersDB.map((userDB: any) => {
            return new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role
            )
        })

        const result = users.map((user) => {
            return {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail()
            }
        })
        const response = {
            result
        }
        return response
    }

    public deleteUser = async (input: any) => {
        const token = input.token
        const idToDelete = input.idToDelete

        if (!token) {
            throw new Error("Token ausente")
        }

        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new Error("Acesso negado! Somente ADMINs podem deletar usuários")
        }

        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.findById(idToDelete)

        if (!userDB) {
            throw new Error("Usuário não localizado")
        }

        const userToDelete = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        await userDatabase.deleteUserById(userToDelete.getId())

        const response = {
            message: "Usuário excluído com sucesso"
        }

        return response
    }
}