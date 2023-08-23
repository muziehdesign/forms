import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, FieldError, max, min, NumberType, required, StringType } from '@muziehdesign/forms';
import { NumberExampleModel } from './number-example.model';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements AfterViewInit {

  model: NumberExampleModel;
  modelState!: NgFormModelState<NumberExampleModel>;
  @ViewChild('exampleForm', {static: true}) exampleForm!: NgForm;

  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new NumberExampleModel();
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.exampleForm, this.model);
  }

  usePresetValues() {
    this.model.requiredNumber = 5;
    this.model.optionalNumber = undefined;
  }

  async submitForm() {
    await this.modelState.validate();
  }
}