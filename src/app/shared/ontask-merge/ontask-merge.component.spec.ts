import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntaskMergeComponent } from './ontask-merge.component';

describe('OntaskMergeComponent', () => {
  let component: OntaskMergeComponent;
  let fixture: ComponentFixture<OntaskMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OntaskMergeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OntaskMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
