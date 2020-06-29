var datosActores = [['Actores armados', 'Registros'], ['', 20], ['', 20], ['', 20]];
var datosPertenencia = [['', '', '', '', ''], ['Ene', 20, 30, 20, 23], ['Feb', 20, 30, 20, 23], ['Mar', 20, 30, 20, 23], ['Abr', 20, 30, 20, 23], ['May', 20, 30, 20, 23]];

///------------------------------------------------------------------
/// Método que alimenta la tabla superior de totales por instrumento
///------------------------------------------------------------------
function cargarTotales(dataTabInicial) {

    $(".contentRegistros").empty();
    $(".contentRegistros").append("<div class='bxsliderReg' id='contentTabRegistro'></div >");

    var htmlTabInicial = '';

    for (var a = 0; a < dataTabInicial.length; a++) {
        htmlTabInicial = htmlTabInicial + "<div class='cuadroCarrousel'><span class='numCarrousel'>" + dataTabInicial[a][1] + "</span> <span class='lblCarrousel'>" + dataTabInicial[a][0] + "</span></div>";
    }

    $("#contentTabRegistro").append(htmlTabInicial);

    var anchoContent = $("section.section").width() - 80;
    anchoContent = anchoContent / 4;

    $('.bxsliderReg').bxSlider({
        startSlide: 0,
        mode: 'horizontal',
        minSlides: 1,
        maxSlides: 4,
        slideWidth: anchoContent,
        slideMargin: 20,
        controls: false,
        pager: true
    });
}

function cargarClasificadores() {

    //$(".container").empty();
    //$(".container").append("<div class='bxslider' id='carrouselContent'></div >");

    //htmlCarrousel = '';

    //for (var e = 0; e < dataTabClasificadores.length; e++) {
    //    //htmlCarrousel = htmlCarrousel + "<div class='cuadroCarrousel' onclick='cargarDatos(this);'><span class='numCarrousel'>" + dataTabClasificadores[e].Cantidad + "</span> <span class='lblCarrousel'>" + dataTabClasificadores[e].Nombre + "</span></div>";
    //    htmlCarrousel = htmlCarrousel + "<div class='cuadroCarrousel' onclick='alert(this);'><span class='numCarrousel'>" + dataTabClasificadores[e].Cantidad + "</span> <span class='lblCarrousel'>" + dataTabClasificadores[e].Nombre + "</span></div>";
    //}
    //$("#carrouselContent").append(htmlCarrousel);

    var anchoContent2 = $("section.section").width() - 80;
    anchoContent2 = anchoContent2 / 4;

    $('.bxslider').bxSlider({
        mode: 'horizontal',
        minSlides: 1,
        maxSlides: 4,
        slideWidth: anchoContent2,
        slideMargin: 20,
        controls: false,
        pager: true
    });

    $("#carrouselContent .cuadroCarrousel:eq(0)").addClass("activo");
}

///-----------------------------------------------
/// Método que permite cargar los actores armados
///-----------------------------------------------
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawActores);
google.charts.setOnLoadCallback(drawPertenencia);

function cargarActores(dataActores) {
    datosActores = dataActores;
    google.charts.setOnLoadCallback(drawActores);
}
function drawActores() {

    var data = google.visualization.arrayToDataTable(datosActores);

    var options = {
        titleTextStyle: { color: "#333333", fontName: 'Roboto', fontSize: 20, bold: 0, italic: 0 },
        chartArea: { left: 24, bottom: 20, width: '85%', height: '85%' },
        legend: { textStyle: { color: '#2E384D', fontSize: 13 } },
        pieHole: 0.5,
        slices: { 0: { color: '#2E5BFF' }, 1: { color: '#F7C137' }, 2: { color: '#8C54FF' } }
    };

    var chart = new google.visualization.PieChart(document.getElementById('actoresChart'));
    chart.draw(data, options);
}

function cargarPertenenciaEtnica(dataPertenencia) {
    datosPertenencia = dataPertenencia;
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawPertenencia);
}
function drawPertenencia() {
    var data = google.visualization.arrayToDataTable(datosPertenencia);

    var options = {
        seriesType: 'bars',
        chartArea: { left: 24, bottom: 20, width: '75%', height: '85%' },
        series: [{ color: '#2E5BFF' }, { color: '#8C54FF' }, { color: '#51A74C' }, { color: '#B82E2E' }, { color: '#DD4477' }, { color: '#990099' }, { color: '#F7C137', type: 'line' }]
    };

    var chart = new google.visualization.ComboChart(document.getElementById('etnicaChart'));
    chart.draw(data, options);
}

/*--------------------------------------------------------------------------------------------------------------------------------------
    Carga los datos en el arreglo dataClasificador 
 ---------------------------------------------------------------------------------------------------------------------------------------*/
var dataClasificador = [];

