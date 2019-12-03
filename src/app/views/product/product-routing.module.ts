import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent} from './product.component';
import { ProductFormComponent } from './form/product-form.component';
const routes: Routes = [
    { path: '', component: ProductComponent},
    //{ path: 'form', component :ProductFormComponent },    
   

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class ProductRoutingModule { }