import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageComponent } from './mortgage.component';

describe('MortgageComponent', () => {
  let component: MortgageComponent;
  let fixture: ComponentFixture<MortgageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
