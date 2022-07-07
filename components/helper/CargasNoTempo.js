//as cargas tem comportamento de variar no tempo, sendo essas variações causados por diferentes
//carregamentos, exigencias e forma de uso. esse objeto tem oobjetivo de organizar as entradas de 
// ciclo de carga, uso no dia 24h, uso nos dias de semana

// para cada dia da semana selecionado é adicionado uma matriz de uso de 24h

export class CargasNoTempo {
    constructor() {

        throw new Error('Essa classe não pode ser instanciada');
    }

    static textoCicloDeConsumo(ciclo, pot) {
        if (ciclo == 0) {
            return new Array(10).fill(pot);
        }         

        const stringParaMatriz = ciclo.split(/(?::|$)|(?:,|$)/i);        
        if (/[$&a-zA-Z$&]/g.test(ciclo) || (stringParaMatriz.length % 2) != 0)
            throw new Error('Deve conter tempo e porcentagem em pares e não pode conter letras');
        
        let matrizResultado = [];
        let x=0;        
        stringParaMatriz.map((element, index) =>
            (index % 2) == 0 ? (x = parseInt(element)) : matrizResultado.push(new Array(x).fill(parseFloat(element) * pot/100)));

        return matrizResultado.flat();
    }

    static textoCargasNoDia(textoTempo, matrizCiclo) {

        const textoDividido = textoTempo.split(/\:|[x]|\;/g);
        if ((textoDividido.length % 2) != 0)
            throw new Error('Deve conter tempo de inicio e fim em pares e não pode conter caracteres alem de (:,x,;)');
        let copyItems = [];
        let matrizVinteQuatroHoras = new Array(1440).fill(0);
        let x = 0;
        let contador = 0;

        textoDividido.forEach((element, index) => {
            (index % 2) == 0 ? (x = parseInt(element) * 60 ) : copyItems.push(parseInt(element) + x)
            
        });

        for (let i = 0; i < copyItems.length; i++) {

            if((i %2 ) == 0){
                let start = copyItems[i];
                let end = copyItems[i+1];
                console.log(start, end);

                for (let j = start; j <= end; j++) {
                    matrizVinteQuatroHoras[j] = matrizCiclo[(contador < matrizCiclo.length) ? contador++ : contador = 1];                 
                }
            }        
            
        }
        return matrizVinteQuatroHoras;
    }

    static diasDaSemana (selecao, matrizDoCicloEmUmDia) {
        let matrizSemana = [];        

        for (let i = 0; i < 7; i++) {
            if (selecao[i] == true) {
                matrizSemana[i] = matrizDoCicloEmUmDia;
            } else {
                matrizSemana[i] = [0];
            }                        
        }

        return matrizSemana;
    }

    static selecionadas(matri) {
        return Array.from(matri,value => value.checked);
    }

}