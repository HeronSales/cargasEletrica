export function testeGrafico (teste) {

  const actions = [
    {
      name: 'Randomize',
      handler(chart) {

        chart.data.datasets.forEach(dataset => {          
          let dataFive = [];
          dataset.data.forEach((element,index) => (index % 5) == 0 ? dataFive.push(element):0 );
          dataset.data = dataFive;
        });
        let newLabels = [];
        chart.data.labels.forEach((label, index) => { (index % 5) == 0 ?
         newLabels.push(label) :0
        });
        chart.data.labels = newLabels;
        chart.update();

      }
    },
    {
      name: 'Default',
      handler(chart) {
        
        chart.data.datasets.forEach((dataset, index) => {                                       
          dataset.data = teste.cargas[index].cargaNoDia;          
        });            
        chart.data.labels = labels;
        chart.update();

      }
    },
  ];

  actions.map((a, i) => {
    const button = document.createElement("button");
    if(document.querySelector(".buttons").textContent == 'RandomizeDefault') {
      button.onclick = () => a.handler(myChart);
      console.log('Aqui');      
    }else {
      button.id = "button"+i;
    button.innerText = a.name;     
    document.querySelector(".buttons").appendChild(button);     
    button.onclick = () => a.handler(myChart);
    console.log('Aqui2');
    }
  });
  
  let x = 0;
  const labels = Array.from({length: 1440}, (_, i) => `${(i%60 == 0) ? (x =i/60):x} : ${(i%60 == 0) ? 0:i%60}`); 
  const matriz = [];
  teste.cargas.map(item => {
    matriz.push(
      {
        label: item.id,
        backgroundColor: `rgb(${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)})`,
        borderColor: `rgb(${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)})`,
        data: item.cargaNoDia,
      }
    )
  });
  
  const data = {
    labels: labels,
    datasets: matriz
  }; 
  
  const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };
  
  const ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, config); 
  return myChart;
}


function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);    
    const result = Array.from({ length: n });
    console.log(n);
    console.log(result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0)));
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}

function sumArraysDaSemana (...arrays) {
  const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
  
  const result = Array.from({ length: n });
  console.log(result.map((_, i) => arrays.map(xs => xs[i] || 0).map((element)=> element.reduce((sum, x) => sum + x,0)).reduce((sum, x) => sum + x, 0)));


  return result.map((_, i) => arrays.map(xs => xs[i] || 0).map((element)=> element.reduce((sum, x) => sum + x,0)).reduce((sum, x) => sum + x, 0));

}

export function consumoNaSemanaGrafico (teste) {
  const ctx = document.getElementById('cargasNaSemanaGrafico');  
  const xc = teste.cargas.map(item => item.cargaNaSemana);  
  console.log(sumArraysDaSemana(...xc));
  const myChartSemana = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
        datasets: [
          {
            label: 'Dataset 1',
            data: sumArraysDaSemana(...xc),
            borderColor: `rgb(${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)})`,
            backgroundColor:  `rgb(${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)})`,
          }          
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
        }
    }
  });       
      
      
}