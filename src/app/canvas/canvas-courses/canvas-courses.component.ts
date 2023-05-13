import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { CanvasService } from '../services/canvas.service';

@Component({
  selector: 'app-canvas-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './canvas-courses.component.html',
  styleUrls: ['./canvas-courses.component.scss'],
})
export class CanvasCoursesComponent {
  // @Input({ required: true }) courses!: Course[];
  courses$ = inject(CanvasService).getCourses();
}
