interface OntaskStudent {
  id: number;
  sid: string;
  firstName: string;
  lastName: string;
  email: string | null;
  [prop: string]: string | number | null;
  // pageViews?: number;
  // pageViewsLevel?: number;
  // participations?: number;
  // participationsLevel?: number;
}
