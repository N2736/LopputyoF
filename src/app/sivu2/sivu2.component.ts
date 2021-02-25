import { Component, OnInit } from '@angular/core';
import { RyhmaService } from '../ryhma.service';
import { TuoteService } from '../tuote.service';
import { Ryhma } from '../Ryhma';
import { Tuote } from '../Tuote';

@Component({
  selector: 'app-sivu2',
  templateUrl: './sivu2.component.html',
  styleUrls: ['./sivu2.component.css'],
})
export class Sivu2Component implements OnInit {
  ryhmat: Array<Ryhma> = []; // Tähän taulukkoon pitäisi tulla ryhmät
  tuotteet: Array<Tuote> = []; // Tähän tulee tuotteet
  addnew = false;
  saveedited = false;
  ryhmacode = '';
  name = '';
  tuotecode = '';
  tuotename = '';
  tuoteinfo = '';
  id = '';
  id2 = '';

  constructor(
    private ryhmaservice: RyhmaService,
    private tuoteservice: TuoteService
  ) {}

  getRyhmat() {
    // Kerätään tuoteryhmät (tilaamalla observable)
    this.ryhmaservice.getRyhma().subscribe((data) => (this.ryhmat = data));
  }
  getTuotteet() {
    // Kerätään tuotetiedot
    this.tuoteservice.getTuote().subscribe((data) => (this.tuotteet = data));
  }

  // Lähetetään uusi tai muokattu ryhmä
  onSubmit(formData) {
    console.log('addnew:' + this.addnew + 'saveedited:' + this.saveedited);
    if (this.addnew === true) {
      console.log('this.addnew === true ');
      this.tuoteservice
        .addTuote({
          ryhmacode: formData.ryhmacode,
          tuotecode: formData.tuotecode,
          name: formData.tuotename,
          tuoteinfo: formData.tuoteinfo,
        })
        .subscribe((data) => this.tuotteet.push(data));
      this.addnew = false;
      this.saveedited = false;
      this.ryhmacode = '';
      this.name = '';
      this.tuotecode = '';
      this.tuotename = '';
      this.tuoteinfo = '';
      this.id = '';
      this.id2 = '';
    }
    // Muokataan ryhmaa tai tavaraa
    if (this.saveedited === true) {
      console.log('this.saveedited === true ');
      this.tuoteservice
        .updateTuote({
          _id: formData.id,
          ryhmacode: formData.ryhmacode,
          tuotecode: formData.tuotecode,
          name: formData.tuotename,
          tuoteinfo: formData.tuoteinfo,
        })
        .subscribe(() => this.getTuotteet());
      this.addnew = false;
      this.saveedited = false;
      this.ryhmacode = '';
      this.name = '';
      this.tuotecode = '';
      this.tuotename = '';
      this.tuoteinfo = '';
      this.id = '';
      this.id2 = '';
    }
  }
  // Poistetaan ryhma + haetaan lista uusiksi
  deleteR(r: Ryhma) {
    this.ryhmaservice.delRyhma(r._id).subscribe(() => this.getRyhmat());
  }

  deleteI(t: Tuote) {
    this.tuoteservice.delTuote(t._id).subscribe(() => this.getTuotteet());
  }

  // Uuden tuotteen luonnissa asetetaan lomakkeelle muokattavat arvot
  addnewI(r: Ryhma) {
    this.addnew = true;
    this.ryhmacode = r.ryhmacode;
    this.name = r.name;
    this.tuotecode = '';
    this.tuotename = '';
    this.tuoteinfo = '';
    this.id = r._id;
    this.id2 = '';
  }

  // Lomakkeen ollessa update-moodissa asetetaan lomakkeelle muokattavat arvot
  updateI(r: Ryhma, t: Tuote) {
    this.saveedited = true;
    this.ryhmacode = r.ryhmacode;
    this.name = r.name;
    this.tuotecode = t.tuotecode;
    this.tuotename = t.name;
    this.tuoteinfo = t.tuoteinfo;
    this.id = r._id;
    this.id2 = t._id;
  }

  cancelI() {
    this.addnew = false;
    this.saveedited = false;
  }

  ngOnInit() {
    this.getRyhmat();
    this.getTuotteet();
  }
}
