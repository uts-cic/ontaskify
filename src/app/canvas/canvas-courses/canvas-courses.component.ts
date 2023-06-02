import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared';

@Component({
  selector: 'app-canvas-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './canvas-courses.component.html',
  styleUrls: ['./canvas-courses.component.scss'],
})
export class CanvasCoursesComponent {
  @Input({ required: true }) courses!: CanvasCourse[];
}
