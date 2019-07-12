//Generación de grafico principal 
var ctx = document.getElementById("myChart").getContext('2d');

var eje_xx = equipos.map(function(item) {
    return item.properties.Name;
    
});
console.log(eje_xx)

var eje_yy = equipos.map(function(item) {
    return item.properties.concentracion;
    
});



var options = {responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

// End Defining data
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: eje_xx,
        datasets: [{
                label: 'Concentración promedio de MP 2.5 [ug m-3]', // Name the series
                data: eje_yy, // Specify the data values array
          borderColor: '#2196f3', // Add custom color border            
          backgroundColor: '#2196f3',
           // Specify bar border width // Add custom color background (Points and Fill)
            }],
            
    },
    options: options
});

// Generación de gráfico secundario



