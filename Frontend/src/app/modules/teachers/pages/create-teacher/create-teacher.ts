import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-create-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-teacher.html',
})
export class CreateTeacher {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private teacherService = inject(TeacherService);

  teacherForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    specialty: ['', [Validators.required, Validators.maxLength(100)]],
    experience: [0, [Validators.required, Validators.min(0), Validators.max(60), Validators.pattern('^[0-9]+$')]],
    status: [true]
  });

  createTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const teacher: CreateTeacherRequest = this.teacherForm.getRawValue();
    this.teacherService.create(teacher).subscribe({
      next: () => {
        this.alertService.toast('Docente registrado correctamente', 'success');
        this.router.navigateByUrl('/teachers/list');
      },
      error: (error) => {
        const message = error.error?.error || 'Error al registrar el docente';
        this.alertService.toast(message, 'error');
      }
    });
  }

}
