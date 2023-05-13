type OntaskValue = string | number | null;
type OntaskRow = {
  [prop: string]: OntaskValue;
};
type OntaskMergeMap = Map<OntaskValue, OntaskRow>;
