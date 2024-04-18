import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JapayComponent } from './japay.component';

describe('JapayComponent', () => {
  let component: JapayComponent;
  let fixture: ComponentFixture<JapayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JapayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JapayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
