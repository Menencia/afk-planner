import { Injectable } from "@angular/core";
import { Firestore, collectionData, collection, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from "../services/auth.service";
import { Hero } from "./hero";
import { firstValueFrom, Observable } from 'rxjs';
import { addDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public firestore: Firestore,
    public auth: AuthService
  ) { }

  async getHeroes(): Promise<Partial<Hero>[]> {
    const user = await this.auth.getUser().then();
    if (user) {
      const ref = collection(this.firestore, `users/${user.uid}/heroes`);
      const heroes$: Observable<Partial<Hero>[]> = collectionData(ref);
      const heroes = await firstValueFrom(heroes$);
      return heroes;
    }
    return Promise.resolve([]);
  }

  async saveHero(hero: Hero) {
    const heroSave = hero.export();
    const user = await this.auth.getUser();
    if (heroSave && user) {
      if (hero.uid) {
        setDoc(doc(this.firestore, `users/${user.uid}/heroes/${hero.uid}`), heroSave);
      } else {
        addDoc(collection(this.firestore, `users/${user.uid}/heroes`), heroSave)
          .then(docRef => {
            hero.uid = docRef.id;
          });
      }
    }
  }

}