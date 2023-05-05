import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasConnectComponent } from './canvas-connect.component';

describe('CanvasConnectComponent', () => {
  let component: CanvasConnectComponent;
  let fixture: ComponentFixture<CanvasConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CanvasConnectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
