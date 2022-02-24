import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User | undefined;

  constructor(
    public auth: AuthService,
    public router: Router
  ) {
    this.user = undefined;
  }

  ngOnInit() {
    this.auth.user$.subscribe(data => {
      if (data) {
        this.user = new User().load(data);
      }
    });
  }

  logout() {
    this.auth.logout();
    this.user = undefined;
    this.router.navigateByUrl('/home');
  }
}
