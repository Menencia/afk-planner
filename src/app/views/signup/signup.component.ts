import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  values: any;
  status: string = '';

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
      this.status = 'Le pseudo est obligatoire (caractères autorisés: a-z, A-Z, 0-9).';
      check = false;
    }
    if (password !== passwordRepeat) {
      this.status = 'Les mots de passe ne correspondent pas.';
      check = false;
    }

    if (check) {
      this.auth.createAccount(name, email, password)
        .then(() => {
          this.resetValues();
          this.status = 'Votre compte a créé avec succès.';
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
              this.status = error.message;
            });
        })
        .catch(error => {
          this.status = error.message;
        });
    }
  }

}
