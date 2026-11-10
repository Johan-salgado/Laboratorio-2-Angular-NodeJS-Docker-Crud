import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Teacher } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-detail-teacher',
  imports: [Back],
  templateUrl: './detail-teacher.html',
})
export class DetailTeacher {

  teacher: Teacher | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private teacherService = inject(TeacherService);
  private alertService = inject(AlertService);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTeacher(id);
  }

  getTeacher(id: number) {
    this.teacherService.getById(id).subscribe({
      next: (teacher) => {
        this.teacher = teacher;
      },
      error: (error) => {
        const message = error.error?.error || 'Error al consultar el docente';
        this.alertService.toast(message, 'error');
        this.router.navigateByUrl('/teachers/list');
      }
    });
  }

}
