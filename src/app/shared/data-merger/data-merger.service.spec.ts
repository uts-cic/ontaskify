import { TestBed } from '@angular/core/testing';

import { DataMergerService } from './data-merger.service';

describe('DataMergerService', () => {
  let service: DataMergerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMergerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
