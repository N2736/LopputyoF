import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tuote } from './Tuote';
import { catchError } from 'rxjs/operators';

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TuoteService {
  //  private apiUrl = 'http://localhost:3000/tuote'; // osoite apiin
  private apiUrl = 'https://n2736-lopputyo.herokuapp.com/tuote'; // osoite apiin

  constructor(private http: HttpClient) {} // HttpClientin DI

  // Virheenkäsittelymetodi joka palauttaa observablen
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  // Kaikkien tuotteiden haku. Palauttaa observablena tuotetaulukon
  getTuote(): Observable<Tuote[]> {
    console.log();
    return this.http
      .get<Tuote[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  addTuote(tuote: any): Observable<Tuote> {
    // serveri vaatii tokenin jotta kannan muokkaus olisi mahdollista
    console.log('Lisätään uusi tuote');

    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    tuote.token = mytoken.token; // pistetään token bodyn mukana
    return this.http
      .post<Tuote>(this.apiUrl, tuote, headers)
      .pipe(catchError(this.handleError));
  }

  /** PUT: Päivitetään tuote id:n perusteella. */
  updateTuote(tuote: any): Observable<Tuote> {
    console.log('Yritetään päivittää tuote');
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    tuote.token = mytoken.token; // pistetään token bodyn mukana
    const url = `${this.apiUrl}/${tuote._id}`;
    return this.http
      .put<Tuote>(url, tuote, headers)
      .pipe(catchError(this.handleError));
  }
  /** DELETE: Poistetaan tuote id:n perusteella.
      Token menee headerin mukana  */
  delTuote(id: string): Observable<Tuote> {
    console.log('Poistetaan tuote: id=' + id);
    console.log(
      'sessionStorage[accesstoken] = ' + sessionStorage.getItem('accesstoken')
    );
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    console.log('mytoken =' + mytoken);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete<Tuote>(url, tokenheaders)
      .pipe(catchError(this.handleError));
  }
}
