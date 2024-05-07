import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsSignedGuard } from './core/guards/is-signed.guard';
import { HeroesComponent } from './views/heroes/heroes.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PrioritiesComponent } from './views/priorities/priorities.component';
import { SignupComponent } from './views/signup/signup.component';

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
