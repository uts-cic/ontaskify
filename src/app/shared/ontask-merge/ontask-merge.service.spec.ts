import { TestBed } from '@angular/core/testing';

import { OntaskMergeService } from './ontask-merge.service';

describe('OntaskMergeService', () => {
  let service: OntaskMergeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OntaskMergeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
