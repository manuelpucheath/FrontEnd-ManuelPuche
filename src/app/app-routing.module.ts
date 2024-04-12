import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { SignUpComponent } from './components/signUp/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
