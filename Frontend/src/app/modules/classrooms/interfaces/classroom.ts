export interface Classroom {
  id: number;
  name: string;
  building: string;
  capacity: number;
  projector: boolean;
  status: boolean;
}

export type CreateClassroomRequest = Omit<Classroom, 'id'>;

export type UpdateClassroomRequest = Omit<Classroom, 'id'>;
