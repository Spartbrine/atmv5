import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayservicesComponent } from './payservices.component';

describe('PayservicesComponent', () => {
  let component: PayservicesComponent;
  let fixture: ComponentFixture<PayservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
