import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-applicant',
    templateUrl: './applicant.component.html',
    styleUrls: ['./applicant.component.scss'],
    standalone: false
})
export class ApplicantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  submitForm(): void {
    console.log('submit');
  }
}
