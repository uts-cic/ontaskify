import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../shared/material.module';
import { CanvasService } from '../services/canvas.service';

@Component({
  selector: 'app-canvas-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './canvas-courses.component.html',
  styleUrls: ['./canvas-courses.component.scss'],
})
export class CanvasCoursesComponent implements OnInit {
  private canvas = inject(CanvasService);

  courses$!: Observable<Course[]>;

  ngOnInit() {
    this.courses$ = this.canvas.getCourses();
  }
}
