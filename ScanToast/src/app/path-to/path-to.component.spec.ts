import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathToComponent } from './path-to.component';

describe('PathToComponent', () => {
  let component: PathToComponent;
  let fixture: ComponentFixture<PathToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathToComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PathToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
