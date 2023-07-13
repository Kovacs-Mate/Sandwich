import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichComponent } from './sandwich.component';

describe('SandwichComponent', () => {
  let component: SandwichComponent;
  let fixture: ComponentFixture<SandwichComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SandwichComponent]
    });
    fixture = TestBed.createComponent(SandwichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
