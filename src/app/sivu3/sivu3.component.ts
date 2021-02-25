import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sivu3',
  templateUrl: './sivu3.component.html',
  styleUrls: ['./sivu3.component.css'],
})
export class Sivu3Component implements OnInit {
  error = '';
  // injektoidaan router ja authService
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // aina kun login-komponentti ladataan, poistetaan token
    this.authService.logout();
  }

  // lomakkeen lähetys
  // authService palauttaa observablen jossa on joko true tai false
  onSubmit(formData) {
    this.authService
      .login(formData.tunnus, formData.salasana)
      .subscribe((result) => {
        if (result === true) {
          this.router.navigate(['/sivu2']);
        } else {
          this.error = 'Tunnus tai salasana väärä';
        }
      });
  }
}
