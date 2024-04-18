import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsmenuComponent } from './creditsmenu.component';

describe('CreditsmenuComponent', () => {
  let component: CreditsmenuComponent;
  let fixture: ComponentFixture<CreditsmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditsmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditsmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
