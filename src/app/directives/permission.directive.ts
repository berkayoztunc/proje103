import { Directive, ElementRef, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { StoreService } from '../services/store.service';

@Directive({
  selector: '[permissions]'
})
export class PermissionDirective {


  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    public storage: StoreService
  ) {
  }

  @Input()
  set permissions(val) {

    const permissions = this.storage.auth.mapedPermissions;
    if (permissions.includes(val)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
