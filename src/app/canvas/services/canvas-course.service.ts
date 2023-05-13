import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasCourseService {
  private canvasService = inject(CanvasService);
  course = signal<Course | null>(null);
  courseId = computed(() => this.course()?.id || 0);

  async getStudentSummaries(): Promise<StudentSummary[]> {
    const source$ = this.canvasService.getStudentSummaries(this.courseId());
    return firstValueFrom(source$);
  }

  async getAssignments(): Promise<CanvasAssignment[]> {
    const source$ = this.canvasService.getAssignments(this.courseId());
    return firstValueFrom(source$);
  }

  async getAssignmentSubmissions(
    assignmentId: number
  ): Promise<CanvasSubmission[]> {
    const source$ = this.canvasService.getAssignmentSubmissions(
      this.courseId(),
      assignmentId
    );
    return firstValueFrom(source$);
  }

  reset() {
    this.course.set(null);
  }
}
