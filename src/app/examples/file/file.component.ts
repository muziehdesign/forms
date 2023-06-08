import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FieldError, ModelSchemaFactory, NgFormModelState, NgFormModelStateFactory, FileType, required } from '@muziehdesign/forms';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements AfterViewInit {
  model: FileModel;
  modelState!: NgFormModelState<FileModel>;
  @ViewChild('fileInputForm', { static: true }) fileInputForm!: NgForm;

  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new FileModel();
  }

  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.fileInputForm, this.model, { onValidate: (errors) => this.onValidate(errors, this.model) });
  }

  async submit() {
    const result = await this.modelState.validate();

    if (result.valid) {
      console.log('no errors');
    }
    else {
      console.log(result.errors[0].message);
    }
  }

  onValidate(modelErrors: FieldError[], model: FileModel): Promise<FieldError[]> {
    const errors: FieldError[] = [];

    return Promise.resolve([...modelErrors, ...errors]);
  }
}

export class FileModel {
  @FileType(required('Please select a file'))
  file?: File;
}
