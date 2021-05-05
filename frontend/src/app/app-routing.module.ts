import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeleteComponent} from './delete/delete.component'
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'user',component:UserComponent},
  {path:'',component:FormComponent,canActivate:[AuthGuard]},
   {path:'list',component:ListComponent,canActivate:[AuthGuard]},
   {path:'update',component:UpdateComponent,canActivate:[AuthGuard]},
   {path:'delete',component:DeleteComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
