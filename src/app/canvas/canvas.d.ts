interface UserProfile {
  id: number;
  name: string;
  sortable_name: string;
  short_name: string;
  sis_user_id: string;
  integration_id: string | null;
  login_id: string;
  email: string;
  locale: string;
  time_zone: string;
  bio: string | null;
  avatar_url: string;
  primary_email: string;
  effective_locale: string;
}

interface GradingPeriod {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
}

interface Enrollment {
  type: string;
  role: string;
  computed_final_score: number;
  computed_current_score: number;
  computed_final_grade: string;
  computed_current_grade: string;
  current_grading_period_title: string;
}

interface CalendarLink {
  ics: string;
}

interface Term {
  id: number;
  name: string;
  start_at: string;
  end_at: string;
}

interface CourseProgress {
  requirement_count: number;
  requirement_completed_count: number;
  next_requirement_url: string;
  completed_at: string;
  user_id: number;
  workflow_state: string;
}

interface Course {
  id?: number;
  sis_course_id?: string;
  uuid?: string;
  integration_id?: string;
  sis_import_id?: number;
  name?: string;
  course_code?: string;
  original_name?: string;
  workflow_state?: 'unpublished' | 'available' | 'completed' | 'deleted';
  account_id?: number;
  root_account_id?: number;
  enrollment_term_id?: number;
  grading_periods?: GradingPeriod[];
  grading_standard_id?: number;
  grade_passback_setting?: string;
  created_at?: string;
  start_at?: string;
  end_at?: string;
  locale?: string;
  enrollments?: Enrollment[];
  total_students?: number;
  calendar?: CalendarLink;
  default_view?: 'feed' | 'wiki' | 'modules' | 'syllabus' | 'assignments';
  syllabus_body?: string;
  needs_grading_count?: number;
  term?: Term;
  course_progress?: CourseProgress;
  apply_assignment_group_weights?: boolean;
  permissions?: any;
  is_public?: boolean;
  is_public_to_auth_users?: boolean;
  public_syllabus?: boolean;
  public_syllabus_to_auth?: boolean;
  public_description?: string;
  storage_quota_mb?: number;
  storage_quota_used_mb?: number;
  hide_final_grades?: boolean;
  license?: string;
  allow_student_assignment_edits?: boolean;
  allow_wiki_comments?: boolean;
  allow_student_forum_attachments?: boolean;
  open_enrollment?: boolean;
  self_enrollment?: boolean;
  restrict_enrollments_to_course_dates?: boolean;
  course_format?: string;
  access_restricted_by_date?: boolean;
  time_zone?: string;
  blueprint?: boolean;
  blueprint_restrictions?: any;
  blueprint_restrictions_by_object_type?: any;
  template?: boolean;
}

interface Student {
  id: number;
  name: string;
  email: string;
  login_id: string;
  sis_user_id: string;
  sortable_name: string;
  short_name: string;
  enrollment_state: string;
  avatar_url: string;
}

interface StudentSummary {
  id: number;
  user_id: number;
  current_score: number;
  final_score: number;
  page_views: number;
  page_views_level: number;
  participations: number;
  participations_level: number;
  assignments_submitted: number;
  assignments_graded: number;
  discussions_participated: number;
  discussions_created: number;
  wiki_edits: number;
}

interface CanvasAssignment {
  id: number;
  name: string;
  description: string;
  due_at: string;
  unlock_at: string;
  lock_at: string;
  points_possible: number;
  grading_type: string;
  submission_types: string[];
  allowed_extensions: string[];
  max_attempts: number;
  grading_standard_id: number | null;
  published: boolean;
  unpublishable: boolean;
  assignment_group_id: number;
  peer_reviews: boolean;
  automatic_peer_reviews: boolean;
  position: number;
  grade_group_students_individually: boolean;
  anonymous_submissions: boolean;
  group_category_id: number | null;
  post_to_sis: boolean;
  moderated_grading: boolean;
  omit_from_final_grade: boolean;
  intra_group_peer_reviews: boolean;
  anonymous_peer_reviews: boolean;
  discussion_topic: any;
  freeze_on_copy: boolean;
  frozen: boolean;
  is_quiz_assignment: boolean;
  can_duplicate: boolean;
  original_course_id: number;
  original_assignment_id: number;
  original_assignment_name: string;
  original_quiz_id: number;
  workflow_state: string;
  muted: boolean;
  html_url: string;
  url: string;
  quiz_id: number | null;
}
