import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { CreateTeacher, Teacher, UpdateTeacher } from "../../../domain/interfaces/teacher.interface";

export class TeacherService {

    public async getAllTeachers(): Promise<Teacher[]> {
        const sql = `SELECT * FROM teachers ORDER BY id;`;
        const teachers = await pool.query<Teacher>(sql);
        return teachers.rows;
    }

    public async getTeacherById(id: number): Promise<Teacher> {
        const sql = `SELECT * FROM teachers WHERE id = $1;`;
        const teacher = (await pool.query<Teacher>(sql, [id])).rows[0];
        if(!teacher) {
            throw CustomError.notFound(`No existe un docente con ese id`);
        }
        return teacher;
    }

    public async createTeacher(teacher: CreateTeacher): Promise<Teacher> {
        await this.validateUnique(teacher.email, teacher.phone);
        const sql = `
            INSERT INTO teachers (
                name,
                email,
                phone,
                specialty,
                experience,
                status
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [
            teacher.name,
            teacher.email,
            teacher.phone,
            teacher.specialty,
            teacher.experience,
            teacher.status
        ];
        const teacherCreated = (await pool.query<Teacher>(sql, values)).rows[0];
        if(!teacherCreated) {
            throw CustomError.internalServer(`No se pudo crear el docente`);
        }
        return teacherCreated;
    }

    public async updateTeacher(
        id: number,
        teacher: UpdateTeacher
    ): Promise<Teacher> {
        await this.getTeacherById(id);
        await this.validateUnique(teacher.email, teacher.phone, id);
        const sql = `
            UPDATE teachers
            SET
                name = $1,
                email = $2,
                phone = $3,
                specialty = $4,
                experience = $5,
                status = $6
            WHERE id = $7
            RETURNING *;
        `;
        const values = [
            teacher.name,
            teacher.email,
            teacher.phone,
            teacher.specialty,
            teacher.experience,
            teacher.status,
            id,
        ];
        const teacherUpdated = (await pool.query<Teacher>(sql, values)).rows[0];
        if(!teacherUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar el docente`);
        }
        return teacherUpdated;
    }

    public async deleteTeacher(id: number): Promise<boolean> {
        await this.getTeacherById(id);
        const sql = `
            DELETE FROM teachers
            WHERE id = $1
            RETURNING id;
        `;
        const teacherDeleted = await pool.query(sql, [id]);
        return teacherDeleted.rowCount !== null && teacherDeleted.rowCount > 0;
    }

    private async validateUnique(
        email: string,
        phone: string,
        id: number = 0
    ): Promise<void> {
        const sql = `
            SELECT id FROM teachers
            WHERE (email = $1 OR phone = $2) AND id <> $3;
        `;
        const result = await pool.query(sql, [email, phone, id]);
        if(result.rows.length > 0) {
            throw CustomError.conflict(`Ya existe un docente con ese correo o telefono`);
        }
    }

}
