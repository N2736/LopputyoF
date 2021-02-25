import { Component, OnInit } from '@angular/core';
import { RyhmaService } from '../ryhma.service';
import { TuoteService } from '../tuote.service';
import { Ryhma } from '../Ryhma';
import { Tuote } from '../Tuote';

@Component({
  selector: 'app-sivu1',
  templateUrl: './sivu1.component.html',
  styleUrls: ['./sivu1.component.css'],
})
export class Sivu1Component implements OnInit {
  displayedColumns: string[] = ['ryhmacode', 'name', 'Tuote'];
  ryhmat: Array<Ryhma> = []; // Tähän taulukkoon pitäisi tulla ryhmät
  tuotteet: Array<Tuote> = []; // Tähän taulukkoon pitäisi tulla tuotteet

  constructor(
    private ryhmaservice: RyhmaService,
    private tuoteservice: TuoteService
  ) {
    this.ryhmaservice.getRyhma().subscribe((data) => (this.ryhmat = data));
    this.tuoteservice.getTuote().subscribe((data) => (this.tuotteet = data));
  }

  ngOnInit(): void {}
}
