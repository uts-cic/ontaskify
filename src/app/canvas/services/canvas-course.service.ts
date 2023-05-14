import { Injectable, computed, inject, signal } from '@angular/core';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasCourseService {
  private canvasService = inject(CanvasService);
  course = signal<Course | null>(null);
  path = computed(() => `courses/${this.course()?.id || 0}`);

  async getStudentSummaries(): Promise<StudentSummary[]> {
    return this.canvasService.query<StudentSummary[]>(
      `${this.path()}/analytics/student_summaries`
    );
  }

  async getBulkUserProgress(): Promise<UserProgress[]> {
    return this.canvasService.query<UserProgress[]>(
      `${this.path()}/bulk_user_progress`
    );
  }

  async getEnrollments(): Promise<CanvasEnrollment[]> {
    return this.canvasService.query<CanvasEnrollment[]>(
      `${this.path()}/enrollments`
    );
  }

  async getAssignments(): Promise<CanvasAssignment[]> {
    return this.canvasService.query<CanvasAssignment[]>(
      `${this.path()}/assignments`
    );
  }

  async getAssignmentSubmissions(
    assignmentId: number
  ): Promise<CanvasSubmission[]> {
    return this.canvasService.query<UserProgress[]>(
      `${this.path()}/assignments/${assignmentId}/submissions`
    );
  }

  reset() {
    this.course.set(null);
  }
}
