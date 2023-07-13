import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichDetailsComponent } from './sandwich-details.component';

describe('SandwichDetailsComponent', () => {
  let component: SandwichDetailsComponent;
  let fixture: ComponentFixture<SandwichDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SandwichDetailsComponent]
    });
    fixture = TestBed.createComponent(SandwichDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
