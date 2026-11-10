import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Teacher, UpdateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-update-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-teacher.html',
})
export class UpdateTeacher {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isFinite(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getTeacher();
  }

  getTeacher() {
    this.teacherService.getById(this.id).subscribe({
      next: (teacher) => {
        this.setValues(teacher);
      },
      error: (error) => {
        const message = error.error?.error || 'Error al consultar el docente';
        this.alertService.toast(message, 'error');
        this.goToList();
      }
    });
  }

  setValues(teacher: Teacher): void {
    this.teacherForm.patchValue({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      specialty: teacher.specialty,
      experience: teacher.experience,
      status: teacher.status
    });
  }

  updateTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const teacher: UpdateTeacherRequest = this.teacherForm.getRawValue();
    this.teacherService.update(this.id, teacher).subscribe({
      next: () => {
        this.alertService.toast('Docente actualizado correctamente', 'success');
        this.goToList();
      },
      error: (error) => {
        const message = error.error?.error || 'Error al actualizar el docente';
        this.alertService.toast(message, 'error');
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('/teachers/list');
  }

}
