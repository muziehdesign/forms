import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, NgControl, NgModel } from '@angular/forms';

@Component({
  selector: 'mz-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.css']
})
export class FieldErrorsComponent implements OnInit {

  @Input() field?: NgControl;
  constructor() {}

  ngOnInit(): void { }

}
