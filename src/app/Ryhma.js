const TuoteSchema = require('./Tuote');

export class Ryhma {
    // konstruktorimetodi, joka rakentaapi ryhma-olion
    constructor(
        public _id: string, // Mongon oma id
        public ryhmacode: string,
        public name: string
    }