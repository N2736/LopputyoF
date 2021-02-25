import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  login: boolean;
  subscription: Subscription; // Tänne menee observablen tilauskuponki

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
    // Tilataan viesti ja talletetaan tulos this.login-muuttujaan
    this.subscription = this.authService.loginTrue().subscribe((message) => {
      this.login = message;
    });

    const atoken = sessionStorage.getItem('accesstoken');
    if (atoken) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  ngOnDestroy() {
    // lopetetaan tilaus kun komponentti tuhotaan
    this.subscription.unsubscribe();
  }
  doLogout() {
    this.login = false;
  }
}
