//Generación de grafico principal 
var ctx = document.getElementById("myChart").getContext('2d');

var eje_xx = equipos.map(function (item) {
    return item.properties.Name;

});
//console.log(eje_xx)

var eje_yy = equipos.map(function (item) {
    return item.properties.concentracion;

});



var options = {
    responsive: true, // Instruct chart js to respond nicely.
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

// Generación de gráfico secundario. Lectura de documento csv FONARM.csv


var ctx_line = document.getElementById("myChart2").getContext('2d');

d3.csv('Datos/FONARM.csv')
    .then((datos) => {

        let datos_filtro = datos.filter(function (d) { return d.estacion == "IDMA" })

        //console.log(datos_filtro)

        let hora = datos_filtro.map(function (elemento, indice) {

            return elemento.Hora_GMT4
        })





        let pm25 = datos_filtro.map(function (elemento2, indice) {

            return elemento2.pm25
        })

        // console.log(pm25)

        var chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 80,
                    fontColor: 'black'
                }
            }
        };
        var monitoreo = {
            labels: hora,
            datasets: [{
                label: "Nivel de contaminación - Estación IDMA",
                data: pm25,

            }]

        };

        //console.log(monitoreo)

        // End Defining data
        var myChart2 = new Chart(ctx_line, {
            type: 'line',
            data: monitoreo,
            options: chartOptions
        })



    });