import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import IMask, { InputMask } from 'imask';
import { MaskFactoryService } from './mask-factory.service';

@Directive({
    selector: '[mzMask]',
})
export class MaskDirective implements OnInit, OnDestroy {
    @Input('mzMask') maskName!: string;
    maskRef!: InputMask<{ mask: string; }>;

    constructor(private el: ElementRef<HTMLInputElement>, private maskFactory: MaskFactoryService) {}

    ngOnInit(): void {
        const options = this.maskFactory.getMask(this.maskName);
        if (options) {
            this.maskRef = IMask(this.el.nativeElement, options);
        }
    }

    ngOnDestroy(): void {
        if (this.maskRef) {
            this.maskRef.destroy();
        }
    }
}
