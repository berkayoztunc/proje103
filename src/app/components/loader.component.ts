import { Input, Component, Renderer2, ElementRef, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
    selector: 'loader',
    template: `
    <div  class="blocker" *ngIf="bool">
        <div class="fa-3x">
            <div class="fa-logo fa-spin"></div>
        </div>
    </div>
    <ng-content class="loader"></ng-content>`,
})
export class LoaderComponent implements AfterViewChecked {

    constructor(private ref: ChangeDetectorRef, private request: RequestService) { }
    bool: boolean;
    ngAfterViewChecked(): void {
      this.bool = this.request.onTheGo;
      this.ref.detectChanges();
    }


}
