import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MailingAddressComponent } from './mailing-address.component';

xdescribe('MailingAddressComponent', () => {
  let component: MailingAddressComponent;
  let fixture: ComponentFixture<MailingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ MailingAddressComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
