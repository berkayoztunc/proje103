import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {StoreService} from '../services/store.service';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private storage : StoreService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // let parentPath = route.routeConfig.path;
        if (this.iscurrentUser() && this.istoken()) {
          if (route.routeConfig.path === 'dashboard') { return true; }
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
        
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    istoken() { if (this.storage.auth.token) { return true; } else { return false; }}
    iscurrentUser() { if (this.storage.auth.user && this.storage.auth.token) { return true; } else { return false; }}

}
