import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeleteComponent} from './delete/delete.component'

const routes: Routes = [
  {path:'',component:FormComponent},
   {path:'list',component:ListComponent},
   {path:'update',component:UpdateComponent},
   {path:'delete',component:DeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
