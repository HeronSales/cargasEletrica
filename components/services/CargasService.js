import { HttpService } from "./HttpService.js";
import { ConnectionFactory } from "./ConnectionFactory.js";
import { CargasDao } from "../dao/CargasDao.js";
import { Equipamento } from "../models/Equipamento.js";

export class CargaService {
    
    constructor() {
        
        this._http = new HttpService();
    }
    
    // obterNegociacoesDaSemana() {
               
    //     return this._http
    //         .get('cargas/semana')
    //         .then(negociacoes => {
    //             console.log(negociacoes);
    //             return negociacoes.map(objeto => new Equipamento(objeto.id, objeto.pot, objeto.quantidade, objeto.fp, objeto.cicloCarga, objeto.dia, objeto.dias));
    //         })
    //         .catch(erro => {
    //             console.log(erro);
    //             throw new Error('Não foi possível obter as cargas da semana');
    //         });  
    // }
    
    
    
    obterCargas() {
        
        return Promise.all([
            // this.obterNegociacoesDaSemana()            
        ]).then(periodos => {

            let cargas = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Equipamento(dado.id, dado.pot, dado.quantidade, dado.fp, dado.cicloCarga, dado.dia, dado.dias));

            return cargas;
        }).catch(erro => {
            throw new Error(erro);
        });
	} 

    cadastra(carga) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new CargasDao(connection))
            .then(dao => dao.adiciona(carga))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação')
            });
    }

    lista() {

        return ConnectionFactory
                .getConnection()
                .then(connection => new CargasDao(connection))
                .then(dao => dao.listaTodos())
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possível obter as negociações')
                })
    }

    apaga() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new CargasDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações')
            })

    }

    importa(listaAtual) {

        return this.obterCargas()
            .then(cargas => 
                cargas.filter(carga => 
                    !listaAtual.some(cargaExistente => 
                        JSON.stringify(carga) == JSON.stringify(cargaExistente)))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível buscar negociações para importar');
            })
    }
}