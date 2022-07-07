import { View } from "./Views.js";
import { currentInstance } from "../controller/CargasController.js";
import { consumoNaSemanaGrafico, testeGrafico } from "../lib/graficos.js";


export class GraficoView extends View {

    constructor(elemento) {
        super(elemento);
        
        elemento.addEventListener('click', function(event) {
           

            if(event.target.nodeName == 'TH')
                currentInstance().ordena(event.target.textContent.toLowerCase());
                testeGrafico(currentInstance()._listaDeCargas);
                consumoNaSemanaGrafico(currentInstance()._listaDeCargas);               
                                    
        });

    }
    
    template(model) {          
        
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr> 
                    <th>EQUIPAMENTO</th>
                    <th>QUANTIDADE</th>
                    <th>FATOR DE POTÊNCIA</th>
                    <th>POTÊNCIA (W)</th>
                    <th>POTÊNCIA ATIVA (VA)</th>
                    <th>POTÊNCIA REATIVA (VAr)</th>
                </tr>
            </thead>
        
            <tbody>
                ${model.cargas.map(n => `
                    
                    <tr>
                        <td>${n.id}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.fp}</td>
                        <td>${n.pot}</td>
                        <td>${n.potAtiva}</td>
                        <td>${n.potReativa}</td>
                    </tr>
                    
                `).join('')}                
            </tbody>

            
                  
            <tfoot>
                <td colspan="3"></td>
                <td>
                    ${model.cargaTotal}
                    
                </td>
            </tfoot>
            
        </table> 
        <div class="text-center">
            <button class="btn btn-primary text-center" type="button" id="line">
                Chart
            </button>
         </div>  
        <section class="buttons"></section>
        <canvas id="myChart"></canvas>       
        <canvas id="cargasNaSemanaGrafico"></canvas>     
        `;
    }
}