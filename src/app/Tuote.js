export class Tuote {
    // konstruktorimetodi, joka rakentaapi ryhma-olion
    constructor(
        public _id: string, // Mongon oma id
        public tuotecode: string,
        public name: string,
        public tuoteinfo: string,
        public ryhmacode: string) {}
}