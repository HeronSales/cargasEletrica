import { CargasNoTempo } from "../helper/CargasNoTempo.js";

export class Equipamento{
    constructor(id, pot, quantidade, fp, cicloCarga, dia, dias){
        this._id = id;
        this._pot = pot;
        this._quantidade = quantidade;
        this._fp = fp;
        this._cicloCarga = cicloCarga;
        this._dia = dia;
        this._dias = dias;
        Object.freeze(this);
    }

    get id() {

        return this._id;
    }

    get pot() {

        return this._pot * this.quantidade;
    }

    get quantidade() {

        return this._quantidade;
    }

    get fp() {
        return this._fp;
    }

    get potAtiva() {
        return this.pot / this._fp;
    }

    get potReativa() {
        return((this.pot / this._fp) * (Math.sin(Math.acos(this._fp))));
    }

    get cicloCarga () {
        return this._cicloCarga;
    }

    get dia() {
        return this._dia;
    }

    get dias() {
        return this._dias;
    }

    get cargasNoTempoCiclo () {
        return CargasNoTempo.textoCicloDeConsumo(this._cicloCarga, parseFloat(this.pot));
    }

    get cargaNoDia () {
        return CargasNoTempo.textoCargasNoDia(this._dia, this.cargasNoTempoCiclo);
    }

    get cargaNaSemana () {
        return CargasNoTempo.diasDaSemana(this.dias, this.cargaNoDia);
    }
    
}