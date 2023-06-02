interface CanvasUserProfile {
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

interface CanvasCourse {
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
  grading_periods?: {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
  }[];
  grading_standard_id?: number;
  grade_passback_setting?: string;
  created_at?: string;
  start_at?: string;
  end_at?: string;
  locale?: string;
  enrollments?: {
    type: string;
    role: string;
    computed_final_score: number;
    computed_current_score: number;
    computed_final_grade: string;
    computed_current_grade: string;
    current_grading_period_title: string;
  }[];
  total_students?: number;
  calendar?: {
    ics: string;
  };
  default_view?: 'feed' | 'wiki' | 'modules' | 'syllabus' | 'assignments';
  syllabus_body?: string;
  needs_grading_count?: number;
  term?: {
    id: number;
    name: string;
    start_at: string;
    end_at: string;
  };
  course_progress?: {
    requirement_count: number;
    requirement_completed_count: number;
    next_requirement_url: string;
    completed_at: string;
    user_id: number;
    workflow_state: string;
  };
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

interface CanvasStudentSummary {
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

interface CanvasAssignmentSubmission {
  assignment_id?: number;
  attempt?: number;
  body?: string;
  grade?: string;
  grade_matches_current_submission?: boolean;
  html_url?: string;
  preview_url?: string;
  score?: number;
  submission_type?:
    | 'online_text_entry'
    | 'online_url'
    | 'online_upload'
    | 'media_recording'
    | 'student_annotation';
  submitted_at?: string;
  url?: string;
  user_id?: number;
  grader_id?: number;
  graded_at?: string;
  late?: boolean;
  assignment_visible?: boolean;
  excused?: boolean;
  missing?: boolean;
  late_policy_status?: 'late' | 'missing' | 'extended' | 'none' | null;
  points_deducted?: number;
  seconds_late?: number;
  workflow_state?: 'graded' | 'submitted' | 'unsubmitted' | 'pending_review';
  extra_attempts?: number;
  anonymous_id?: string;
  posted_at?: string;
  read_status?: 'read' | 'unread';
  redo_request?: boolean;
}

interface CanvasUserProgress {
  id: number;
  anonymous_id: string;
  display_name: string;
  avatar_image_url: string;
  html_url: string;
  pronouns: string | null;
  progress: {
    requirement_count: number;
    requirement_completed_count: number;
    next_requirement_url: string | null;
    completed_at: string | null;
  };
}

interface CanvasEnrollment {
  id: number;
  course_id: number;
  sis_course_id: string;
  course_integration_id: string;
  course_section_id: number;
  section_integration_id: string;
  sis_account_id: string;
  sis_section_id: string;
  sis_user_id: string;
  enrollment_state: string;
  limit_privileges_to_course_section: boolean;
  sis_import_id: number;
  root_account_id: number;
  type: string;
  user_id: number;
  associated_user_id: number;
  role: string;
  role_id: number;
  created_at: string;
  updated_at: string;
  start_at: string;
  end_at: string;
  last_activity_at: string;
  last_attended_at: string;
  total_activity_time: number;
  html_url: string;
  grades: {
    html_url: string;
    current_grade: string;
    final_grade: string;
    current_score: string;
    final_score: string;
    current_points: number;
    unposted_current_grade: string;
    unposted_final_grade: string;
    unposted_current_score: string;
    unposted_final_score: string;
    unposted_current_points: number;
  };
  user: string;
  override_grade: string;
  override_score: number;
  unposted_current_grade: string;
  unposted_final_grade: string;
  unposted_current_score: string;
  unposted_final_score: string;
  has_grading_periods: boolean;
  totals_for_all_grading_periods_option: boolean;
  current_grading_period_title: string;
  current_grading_period_id: number;
  current_period_override_grade: string;
  current_period_override_score: number;
  current_period_unposted_current_score: number;
  current_period_unposted_final_score: number;
  current_period_unposted_current_grade: string;
  current_period_unposted_final_grade: string;
}

interface CanvasQuiz {
  id: number;
  title: string;
  html_url: string;
  mobile_url: string;
  description: string;
  quiz_type: string;
  time_limit: number | null;
  timer_autosubmit_disabled: boolean;
  shuffle_answers: boolean;
  show_correct_answers: boolean;
  scoring_policy: string;
  allowed_attempts: number;
  one_question_at_a_time: boolean;
  question_count: number;
  points_possible: number;
  cant_go_back: boolean;
  ip_filter: string | null;
  due_at: string | null;
  lock_at: string | null;
  unlock_at: string | null;
  published: boolean;
  locked_for_user: boolean;
  lock_info: {
    missing_permission: string;
    asset_string: string;
  };
  lock_explanation: string;
  hide_results: boolean | null;
  show_correct_answers_at: string | null;
  hide_correct_answers_at: string | null;
  all_dates: {
    due_at: string | null;
    unlock_at: string | null;
    lock_at: string | null;
    base: boolean;
  }[];
  can_update: boolean;
  require_lockdown_browser: boolean;
  require_lockdown_browser_for_results: boolean;
  require_lockdown_browser_monitor: boolean;
  lockdown_browser_monitor_data: string | null;
  permissions: {
    manage: boolean;
    read: boolean;
    create: boolean;
    update: boolean;
    submit: boolean;
    preview: boolean;
    delete: boolean;
    read_statistics: boolean;
    grade: boolean;
    review_grades: boolean;
    view_answer_audits: boolean;
  };
  quiz_reports_url: string;
  quiz_statistics_url: string;
  important_dates: boolean;
  quiz_submission_versions_html_url: string;
  assignment_id: number | null;
  one_time_results: boolean;
  assignment_group_id: number;
  show_correct_answers_last_attempt: boolean;
  version_number: number;
  has_access_code: boolean;
  post_to_sis: boolean | null;
  migration_id: string | null;
  in_paced_course: boolean;
}

type CanvasDiscussionTopic = {
  id: number;
  title?: string;
  message?: string;
  html_url?: string;
  posted_at?: string;
  last_reply_at?: string;
  require_initial_post?: boolean;
  user_can_see_posts?: boolean;
  discussion_subentry_count?: number;
  read_state?: 'read' | 'unread';
  unread_count?: number;
  subscribed?: boolean;
  subscription_hold?:
    | 'initial_post_required'
    | 'not_in_group_set'
    | 'not_in_group'
    | 'topic_is_announcement';
  assignment_id?: number | null;
  delayed_post_at?: string;
  published?: boolean;
  lock_at?: string;
  locked?: boolean;
  pinned?: boolean;
  locked_for_user?: boolean;
  lock_info?: LockInfo;
  lock_explanation?: string;
  user_name?: string;
  topic_children?: number[];
  group_topic_children?: {
    id: number;
    group_id: number;
  }[];
  root_topic_id?: number;
  podcast_url?: string;
  discussion_type?: 'side_comment' | 'threaded';
  group_category_id?: number | null;
  attachments?: {
    'content-type'?: string;
    url?: string;
    filename?: string;
    display_name?: string;
  }[];
  permissions?: object;
  allow_rating?: boolean;
  only_graders_can_rate?: boolean;
  sort_by_rating?: boolean;
};

type CanvasDiscussionEntry = {
  id: number;
  editor_id: number;
  user_id: number;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  rating_count: number | null;
  rating_sum: number | null;
  message: string;
  replies: CanvasDiscussionEntry[];
};

type CanvasDiscussionTopicView = {
  unread_entries: number[];
  forced_entries: any[];
  entry_ratings: Record<string, any>;
  participants: {
    id: number;
    anonymous_id: string | null;
    display_name: string;
    avatar_image_url: string;
    html_url: string;
    pronouns: string | null;
  }[];
  view: CanvasDiscussionEntry[];
  new_entries: any[];
};
