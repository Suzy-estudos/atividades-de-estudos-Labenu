import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase"
import { StudentDatabase } from "../database/StudentDatabase"
import { IStudentDB } from "../models/Student"

export class StudentController {
    public static TABLE_CLASSROOMS = "Labe_Classrooms"

    public async getAllStudents(req: Request, res: Response) {
        let errorCode = 400
        try {
            const studentDatabase = new StudentDatabase()
            const result = await studentDatabase.getAllStudents()

            res.status(200).send({ students: result })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async createStudent(req: Request, res: Response) {
        let errorCode = 400
        try {
            const name = req.body.name
            const email = req.body.email
            const birthdate = req.body.birthdate
            const classroom_id = req.body.classroom_id

            if (!name || !email || !birthdate || !classroom_id) {
                throw new Error("Missing parameters.")
            }

            const student: IStudentDB = {
                id: Date.now().toLocaleString(),
                name: name,
                email: email,
                birthdate: new Date(birthdate.toLocaleString()),
                classroom_id: classroom_id,
            }

            const studentDatabase = new StudentDatabase()
            await studentDatabase.createStudent(student)

            res.status(201).send({ message: "Student successfully registered!", student: student })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async getStudentByName(req: Request, res: Response) {
        let errorCode = 400
        try {
            const search = req.query.q as string

            if (search) {
                const studentDatabase = new StudentDatabase()
                const result = await studentDatabase.getStudentByName(search)
                res.status(200).send({ message: "Student record found in the system!", student: result })
            } else {
                const studentDatabase = new StudentDatabase()
                const result = await studentDatabase.getAllStudents()
                res.status(200).send({ students: result })
            }
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async editStudentClass(req: Request, res: Response) {
        let errorCode = 400
        try {
            const id = req.params.id as string
            const classroom_id = req.body.classroom_id as string

            if (!id || !classroom_id) {
                errorCode = 422
                throw new Error("Missing parameters.")
            }

            if (typeof classroom_id !== "string" || typeof id !== "string") {
                errorCode = 422
                throw new Error("Invalid typed parameters, must be string.")
            }

            const studentDatabase = new StudentDatabase()
            const result = await studentDatabase.editStudentClass(id, classroom_id)

            res.status(200).send({ message: "Successfully changed class!" })

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async getStudentsClass(req: Request, res: Response) {
        let errorCode = 400
        try {
            const id = req.params.id as string

            if (!id) {
                errorCode = 422
                throw new Error("Missing parameters.")
            }

            const classroomDataBase = new ClassroomDatabase()
            const findClass = await classroomDataBase.verificationClass(id)

            if (!findClass[0]) {
                errorCode = 404
                throw new Error("Class not found.");
            }

            const studentDataBase = new StudentDatabase()
            const result = await studentDataBase.getStudentsClassroom(id)

            res.status(200).send({ students: result })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}