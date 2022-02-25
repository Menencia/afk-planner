import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Hero, HeroSave } from "./hero";
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public afs: AngularFirestore,
    public auth: AuthService
  ) { }

  async getHeroes(): Promise<HeroSave[]> {
    const user = await this.auth.getUser().then();
    if (user) {
      const heroes$ = this.afs.collection<HeroSave>(`users/${user.uid}/heroes`).valueChanges();
      const heroes = await firstValueFrom(heroes$)
      return heroes;
    }
    return Promise.resolve([]);
  }

  async saveHero(hero: Hero) {
    const heroSave = hero.export();
    const user = await this.auth.getUser();
    if (user) {
      if (hero.uid) {
        this.afs.doc<HeroSave>(`users/${user.uid}/heroes/${hero.uid}`).set(heroSave);
      } else {
        this.afs.collection<HeroSave>(`users/${user.uid}/heroes`).add(heroSave)
          .then(docRef => {
            hero.uid = docRef.id;
          });
      }
    }
  }

}