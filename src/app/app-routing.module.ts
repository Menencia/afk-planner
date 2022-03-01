import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HomeComponent } from './home/home.component';
import { IsSignedGuard } from './is-signed.guard';
import { LoginComponent } from './login/login.component';
import { PrioritiesComponent } from './priorities/priorities.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'heroes', component: HeroesComponent, canActivate: [IsSignedGuard]},
  {path: 'priorities', component: PrioritiesComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
