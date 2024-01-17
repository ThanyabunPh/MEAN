import { Component } from '@angular/core';
import { Globals } from "../../globals";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  providers: [Globals],

  imports: [
    NgIf
  ]
})
export class NavbarComponent {
  isDarkTheme: boolean = false;
  title: string = '';
  constructor(private globals: Globals) {
    this.title = globals.Title;
    this.checkTheme();
  }

  checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
      this.isDarkTheme = savedTheme === 'dark';
    }
  }

  toggleTheme() {
    const body = document.body
    const currentTheme = body.getAttribute('data-theme')
    body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark')
    this.isDarkTheme = !this.isDarkTheme
    localStorage.setItem('theme', body.getAttribute('data-theme') || 'dark');
  }

}
