import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthRoutingModule,SharedModule,CoreModule
  ]
})
export class AuthModule { }
