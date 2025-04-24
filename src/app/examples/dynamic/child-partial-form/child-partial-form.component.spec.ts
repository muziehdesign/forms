import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPartialFormComponent } from './child-partial-form.component';

describe('ChildPartialFormComponent', () => {
  let component: ChildPartialFormComponent;
  let fixture: ComponentFixture<ChildPartialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildPartialFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildPartialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
