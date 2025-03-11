import { AfterContentInit, Component, ContentChild, ContentChildren, DestroyRef, Input, QueryList } from '@angular/core';
import { NgModel } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'mzField',
    standalone: true,
    imports: [JsonPipe],
    templateUrl: './field.component.html',
    styleUrl: './field.component.scss',
})
export class FieldComponent implements AfterContentInit {
    @Input() label?: string;
    @ContentChild(NgModel) ngModel!: NgModel;
    constructor(private destroyRef: DestroyRef) {}

    async ngAfterContentInit() {
        console.log('path: ', this.ngModel.path);
    }

    getErrorMessage(): string | undefined {
        try {
            const list = Object.values(this.ngModel.errors!);
            return list[0];
        } catch {
            return undefined;
        }
    }
}
