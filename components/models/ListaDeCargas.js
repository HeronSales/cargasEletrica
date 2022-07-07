export class ListaDeCargas {
    
    constructor() {
        
        this._cargas = [];
    }
    
    adiciona(cargas) {
        
        this._cargas.push(cargas);
    }
    
    get cargas() {
        
        return [].concat(this._cargas);
    }

    esvazia() {
        
        this._cargas = [];
    }
    
    get cargaTotal() {
       return this._cargas.reduce((total, n) => total + n.pot, 0.0);
    }
    
    ordena(criterio) {

        this._cargas.sort(criterio);        
    }
    
    inverteOrdem() {

        this._cargas.reverse();
    }    
}