import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelComponent} from './channel.component';
const routes: Routes = [
    { path: '', component: ChannelComponent},
    // { path: 'form', component :ChannelFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class ChannelRoutingModule { }
