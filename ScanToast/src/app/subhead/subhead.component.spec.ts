import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubheadComponent } from './subhead.component';

describe('SubheadComponent', () => {
  let component: SubheadComponent;
  let fixture: ComponentFixture<SubheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubheadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
