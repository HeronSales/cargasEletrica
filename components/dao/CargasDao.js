import {Equipamento} from'../models/Equipamento.js';

export class CargasDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'cargas';
    }

    adiciona(carga) {

        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(carga);

            request.onsuccess = e => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a carga');

            };

        });
    }

    listaTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let cargas = [];

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if(atual) {

                    let dado = atual.value;

                    cargas.push(new Equipamento(dado._id, dado._pot, dado._quantidade, dado._fp, dado._cicloCarga, dado._dia, dado._dias)); 

                    atual.continue();

                } else {

                    resolve(cargas);
                }

            };

            cursor.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível listar as cargas');
            };

        });
    }

    apagaTodos() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Cargas apagadas com sucesso');

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar as cargas');
            }; 

        });

    }
}