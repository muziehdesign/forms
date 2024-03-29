import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringComponent } from './string.component';

describe('TicketComponent', () => {
  let component: StringComponent;
  let fixture: ComponentFixture<StringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
