import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  DocumentData,
  Firestore,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { User as UserM, UserSave } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<DocumentData | undefined>;

  constructor(
    public afAuth: Auth,
    public firestore: Firestore,
    public router: Router,
  ) {
    this.user$ = authState(this.afAuth).pipe(
      switchMap((user) => {
        if (user) {
          return docData(doc(this.firestore, `users/${user.uid}`));
        }

        return of(undefined);
      }),
    );
  }

  async createAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    const credentials = await createUserWithEmailAndPassword(
      this.afAuth,
      email,
      password,
    );
    this.createUser(credentials.user, name, email);
  }

  async loginWithPassword(email: string, password: string): Promise<void> {
    const credentials: UserCredential = await signInWithEmailAndPassword(
      this.afAuth,
      email,
      password,
    );
    this.updateUser(credentials.user);
  }

  async logout(): Promise<void> {
    await signOut(this.afAuth);
  }

  private createUser(user: User, name: string, email: string) {
    const userRef = doc(this.firestore, `users/${user.uid}`);

    const userObj = {
      uid: user.uid,
      name,
      email,
      lastConnected: new Date(),
    };

    return setDoc(userRef, userObj, { merge: true });
  }

  private updateUser(user: User): Promise<void> {
    const userRef = doc(this.firestore, `users/${user.uid}`);

    const userObj = {
      lastConnected: new Date(),
    };

    return updateDoc(userRef, userObj);
  }

  getUser(): Promise<UserM | undefined> {
    return this.user$
      .pipe(
        take(1),
        map((data) => {
          if (data) {
            return new UserM().load(data as UserSave);
          }

          return undefined;
        }),
      )
      .toPromise();
  }

  isSigned(): Observable<boolean> {
    return this.user$.pipe(
      take(1),
      map((data) => {
        if (data) {
          return true;
        }

        return false;
      }),
    );
  }
}
