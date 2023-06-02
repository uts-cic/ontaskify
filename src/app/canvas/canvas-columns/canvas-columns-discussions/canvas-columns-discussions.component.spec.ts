import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasColumnsDiscussionsComponent } from './canvas-columns-discussions.component';

describe('CanvasColumnsDiscussionsComponent', () => {
  let component: CanvasColumnsDiscussionsComponent;
  let fixture: ComponentFixture<CanvasColumnsDiscussionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CanvasColumnsDiscussionsComponent]
    });
    fixture = TestBed.createComponent(CanvasColumnsDiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
