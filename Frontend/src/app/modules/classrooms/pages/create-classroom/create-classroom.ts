import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateClassroomRequest } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-create-classroom',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-classroom.html',
})
export class CreateClassroom {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private classroomService = inject(ClassroomService);

  classroomForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    building: ['', [Validators.required, Validators.maxLength(100)]],
    capacity: [1, [Validators.required, Validators.min(1), Validators.max(200), Validators.pattern('^[0-9]+$')]],
    projector: [false],
    status: [true]
  });

  createClassroom(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
      return;
    }
    const classroom: CreateClassroomRequest = this.classroomForm.getRawValue();
    this.classroomService.create(classroom).subscribe({
      next: () => {
        this.alertService.toast('Salón registrado correctamente', 'success');
        this.router.navigateByUrl('/classrooms/list');
      },
      error: (error) => {
        const message = error.error?.error || 'Error al registrar el salón';
        this.alertService.toast(message, 'error');
      }
    });
  }

}
