import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ryhma } from './Ryhma';
import { catchError } from 'rxjs/operators';

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class RyhmaService {
  //  private apiUrl = 'http://localhost:3000/ryhma'; // osoite apiin
  private apiUrl = 'https://n2736-lopputyo.herokuapp.com/ryhma'; // osoite apiin

  constructor(private http: HttpClient) {} // HttpClientin DI

  // Virheenkäsittelymetodi joka palauttaa observablen
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  // Kaikkien ryhmien haku. Palauttaa observablena ryhmataulukon
  getRyhma(): Observable<Ryhma[]> {
    console.log();
    return this.http
      .get<Ryhma[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  /** POST: lisätään opiskelija palvelimelle.
   * Studentin tyyppi on any, koska _id puuttuu eikä noudateta student.ts:n mallia.
   * _id jätetään pois opiskelijaa lisättaessä, koska Mongo lisää sen automaattisesti
   */

  addRyhma(ryhma: any): Observable<Ryhma> {
    // serveri vaatii tokenin jotta kannan muokkaus olisi mahdollista
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    ryhma.token = mytoken.token; // pistetään token bodyn mukana
    return this.http
      .post<Ryhma>(this.apiUrl, ryhma, headers)
      .pipe(catchError(this.handleError));
  }

  /** PUT: Päivitetään ryhma id:n perusteella. */
  updateRyhma(ryhma: any): Observable<Ryhma> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    ryhma.token = mytoken.token; // pistetään token bodyn mukana
    const url = `${this.apiUrl}/${ryhma._id}`;
    return this.http
      .put<Ryhma>(url, ryhma, headers)
      .pipe(catchError(this.handleError));
  }
  /** DELETE: Poistetaan ryhma id:n perusteella.
      Token menee headerin mukana  */
  delRyhma(id: string): Observable<Ryhma> {
    console.log('Poistetaan ryhmä: id=' + id);
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
      .delete<Ryhma>(url, tokenheaders)
      .pipe(catchError(this.handleError));
  }

  /*     
  delRyhma(id: string): Observable<Ryhma> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };0
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete<Ryhma>(url, tokenheaders)
      .pipe(catchError(this.handleError));
  }
*/
}
