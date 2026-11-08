export class UpdateClassroomDTO {

    private constructor(
        public readonly name: string,
        public readonly building: string,
        public readonly capacity: number,
        public readonly projector: boolean,
        public readonly status: boolean
    ) {}

    static create(
        object: { [key: string]: any },
    ): [string | undefined, UpdateClassroomDTO?] {
        const {
            name,
            building,
            capacity,
            projector,
            status
        } = object;

        if (!name) return ["Missing name"];
        if (!building) return ["Missing building"];
        if (capacity === undefined || capacity === null) return ["Missing capacity"];
        if (projector === undefined || projector === null) return ["Missing projector"];
        if (status === undefined || status === null) return ["Missing status"];

        if (typeof name !== "string" || name.length > 50)
            return ["name is too large, max length is 50 characters"];

        if (typeof building !== "string" || building.length > 100)
            return ["building is too large, max length is 100 characters"];

        if (!Number.isInteger(capacity) || capacity < 1 || capacity > 200)
            return ["Invalid capacity, it must be between 1 and 200"];

        if (typeof projector !== "boolean")
            return ["Invalid projector"];

        if (typeof status !== "boolean")
            return ["Invalid status"];

        return [
            undefined,
            new UpdateClassroomDTO(
                name,
                building,
                capacity,
                projector,
                status
            )
        ];
    }

}
