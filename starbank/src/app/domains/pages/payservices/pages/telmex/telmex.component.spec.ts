import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelmexComponent } from './telmex.component';

describe('TelmexComponent', () => {
  let component: TelmexComponent;
  let fixture: ComponentFixture<TelmexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelmexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelmexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
