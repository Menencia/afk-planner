import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable, firstValueFrom } from 'rxjs';

import { Hero } from '../models/hero';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    public firestore: Firestore,
    public auth: AuthService,
  ) {}

  async getHeroes(): Promise<Partial<Hero>[]> {
    const user = await this.auth.getUser().then();
    if (user) {
      const ref = collection(this.firestore, `users/${user.uid}/heroes`);
      const heroes$: Observable<Partial<Hero>[]> = collectionData(ref, {
        idField: 'uid',
      });
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
        setDoc(
          doc(this.firestore, `users/${user.uid}/heroes/${hero.uid}`),
          heroSave,
        );
      } else {
        addDoc(
          collection(this.firestore, `users/${user.uid}/heroes`),
          heroSave,
        ).then((docRef) => {
          hero.uid = docRef.id;
        });
      }
    }
  }
}
