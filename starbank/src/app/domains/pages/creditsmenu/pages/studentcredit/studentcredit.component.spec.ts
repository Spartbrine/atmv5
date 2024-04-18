import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentcreditComponent } from './studentcredit.component';

describe('StudentcreditComponent', () => {
  let component: StudentcreditComponent;
  let fixture: ComponentFixture<StudentcreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentcreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
