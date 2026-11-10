import { Routes } from '@angular/router';
import { ListStudents } from './modules/students/pages/list-students/list-students';
import { CreateStudent } from './modules/students/pages/create-student/create-student';
import { DetailStudent } from './modules/students/pages/detail-student/detail-student';
import { UpdateStudent } from './modules/students/pages/update-student/update-student';
import { ListTeachers } from './modules/teachers/pages/list-teachers/list-teachers';
import { CreateTeacher } from './modules/teachers/pages/create-teacher/create-teacher';
import { DetailTeacher } from './modules/teachers/pages/detail-teacher/detail-teacher';
import { UpdateTeacher } from './modules/teachers/pages/update-teacher/update-teacher';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },
    { 
        path: 'students', 
        children: [
            { path: 'list', component: ListStudents },
            { path: 'create', component: CreateStudent },
            { path: 'update/:id', component: UpdateStudent },
            { path: 'detail/:id', component: DetailStudent },
            { path: '**', redirectTo: 'list' }
        ] 
    },
    {
        path: 'teachers',
        children: [
            { path: 'list', component: ListTeachers },
            { path: 'create', component: CreateTeacher },
            { path: 'update/:id', component: UpdateTeacher },
            { path: 'detail/:id', component: DetailTeacher },
            { path: '**', redirectTo: 'list' }
        ]
    }
];
