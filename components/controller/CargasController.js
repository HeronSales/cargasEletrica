import {Equipamento} from'../models/Equipamento.js';
import {ListaDeCargas} from'../models/ListaDeCargas.js';
import {Mensagem} from'../models/Mensagem.js';
import {MensagemView} from'../views/MensagemView.js';
import {CargasView} from'../views/CargasView.js';
import {CargaService} from'../services/CargasService.js';
import {CargasNoTempo} from'../helper/CargasNoTempo.js';
import {Bind} from'../helper/Bind.js';
import { GraficoView } from '../views/GraficoView.js';


class CargasController {
    constructor() {
        let $ = document.querySelector.bind(document);
        let $$ = document.querySelectorAll.bind(document);        
        this._inputEquipamento = $('#equipamento');        
        this._inputPotencia = $('#potencia');
        this._inputQuantidade = $('#quantidade');
        this._inputFatorPotencia = $('#fatorDePotencia');
        this._inputCiclo = $('#perfilDeConsumo');
        this._vinteQuatroHoras = $('#horario');
        this._inputDiasDaSemana = $$('input[type=checkbox]');

        this._listaDeCargas = new Bind(
            new ListaDeCargas(), 
            new CargasView($('#cargasView')), 
            'adiciona', 'esvazia' , 'ordena', 'inverteOrdem');
       
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto'); 

        this._somatorio = new Bind(
            new ListaDeCargas(), 
            new GraficoView($('#graficoView')), 
            'adiciona', 'esvazia' , 'ordena', 'inverteOrdem');        
        
        // this._listaDeCargas = new ListaDeCargas();

        // this._cargasView = new CargasView($('#cargasView'));
        // this._cargasView.update(this._listaDeCargas);


        // this._mensagem = new Mensagem();
        // this._mensagemView = new MensagemView($('#mensagemView'));
        // this._mensagemView.update(this._mensagem);
        
        
        

        this._service = new CargaService();

        this._init();

    }

    _init() {

        this._service
            .lista()
            .then(cargas => 
                cargas.forEach(carga => {
                    this._listaDeCargas.adiciona(carga);
                    this._somatorio.adiciona(carga);
                }))
            .catch(erro => this._mensagem.texto = erro);

       setInterval(() => {
           this.importaCargas();
       }, 3000);                
        
    }

    adiciona(event) {
        event.preventDefault();        
        console.log(this._listaDeCargas);

        // this._listaDeCargas.adiciona(this._criaCarga());
        // this._cargasView.update(this._listaDeCargas)
        // this._mensagem.texto = 'Carga adicionada com sucesso';
        // this._mensagemView.update(this._mensagem);

        let cargas = this._criaCarga();

        this._service
            .cadastra(cargas)
            .then(mensagem => {
                this._listaDeCargas.adiciona(cargas);
                this._somatorio.adiciona(cargas);
                this._mensagem.texto = mensagem;
                // this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);

    }

    importaCargas() {

        this._service
            .importa(this._listaDeCargas.cargas)
            .then(cargas => cargas.forEach(carga => {
                this._listaDeCargas.adiciona(carga);
                this._somatorio.adiciona(carga);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);                              
    }

    apaga() {
        
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaDeCargas.esvazia();
                this._somatorio.esvazia();                
            })
            .catch(erro => this._mensage.texto = erro);
    }

    _criaCarga () {

        return new Equipamento(
            this._inputEquipamento.value,
            parseFloat(this._inputPotencia.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputFatorPotencia.value),
            this._inputCiclo.value,
            this._vinteQuatroHoras.value,
            CargasNoTempo.selecionadas(this._inputDiasDaSemana)            
        );
    }

    ordena(coluna) {
        
        if(this._ordemAtual == coluna) {
            this._listaDeCargas.inverteOrdem();
            this._somatorio.inverteOrdem(); 
        } else {
            this._listaDeCargas.ordena((p, s) => p[coluna] - s[coluna]); 
            this._somatorio.ordena((p, s) => p[coluna] - s[coluna]);   
        }
        this._ordemAtual = coluna;    
    }
}

let cargasController = new CargasController();

export function currentInstance() {

    return cargasController;

}