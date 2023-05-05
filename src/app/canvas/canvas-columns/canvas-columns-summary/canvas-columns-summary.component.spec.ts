import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasColumnsSummaryComponent } from './canvas-columns-summary.component';

describe('CanvasColumnsSummaryComponent', () => {
  let component: CanvasColumnsSummaryComponent;
  let fixture: ComponentFixture<CanvasColumnsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CanvasColumnsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasColumnsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
