import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowAll]'
})
export class ShowAllDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('inherit');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('nowrap');
  }

  private highlight(px: string) {
    this.el.nativeElement.style.whiteSpace = px;
  }
}