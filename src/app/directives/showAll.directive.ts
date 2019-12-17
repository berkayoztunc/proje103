import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowAll]'
})
export class ShowAllDirective {
  tool = false;
  constructor(private el: ElementRef) { }

  @HostListener('click') onMouseEnter() {
    this.highlight();
  }
  private highlight() {
    this.tool = !this.tool;
    if(this.tool){
      this.el.nativeElement.style.whiteSpace = 'inherit';

    }else{
      this.el.nativeElement.style.whiteSpace = 'nowrap';

    }
  }
}
