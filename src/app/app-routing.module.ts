import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'hero/:name', component: HeroComponent},
  {path: '**', redirectTo: 'heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
