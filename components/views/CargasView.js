import { View } from "./Views.js";
import { currentInstance } from "../controller/CargasController.js";

export class CargasView extends View {

    constructor(elemento) {
        super(elemento);

        elemento.addEventListener('click', function(event) {

            if(event.target.nodeName == 'TH')
                currentInstance().ordena(event.target.textContent.toLowerCase());    
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
        `;
    }
}