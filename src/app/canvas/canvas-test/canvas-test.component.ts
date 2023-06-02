import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MaterialModule } from '@app/shared';
import { CanvasService } from '../services/canvas.service';

@Component({
  selector: 'app-canvas-test',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './canvas-test.component.html',
  styleUrls: ['./canvas-test.component.scss'],
})
export class CanvasTestComponent {
  @Input({ required: true }) courses!: CanvasCourse[];

  canvas = inject(CanvasService);
  course?: number;

  paths = [
    'activity_stream',
    'activity_stream/summary',
    'analytics/activity',
    'analytics/assignments',
    'analytics/student_summaries',
    'analytics/users/{student_id}/activity',
    'analytics/users/{student_id}/assignments',
    'analytics/users/{student_id}/communication',
    'assignment_groups',
    'assignment_groups/{assignment_group_id}',
    'assignment_groups/{assignment_group_id}/assignments',
    'assignments',
    'assignments/gradeable_students',
    'assignments/overrides',
    'assignments/{assignment_id}/anonymous_provisional_grades/status',
    'assignments/{assignment_id}/anonymous_submissions/{anonymous_id}',
    'assignments/{assignment_id}/gradeable_students',
    'assignments/{assignment_id}/moderated_students',
    'assignments/{assignment_id}/overrides',
    'assignments/{assignment_id}/overrides/{id}',
    'assignments/{assignment_id}/peer_reviews',
    'assignments/{assignment_id}/provisional_grades/status',
    'assignments/{assignment_id}/submission_summary',
    'assignments/{assignment_id}/submissions',
    'assignments/{assignment_id}/submissions/{submission_id}/peer_reviews',
    'assignments/{assignment_id}/submissions/{user_id}',
    'assignments/{assignment_id}/submissions/{user_id}/document_annotations/read',
    'assignments/{assignment_id}/submissions/{user_id}/rubric_assessments/read',
    'assignments/{assignment_id}/submissions/{user_id}/rubric_comments/read',
    'assignments/{id}',
    'blackout_dates',
    'blackout_dates/new',
    'blackout_dates/{id}',
    'blueprint_subscriptions',
    'blueprint_subscriptions/{subscription_id}/migrations',
    'blueprint_subscriptions/{subscription_id}/migrations/{id}',
    'blueprint_subscriptions/{subscription_id}/migrations/{id}/details',
    'blueprint_templates/{template_id}',
    'blueprint_templates/{template_id}/associated_courses',
    'blueprint_templates/{template_id}/migrations',
    'blueprint_templates/{template_id}/migrations/{id}',
    'blueprint_templates/{template_id}/migrations/{id}/details',
    'blueprint_templates/{template_id}/unsynced_changes',
    'bulk_user_progress',
    'calendar_events/timetable',
    'collaborations',
    'conferences',
    'content_exports',
    'content_exports/{id}',
    'content_licenses',
    'content_migrations',
    'content_migrations/migrators',
    'content_migrations/{content_migration_id}/migration_issues',
    'content_migrations/{content_migration_id}/migration_issues/{id}',
    'content_migrations/{id}',
    'content_migrations/{id}/asset_id_mapping',
    'content_migrations/{id}/selective_data',
    'content_share_users',
    'course_copy/{id}',
    'course_pacing/{id}',
    'csp_settings',
    'custom_gradebook_columns',
    'custom_gradebook_columns/{id}/data',
    'discussion_topics',
    'discussion_topics/{topic_id}',
    'discussion_topics/{topic_id}/entries',
    'discussion_topics/{topic_id}/entries/{entry_id}/replies',
    'discussion_topics/{topic_id}/entry_list',
    'discussion_topics/{topic_id}/view',
    'effective_due_dates',
    'enrollments',
    'epub_exports/{id}',
    'external_feeds',
    'external_tools',
    'external_tools/sessionless_launch',
    'external_tools/visible_course_nav_tools',
    'external_tools/{external_tool_id}',
    'features',
    'features/enabled',
    'features/flags/{feature}',
    'files',
    'files/file_ref/{migration_id}',
    'files/quota',
    'files/{id}',
    'folders',
    'folders/by_path',
    'folders/by_path/*full_path',
    'folders/media',
    'folders/{id}',
    'front_page',
    'gradebook_history/days',
    'gradebook_history/feed',
    'gradebook_history/{date}',
    'gradebook_history/{date}/graders/{grader_id}/assignments/{assignment_id}/submissions',
    'grading_periods',
    'grading_periods/{id}',
    'grading_standards',
    'grading_standards/{grading_standard_id}',
    'group_categories',
    'groups',
    'live_assessments',
    'live_assessments/{assessment_id}/results',
    'media_objects',
    'module_item_sequence',
    'modules',
    'modules/{id}',
    'modules/{module_id}/items',
    'modules/{module_id}/items/{id}',
    'new_quizzes/assignment_overrides',
    'outcome_alignments',
    'outcome_group_links',
    'outcome_groups',
    'outcome_groups/{id}',
    'outcome_groups/{id}/outcomes',
    'outcome_groups/{id}/subgroups',
    'outcome_imports/{id}',
    'outcome_imports/{id}/created_group_ids',
    'outcome_proficiency',
    'outcome_results',
    'outcome_rollups',
    'pages',
    'pages/{url_or_id}',
    'pages/{url_or_id}/revisions',
    'pages/{url_or_id}/revisions/latest',
    'pages/{url_or_id}/revisions/{revision_id}',
    'permissions',
    'potential_collaborators',
    'quizzes',
    'quizzes/assignment_overrides',
    'quizzes/{id}',
    'quizzes/{quiz_id}/groups/{id}',
    'quizzes/{quiz_id}/ip_filters',
    'quizzes/{quiz_id}/questions',
    'quizzes/{quiz_id}/questions/{id}',
    'quizzes/{quiz_id}/reports',
    'quizzes/{quiz_id}/reports/{id}',
    'quizzes/{quiz_id}/statistics',
    'quizzes/{quiz_id}/submission',
    'quizzes/{quiz_id}/submissions',
    'quizzes/{quiz_id}/submissions/{id}',
    'quizzes/{quiz_id}/submissions/{id}/events',
    'quizzes/{quiz_id}/submissions/{id}/time',
    'recent_students',
    'root_outcome_group',
    'rubrics',
    'rubrics/{id}',
    'search_users',
    'sections',
    'sections/{id}',
    'settings',
    'student_view_student',
    'students',
    'students/submissions',
    'tabs',
    'todo',
    'users',
    'users/{id}',
    'users/{user_id}/progress',
  ];

  path?: string; // e.g. 'quizzes/{assignment_id}/items/{item_id}'
  params?: string[]; // e.g. ['assignment_id', 'item_id']
  paramVals = new Map<string, string>(); // e.g. [['assignment_id', 'yyy'], ['item_id', 'xxx']]
  result?: Object;

  selectPath(path: string) {
    this.result = undefined;
    this.path = path;
    this.params =
      path.match(/{(\w+)}/g)?.map((match) => match.slice(1, -1)) || [];
  }

  updateParamVal(key: string, target: EventTarget | null) {
    this.paramVals.set(key, (target as HTMLInputElement)?.value || '');
  }

  async go() {
    const endpoint = this.params?.reduce((result, param) => {
      const value = this.paramVals.get(param) || '';
      return result?.replace(`{${param}}`, value);
    }, this.path);
    this.result = await this.canvas.query(`courses/${this.course}/${endpoint}`);
  }
}
