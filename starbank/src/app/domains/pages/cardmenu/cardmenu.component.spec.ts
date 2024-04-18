import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardmenuComponent } from './cardmenu.component';

describe('CardmenuComponent', () => {
  let component: CardmenuComponent;
  let fixture: ComponentFixture<CardmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
