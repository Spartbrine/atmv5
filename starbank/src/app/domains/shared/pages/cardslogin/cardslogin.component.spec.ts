import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsloginComponent } from './cardslogin.component';

describe('CardsloginComponent', () => {
  let component: CardsloginComponent;
  let fixture: ComponentFixture<CardsloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