function cargarTablaDatos(datos) {

    dataClasificador.length = 0;

    /// Carga los datos en el arreglo dataClasificador 
    for (var i = 0; i < datos.length; i++) {

        var total = datos[i]["RegistroDiarioNoticia"] + datos[i]["RegistroInformacion"] + datos[i]["InformeComision"] + datos[i]["FichaMonitoreo"] + datos[i]["InformeRiesgo"] + datos[i]["NotaSeguimento"] + datos[i]["FichaSeguimiento"];

        dataClasificador.push([datos[i]["Nombre"] + " <br/><span class='Numero'>" + total.toString() + "</span> <div id='barchart_values" + i + "' class='lineRegistro'></div>"
            , datos[i]["RegistroDiarioNoticia"], datos[i]["RegistroInformacion"], datos[i]["InformeComision"], datos[i]["FichaMonitoreo"], datos[i]["InformeRiesgo"], datos[i]["NotaSeguimento"], datos[i]["FichaSeguimiento"]])
    }

    /// Son desplegados en la tabla
    asignarDatosTabla();

    /// Declara un arreglo de arreglos
    var arrayDatos = new Array(datos.length);

    /// Coloca los títulos al arreglo
    for (var j = 0; j < arrayDatos.length; j++) {
        arrayDatos[j] = [];
        arrayDatos[j].push(['Registros', 'Registro de noticias', 'Registro de información', 'Informes de comisión', 'Fichas de monitoreo', 'Alerta temprana', 'Nota de seguimiento', 'Ficha de seguimiento']);
    }

    /// Pobla los arreglos
    for (var k = 0; k < datos.length; k++) {
        arrayDatos[k].push(['', datos[k]["RegistroDiarioNoticia"], datos[k]["RegistroInformacion"], datos[k]["InformeComision"], datos[k]["FichaMonitoreo"], datos[k]["InformeRiesgo"], datos[k]["NotaSeguimento"], datos[k]["FichaSeguimiento"]]);
    }

    /// Cada gráfica que encuentre la va pintando
    for (var l = 0; l < arrayDatos.length; l++) {
        google.charts.setOnLoadCallback(drawChart(arrayDatos[l], 'barchart_values' + l));
    }
}

function asignarDatosTabla() {
    $('#tableRegistro').DataTable({
        "paging": false,
        "searching": false,
        "ordering": false,
        "info": false,
        data: dataClasificador,
        columns: [
            { title: "" },
            { title: "<div title='Registros diarios de noticias' class='badge idColor1'></div>RDN" },
            { title: "<div title='Registros de información' class='badge idColor2'></div>RI" },
            { title: "<div title='Informes de comisión' class='badge idColor3'></div>IC" },
            { title: "<div title='Fichas de monitoreo' class='badge idColor4'></div>FM" },
            { title: "<div title='Alertas tempranas' class='badge idColor5'></div>AT" },
            { title: "<div title='Notas de seguimiento' class='badge idColor7'></div>NS" },
            { title: "<div title='Fichas de seguimiento' class='badge idColor8'></div>FS" }
        ],
        "columnDefs": [
            { width: "35%", targets: 0 }
        ]
    });
}

function drawChart(dataTable, idDiv) {

    if (dataTable === undefined || dataTable === null || dataTable === [] || dataTable.length <= 0) {
        dataTable = [['', ''], ['NO HAY DATOS', 0]];
    } else {
        if (dataTable[0][0] !== 'Registros') {
            var encabezado = ['Registros', 'Registro de noticias', 'Registro de información', 'Informes de comisión', 'Fichas de monitoreo', 'Alerta temprana', 'Nota de seguimiento', 'Ficha de seguimiento'];
            dataTable.unshift(encabezado);
        }
    }

    var data = google.visualization.arrayToDataTable(dataTable);
    var options = {
        isStacked: 'percent',
        height: 15,
        enableInteractivity: 0,
        series: [
            { color: '#8C54FF' },
            { color: '#51A74C' },
            { color: '#A74C72' },
            { color: '#F87D4E' },
            { color: '#4EF8CE' },
            { color: '#4E8AF8' },
            { color: '#F3DA51' },
            { color: '#E91243' }
        ],
        bar: { groupWidth: "80%", width: "100%" }
    };

    var chart1 = new google.visualization.BarChart(document.getElementById(idDiv));
    chart1.draw(data, options);
}

//------------------------------------------------------------------------------------------
//   Función utilizada para todas las tablas. Para refrescar los datos de la rejilla
//   y que se comporte de manera dinámica, es necesario colocar el atributo "destroy:true"
//------------------------------------------------------------------------------------------
$.extend($.fn.dataTable.defaults, {
    className: 'dataTable',
    paging: false,
    ordering: false,
    info: false,
    searching: false,
    destroy: true
});

function cargarDatos(objeto) {
    $("#carrouselContent .cuadroCarrousel").removeClass("activo");
    $(objeto).toggleClass("activo");
    var dom = jQuery('div[ng-controller="dashboardController"]')[0];
    var $scope = angular.element(dom).scope();
    $scope.ejecutarConsulta(objeto.innerText.split(' ')[1]);
};

bulmaAccordion.attach();