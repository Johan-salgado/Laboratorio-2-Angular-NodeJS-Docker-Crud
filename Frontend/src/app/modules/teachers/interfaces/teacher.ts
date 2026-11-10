export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: number;
  status: boolean;
}

export type CreateTeacherRequest = Omit<Teacher, 'id'>;

export type UpdateTeacherRequest = Omit<Teacher, 'id'>;
