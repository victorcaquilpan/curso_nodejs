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

/*Primero se realiza un filtro de los datos del csv FONARM, seleccionando una estación en particular  */


$(document).ready(function () {

    $('#selector').change(function () {
        var seleccionHecha = $(this).val();
        //alert(seleccionHecha);
        //  console.log(seleccionHecha);


        var ctx_line = document.getElementById("myChart2").getContext('2d');

        d3.csv('Datos/FONARM.csv')
            .then((datos) => {

                // let datos_filtro = datos.filter(function (d) { return d.estacion == "IDMA" })
                let datos_filtro = datos.filter(function (d) { return d.estacion == seleccionHecha })


                console.log(datos_filtro)

                //////////////////////////////
                // Script para generar descarga de datos. Al momento de seleccionar una estación, se realiza una descarga de datos
                var csv
                var key = 0
                keysCounter = 0
                var row = 0

                // Loop the array of objects
                for (var row = 0; row < datos_filtro.length; row++) {
                    var keysAmount = Object.keys(datos_filtro[row]).length
                    var keysCounter = 0

                    // If this is the first row, generate the headings
                    if (row === 0) {

                        // Loop each property of the object
                        for (var key in datos_filtro[row]) {

                            // This is to not add a comma at the last cell
                            // The '\r\n' adds a new line
                            csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
                            keysCounter++
                        }
                    } else {
                        for (var key in datos_filtro[row]) {
                            csv += datos_filtro[row][key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
                            keysCounter++
                        }
                    }

                    keysCounter = 0
                }

                // Once we are done looping, download the .csv by creating a link
                let link = document.createElement('a')
                link.id = 'download-csv'
                link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
                link.setAttribute('download', 'datos.csv');
                link.click();
                var csv = [{}];

                ///////////////////////////////


                // Generación de variables para gráfica de lineas

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
                            fontColor: 'blue'
                        }
                    },
                    events: ['mouseout'],
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                parser: 'YYYY-MM-DD',
                                unit: 'month',
                                displayFormats: {
                                    day: 'ddd'
                                },
                            }
                        }]
                    },
                    // Quita interacciones en el grafico
                };
                var monitoreo = {
                    labels: hora,
                    datasets: [{
                        label: "Concentración de MP 2.5 [ug m-3]",
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

    });
}
);