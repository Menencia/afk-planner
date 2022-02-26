import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AuthService } from "../services/auth.service";
import { Hero } from "./hero";
import { firstValueFrom } from 'rxjs';
import { map } from "@firebase/util";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public afs: AngularFirestore,
    public auth: AuthService
  ) { }

  async getHeroes(): Promise<Partial<Hero>[]> {
    const user = await this.auth.getUser().then();
    if (user) {
      const heroes$ = this.afs.collection<Partial<Hero>>(`users/${user.uid}/heroes`)
        .valueChanges({idField: 'uid'});
      const heroes = await firstValueFrom(heroes$)
      return heroes;
    }
    return Promise.resolve([]);
  }

  async saveHero(hero: Hero) {
    const heroSave = hero.export();
    const user = await this.auth.getUser();
    if (heroSave && user) {
      if (hero.uid) {
        this.afs.doc<Partial<Hero>>(`users/${user.uid}/heroes/${hero.uid}`).set(heroSave);
      } else {
        this.afs.collection<Partial<Hero>>(`users/${user.uid}/heroes`).add(heroSave)
          .then(docRef => {
            hero.uid = docRef.id;
          });
      }
    }
  }

}