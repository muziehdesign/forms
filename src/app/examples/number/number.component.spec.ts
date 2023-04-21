import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberComponent } from './number.component';

describe('OrderComponent', () => {
  let component: NumberComponent;
  let fixture: ComponentFixture<NumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
