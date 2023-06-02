import { HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasCourseService {
  private canvasService = inject(CanvasService);
  course = signal<CanvasCourse | null>(null);
  path = computed(() => `courses/${this.course()?.id || 0}`);

  async getStudents(): Promise<CanvasUserProfile[]> {
    const params = new HttpParams().set('enrollment_type', 'student');
    return this.canvasService.queryMany<CanvasUserProfile>(
      `${this.path()}/users`,
      params
    );
  }

  async getStudentSummaries(): Promise<CanvasStudentSummary[]> {
    return this.canvasService.queryMany<CanvasStudentSummary>(
      `${this.path()}/analytics/student_summaries`
    );
  }

  async getBulkUserProgress(): Promise<CanvasUserProgress[]> {
    return this.canvasService.queryMany<CanvasUserProgress>(
      `${this.path()}/bulk_user_progress`
    );
  }

  async getEnrollments(): Promise<CanvasEnrollment[]> {
    const params = new HttpParams().set('type', 'StudentEnrollment');
    return this.canvasService.queryMany<CanvasEnrollment>(
      `${this.path()}/enrollments`,
      params
    );
  }

  async getAssignments(): Promise<CanvasAssignment[]> {
    return this.canvasService.queryMany<CanvasAssignment>(
      `${this.path()}/assignments`
    );
  }

  async getAssignmentSubmissions(
    assignmentId: number
  ): Promise<CanvasAssignmentSubmission[]> {
    return this.canvasService.queryMany<CanvasAssignmentSubmission>(
      `${this.path()}/assignments/${assignmentId}/submissions`
    );
  }

  async getQuizzes(): Promise<CanvasQuiz[]> {
    return this.canvasService.queryMany<CanvasQuiz>(`${this.path()}/quizzes`);
  }

  async getQuizSubmissions(quizId: number): Promise<CanvasQuiz[]> {
    return this.canvasService.queryMany<CanvasQuiz>(
      `${this.path()}/quizzes/${quizId}/submissions`,
      new HttpParams(),
      'quiz_submissions'
    );
  }

  async getDiscussionTopics(): Promise<CanvasDiscussionTopic[]> {
    return this.canvasService.queryMany<CanvasDiscussionTopic>(
      `${this.path()}/discussion_topics`
    );
  }

  async getDiscussionEntries(
    topicId: number
  ): Promise<CanvasDiscussionEntry[]> {
    const { view } = await this.canvasService.query<CanvasDiscussionTopicView>(
      `${this.path()}/discussion_topics/${topicId}/view`
    );
    return view;
  }

  reset() {
    this.course.set(null);
  }
}
