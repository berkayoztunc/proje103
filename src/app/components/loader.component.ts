import { Input, Component, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'loader',
    template: `
    <div id="blocker" class="blocker" *ngIf="showIf ">
        <div class="fa-3x">
            <div class="fa-logo fa-spin"></div>
        </div>
    </div>
    <ng-content class="loader"></ng-content>
  `,
    styles: [`
    :host {
      position: relative;
      display: block;
    }
    
    .blocker {
      display:flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1500;
      padding:0.02px;
      background-color: rgba(255,255,255,0.5);
    }
    
  `],
})
export class LoaderComponent {
    @Input('showIf') showIf: boolean;
    constructor() { }
}