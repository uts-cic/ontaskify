import { TestBed } from '@angular/core/testing';

import { OntaskService } from './ontask.service';

describe('OntaskService', () => {
  let service: OntaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OntaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
