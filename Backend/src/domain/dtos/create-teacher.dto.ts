export class CreateTeacherDTO {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly specialty: string,
        public readonly experience: number,
        public readonly status: boolean
    ) {}

    static create(
        object: { [key: string]: any },
    ): [string | undefined, CreateTeacherDTO?] {
        const {
            name,
            email,
            phone,
            specialty,
            experience,
            status = true
        } = object;

        if (!name) return ["Missing name"];
        if (!email) return ["Missing email"];
        if (!phone) return ["Missing phone"];
        if (!specialty) return ["Missing specialty"];
        if (experience === undefined || experience === null) return ["Missing experience"];

        if (typeof name !== "string" || name.length > 100)
            return ["name is too large, max length is 100 characters"];

        if (typeof email !== "string" || email.length > 150)
            return ["email is too large, max length is 150 characters"];

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return ["Invalid email"];

        if (typeof phone !== "string" || !/^\d{10}$/.test(phone))
            return ["Invalid phone, it must have 10 digits"];

        if (typeof specialty !== "string" || specialty.length > 100)
            return ["specialty is too large, max length is 100 characters"];

        if (!Number.isInteger(experience) || experience < 0 || experience > 60)
            return ["Invalid experience, it must be between 0 and 60"];

        if (typeof status !== "boolean")
            return ["Invalid status"];

        return [
            undefined,
            new CreateTeacherDTO(
                name,
                email,
                phone,
                specialty,
                experience,
                status
            )
        ];
    }

}
