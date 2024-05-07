import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './core/models/user';
import { AuthService } from './core/services/auth.service';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User | undefined;
  theme: string;

  constructor(
    public auth: AuthService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.user = undefined;

    // default theme
    const theme = localStorage.getItem('theme') as Theme;
    this.theme = theme ? theme: Theme.Light;
    this.applyTheme();
  }

  toggleDark() {
    this.theme = this.theme === Theme.Light ? Theme.Dark : Theme.Light;
    this.applyTheme();
  }

  applyTheme() {
    localStorage.setItem('theme', this.theme);
    const htmlNode = this.document.querySelector('html');
    if (htmlNode) {
      if (this.theme === Theme.Dark) {
        htmlNode.classList.add('dark')
      } else {
        htmlNode.classList.remove('dark')
      }
    }
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
