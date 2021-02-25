import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    // Token löytyy jolloin Guard palauttaa true
    if (sessionStorage.getItem('accesstoken')) {
      return true;
    }

    // Ei Tokenia jolloin palataan login -sivulle
    console.log('Ei tokenia, siirrytään kirjautumissivulle 3');
    this.router.navigate(['/sivu3']);
    return false;
  }
}
