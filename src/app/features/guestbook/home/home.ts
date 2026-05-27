import { Component } from '@angular/core';
import {Footer} from '../../../shared/component/footer/footer';
import {Navbar} from '../../../shared/component/navbar/navbar';
import {NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Navbar,
    Footer,
    NgOptimizedImage
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private router : Router) {
  }

  addSouvenir(): void {
    this.router.navigate(['/guestbook/add-souvenir']);
  }
}
