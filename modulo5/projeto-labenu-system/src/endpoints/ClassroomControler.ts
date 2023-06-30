import { Request, Response } from "express"
import { BaseDatabase } from "../database/BaseDatabase"
import { ClassroomDatabase } from "../database/ClassroomDatabase"
import { IClassroomDB } from "../models/Classroom"

export class ClassroomController extends BaseDatabase {
    public static TABLE_CLASSROOMS = "Labe_Classrooms"

    public async getAllClassrooms(req: Request, res: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const result = await classroomDatabase.getAllClassrooms()

            res.status(200).send({ classrooms: result })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async createClassroom(req: Request, res: Response) {
        let errorCode = 400
        try {
            const name = req.body.name
            const module = req.body.module

            if (!name || !module) {
                throw new Error("Invalid parameters.")
            }

            const classroom: IClassroomDB = {
                id: Date.now().toString(),
                name: name,
                module: module
            }

            const classroomDatabase = new ClassroomDatabase()
            await classroomDatabase.createClassroom(classroom)

            res.status(201).send({ message: "Classroom created successfully!", turma: classroom })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async getActiveClass(req: Request, res: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const list = await classroomDatabase.getAllClassrooms()

            const result = list.filter((item) => {
                return item.module !== "0"
            })

            res.status(200).send({ classroomsActives: result })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async changeModuleClassroom(req: Request, res: Response) {
        let errorCode = 400
        try {
            const classroomId = req.params.classroomId
            const module = req.body.module

            const [classroom] = await BaseDatabase.connection(ClassroomController.TABLE_CLASSROOMS)
                .select()
                .where("id", "=", `${classroomId}`)

            const classroomFound = classroom
            console.log(classroom)

            if (!classroomFound) {
                errorCode = 404
                throw new Error("Classroom does not exist.")
            }

            if (typeof module !== "string") {
                errorCode = 404
                throw new Error("'module' must to be a string")
            }

            const classroomDatabase = new ClassroomDatabase()
            await classroomDatabase.changeModuleClassroom(classroomId, module)

            res.status(201).send({ message: `Classroom module ${classroom.name} successfully changed!` })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}