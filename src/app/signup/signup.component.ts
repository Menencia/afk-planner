import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Status, Utils } from '../models/utils';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  values: any;

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.resetValues();
  }

  resetValues(): void {
    this.values = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    };
  }

  createAccount(): void {
    const {name, email, password, passwordRepeat} = this.values;

    // checkings
    let check = true;
    if (!name || !/^[a-zA-Z0-9]+$/.test(name)) {
      Utils.notify('Le pseudo est obligatoire (caractères autorisés: a-z, A-Z, 0-9).', Status.Danger);
      check = false;
    }
    if (password !== passwordRepeat) {
      Utils.notify('Les mots de passe ne correspondent pas.', Status.Danger);
      check = false;
    }

    if (check) {
      this.auth.createAccount(name, email, password)
        .then(() => {
          this.resetValues();
          Utils.notify('Votre compte a créé avec succès.');
          console.log(email, password)
          this.auth.loginWithPassword(email, password)
            .then(() => {
              this.auth.user$.subscribe(data => {
                if (data) {
                  const user = new User().load(data);
                  this.router.navigateByUrl('/heroes');
                }
              });
            })
            .catch(error => {
              Utils.notify(error.message, Status.Danger);
            });
        })
        .catch(error => {
          Utils.notify(error.message, Status.Danger);
        });
    }
  }

}
