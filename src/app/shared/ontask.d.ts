interface OntaskStudent {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  [prop: string]: string | number | null;
  // pageViews?: number;
  // pageViewsLevel?: number;
  // participations?: number;
  // participationsLevel?: number;
}

interface OntaskRowData {
  [prop: string]: string | number | null;
}

interface OntaskRow {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  [prop: string]: string | number | null;
}
