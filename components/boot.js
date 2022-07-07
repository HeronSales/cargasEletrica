import {currentInstance} from'./controller/CargasController.js';
import {} from './polyfill/fetch.js';

let cargasController = currentInstance();
document.querySelector('.form').onsubmit = cargasController.adiciona.bind(cargasController);
document.querySelector('[type=button]').onclick = cargasController.apaga.bind(cargasController);