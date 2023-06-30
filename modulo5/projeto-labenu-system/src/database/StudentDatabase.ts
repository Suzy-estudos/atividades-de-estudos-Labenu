// import { TABLE_CLASSROOMS } from './tableNames';
// import { IHobbiesDB } from './../models/Students';
import { IStudentDB } from '../models/Student'
import { BaseDatabase } from "./BaseDatabase"

export class StudentDatabase extends BaseDatabase {
    public static TABLE_STUDENTS = "Labe_Students"
    public static TABLE_HOBBIES = "Labe_Hobbies"
    public static TABLE_STUDENTS_HOBBIES = "Students_Hobbies"
    public static TABLE_CLASSROOMS = "Labe_Classrooms"

    public async getAllStudents() {
        const result = await BaseDatabase
        .connection(StudentDatabase.TABLE_STUDENTS)
        .select()

        return result
    }

    public async createStudent(student: IStudentDB) {
        await BaseDatabase
        .connection(StudentDatabase.TABLE_STUDENTS)
        .insert({
            id: student.id,
            name: student.name,
            email: student.email,
            birthdate: student.birthdate,
            classroom_id: student.classroom_id
        })
    }

    public async getStudentByName(search: string) {
        const result = await BaseDatabase
        .connection(StudentDatabase.TABLE_STUDENTS)
        .select()
        .where("name", "LIKE", `%${search}%`)

        return result
    }

    public async editStudentClass(id: string, classroom_id: string) {
        const result = await BaseDatabase
        .connection(StudentDatabase.TABLE_STUDENTS)
        .where({ id: id })
        .update({ classroom_id: classroom_id})

        return result
    }

    public async getStudentsClass(id: string) {
        const [result] = await BaseDatabase
        .connection.raw(`
        SELECT
            ${StudentDatabase.TABLE_STUDENTS}.id,
            ${StudentDatabase.TABLE_STUDENTS}.name,
            ${StudentDatabase.TABLE_STUDENTS}.email
        FROM ${StudentDatabase.TABLE_CLASSROOMS}
        JOIN ${StudentDatabase.TABLE_STUDENTS}
        ON ${StudentDatabase.TABLE_STUDENTS}.classroom_id = ${StudentDatabase.TABLE_CLASSROOMS}.id,
        WHERE ${StudentDatabase.TABLE_CLASSROOMS}.id = ${id};`)

        return result
    }

    public async getStudentsClassroom(id: string) {
        const [result] = await BaseDatabase
            .connection.raw(`
            SELECT
                ${StudentDatabase.TABLE_STUDENTS}.id,
                ${StudentDatabase.TABLE_STUDENTS}.name,
                ${StudentDatabase.TABLE_STUDENTS}.email
            FROM ${StudentDatabase.TABLE_CLASSROOMS}
            JOIN ${StudentDatabase.TABLE_STUDENTS}
            ON ${StudentDatabase.TABLE_STUDENTS}.classroom_id = ${StudentDatabase.TABLE_CLASSROOMS}.id
            WHERE ${StudentDatabase.TABLE_CLASSROOMS}.id = ${id};`)
    

        return result
    }
}