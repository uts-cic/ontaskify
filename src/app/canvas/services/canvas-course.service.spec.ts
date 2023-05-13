import { TestBed } from '@angular/core/testing';

import { CanvasCourseService } from './canvas-course.service';

describe('CanvasCourseService', () => {
  let service: CanvasCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
