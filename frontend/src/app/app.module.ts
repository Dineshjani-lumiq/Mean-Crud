import { AuthGuard } from './auth/auth.guard';
import { from } from 'rxjs';
import { ExchangeService } from './exchange.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material/material.module';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component'
import {CommonModule} from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component'

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ListComponent,
    FormComponent,
    UpdateComponent,
    DeleteComponent,
    SigninComponent,
    SignupComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CommonModule  
  ],
  providers: [ExchangeService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
