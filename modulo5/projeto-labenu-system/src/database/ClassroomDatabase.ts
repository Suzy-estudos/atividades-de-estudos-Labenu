import { TABLE_STUDENTS } from './tableNames';
import { IClassroomDB } from "../models/Classroom"
import { BaseDatabase } from "./BaseDatabase"

export class ClassroomDatabase extends BaseDatabase {
  public static TABLE_CLASSROOMS = "Labe_Classrooms"
  public static TABLE_STUDENTS = "Labe_Students"

  public async getAllClassrooms() {
    const result = await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .select()

    return result
  }

  public async createClassroom(classroom: IClassroomDB) {
    await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .insert({
        id: classroom.id,
        name: classroom.name,
        module: classroom.module
      })
  }

  public async changeModuleClassroom(id: string, module: string) {
    await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .update({ module })
      .where({ id })
  }

  public async verificationClass(id: string) {
    const findClass = await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .select()
      .where({ id: id })
    return findClass
  }
}
