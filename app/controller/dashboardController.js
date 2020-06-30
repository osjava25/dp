'use strict';
app.controller('dashboardController', ['$scope', 'sisatService', '$location', 'utilsService', function ($scope, sisatService, $location, utilsService) {

    $scope.lang = 'es';
    var idsMacro, idsRegion, fechaIni, fechaFin;
    var dataTabInicial = [], dataActores = [], dataPertenenciaEtnica = [];
    $scope.progressActor = true;
    $scope.progressPertenencia = true;
    $scope.progressClasificador = true;
    var datosSlider = [
        {
            "Nombre": "Infracciones al DIH",
            "Cantidad": 21697
        },
        {
            "Nombre": "Factores de Amenaza",
            "Cantidad": 13029
        },
        {
            "Nombre": "Expresiones de Violencia",
            "Cantidad": 17535
        },
        {
            "Nombre": "Sexo",
            "Cantidad": 1091
        },
        {
            "Nombre": "Transcurrir de Vida",
            "Cantidad": 2216
        },
        {
            "Nombre": "Discapacidad",
            "Cantidad": 0
        }
    ];

    //getMacroregion();
	totalXClasificadores();

    function getMacroregion() {
        var url = 'api/general/ListaMacroregion';
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            $scope.macrosList = utilsService.getCheckCascade(datos, "IdDetalleParametro", "Nombre");
            bulmaAccordion.attach();
            obtenerDatosTotal();
            totalXClasificadores();
        });
    }

    $scope.obtenerRegiones = function (macro) {
        var url = 'api/general/ListaRegion?idMacroregion=' + macro.macro.id;
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            $scope.regionList = utilsService.getCheckCascade(datos, "IdDetalleParametro", "Nombre");
            bulmaAccordion.attach();
        });
    }

    $scope.filtrar = function () {
        idsMacro = obtenerMacrosSeleccionadas();
        idsRegion = obtenerRegionesSeleccionadas();
        obtenerFechas();
        totalesXInstrumento();
        totalActores();
        totalPertenenciaEtnica();
        totalXClasificadores();
        totalInfraccionesDIH();
    }

    $scope.ejecutarConsulta = function (clasificador) {
        switch (clasificador) {
            case "Infracciones": totalInfraccionesDIH();
                break;
            case "Factores": totalFactorAmenaza();
                break;
            case "Expresiones": totalExpresionViolencia();
                break;
            case "Sexo": totalSexo();
                break;
            case "Transcurrir": totalTranscurrirVida();
                break;
            case "Discapacidad": totalDiscapacidad();
                break;
        }
    }

    function obtenerDatosTotal() {
        idsMacro = obtenerMacrosSeleccionadas();
        idsRegion = obtenerRegionesSeleccionadas();
        obtenerFechas();
        totalesXInstrumento();
    }

    ///----------------------------------
    /// Permite inicializar el dashboard
    ///----------------------------------
    $scope.limpiar = function () {

        for (var i = 0; i < $scope.macrosList.length; i++) {
            $scope.macrosList[i].select = false;
        }

        if ($scope.regionList !== undefined)
            for (var j = 0; j < $scope.regionList.length; j++) {
                $scope.regionList[j].select = false;
            }

        $('.datetimepicker-clear-button').attr('type', 'button').click();

        totalesXInstrumento();
    }

    ///-----------------------------------------
    /// Obtiene los totales de los instrumentos
    ///-----------------------------------------
    function totalesXInstrumento() {
        dataTabInicial.length = 0;
        var url = 'api/dashboard/TotalRegistros?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin;
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            $scope.data = datos;
            for (var i = 0; i < $scope.data.length; i++) {
                dataTabInicial.push([$scope.data[i]['Nombre'], $scope.data[i]['Cantidad']])
            }
            cargarTotales(dataTabInicial);
        });
    }

    ///--------------------------------------------
    /// Obtiene los totales de los actores armados
    ///--------------------------------------------
    function totalActores() {
        $scope.progressActor = false;
        dataActores.length = 0;
        var url = 'api/dashboard/TotalActores?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin;
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            $scope.actor = datos;
            dataActores.push(['Actores armados', 'registros']);
            for (var i = 0; i < $scope.actor.length; i++) {
                dataActores.push([$scope.actor[i]['Nombre'], $scope.actor[i]['Cantidad']])
            }
            cargarActores(dataActores);
            $scope.progressActor = true;
        });
    }

    ///--------------------------------------------
    /// Obtiene los totales de Pertenencia Etnica
    ///--------------------------------------------
    function totalPertenenciaEtnica() {
        $scope.progressPertenencia = false;
        dataPertenenciaEtnica.length = 0;
        var url = 'api/dashboard/TotalPertenenciaEtnica?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin + '&conexion=1';
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {

            $scope.pertenencia = datos;
            $scope.anio = datos.includes
            dataPertenenciaEtnica.push(['Mes', 'Afrodescendiente', 'Indígena', 'Población civil', 'Raizal', 'Rrom', 'Palenqueros', 'promedio']);

            for (var i = 0; i < $scope.pertenencia.length; i++) {
                dataPertenenciaEtnica.push([$scope.pertenencia[i]['Mes']
                    , $scope.pertenencia[i]['Afrodescendiente']
                    , $scope.pertenencia[i]['Indigenas']
                    , $scope.pertenencia[i]['Civil']
                    , $scope.pertenencia[i]['Raizal']
                    , $scope.pertenencia[i]['Rrom']
                    , $scope.pertenencia[i]['Negro']
                    , $scope.pertenencia[i]['Promedio']
                ])
            }

            cargarPertenenciaEtnica(dataPertenenciaEtnica);
            $scope.progressPertenencia = true;
        });
    }

    ///--------------------------------------------
    /// Obtiene los totales de los actores armados
    ///--------------------------------------------
    function totalXClasificadores() {
        $scope.totalesList = datosSlider;

        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          var anchoContent2 = $("section.section").width() - 80;
          anchoContent2 = anchoContent2 / 4;
          $('.bxslider').bxSlider({
              mode: 'horizontal',
              minSlides: 1,
              maxSlides: 4,
              slideWidth: anchoContent2,
              slideMargin: 20,
              controls: false,
              touchEnabled: false,
              pager: true
          });
          $("#carrouselContent .bxslider .cuadroCarrousel:eq(4)").addClass("activo");

        });


          /* $('.bxslider').bxSlider({
              mode: 'horizontal',
              minSlides: 1,
              maxSlides: 4,
              slideWidth: anchoContent2,
              slideMargin: 20,
              controls: false,
              pager: true
          });
          */
        //cargarClasificadores();

        //var url = 'api/dashboard/TotalCantidadXClasificador?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin;
        //var servCall = sisatService.getSubscriber(url);
        //servCall.then(function (datos) {
        //    $scope.totalesList = datos;
        //    cargarClasificadores();
        //});

    }



    ///--------------------------------------------
    /// Ejecución de los diferentes clasificadores
    ///--------------------------------------------
    function totalExpresionViolencia() {
        $scope.progressClasificador = false;
        var url = 'api/dashboard/TotalExpresionViolencia?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin;
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            cargarTablaDatos(datos);
            $scope.progressClasificador = true;
        });
    }
    function totalFactorAmenaza() {
        $scope.progressClasificador = false;
        var url = 'api/dashboard/TotalFactorAmenaza?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin;
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            cargarTablaDatos(datos);
            $scope.progressClasificador = true;
        });
    }
    function totalInfraccionesDIH() {
        $scope.progressClasificador = false;
        var url = 'api/dashboard/TotalInfraccionesDIH?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin;
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            cargarTablaDatos(datos);
            $scope.progressClasificador = true;
            //$("#carrouselContent .cuadroCarrousel:eq(4)").addClass("activo");
        });
    }
    function totalSexo() {
        $scope.progressClasificador = false;
        var url = 'api/dashboard/TotalSexo?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin;
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            cargarTablaDatos(datos);
            $scope.progressClasificador = true;
        });
    }
    function totalTranscurrirVida() {
        $scope.progressClasificador = false;
        var url = 'api/dashboard/TotalTranscurrirVida?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin;
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            cargarTablaDatos(datos);
            $scope.progressClasificador = true;
        });
    }
    function totalDiscapacidad() {
        $scope.progressClasificador = false;
        var url = 'api/dashboard/TotalDiscapacidad?macroIds=' + idsMacro + '&regionIds=' + idsRegion + '&fechaInicial=' + fechaIni + '&fechaFinal=' + fechaFin;
        var servCall = sisatService.getSubscriber(url);
        servCall.then(function (datos) {
            cargarTablaDatos(datos);
            $scope.progressClasificador = true;
        });
    }

    ///-----------------------------
    /// Obtiene los ids de la macro
    ///-----------------------------
    function obtenerMacrosSeleccionadas() {
        var retorno = '';
        for (var i = 0; i < $scope.macrosList.length; i++) {
            if ($scope.macrosList[i].select === true)
                retorno += $scope.macrosList[i].id + ',';
        }
        return retorno.slice(0, -1);
    }

    ///------------------------------
    /// Obtiene los ids de la región
    ///------------------------------
    function obtenerRegionesSeleccionadas() {
        var retorno = '';
        if ($scope.regionList !== undefined)
            for (var i = 0; i < $scope.regionList.length; i++) {
                if ($scope.regionList[i].select === true)
                    retorno += $scope.regionList[i].id + ',';
            }
        return retorno.slice(0, -1);
    }

    ///--------------------------------
    /// Obtiene las fechas del control
    ///--------------------------------
    function obtenerFechas() {
        fechaIni = '';
        fechaFin = '';
        var fechas = $('#datepickerDemoRange')[0].value;
        if (null !== fechas && fechas !== '') {
            fechaIni = fechas.split('-')[0].trim();
            fechaFin = fechas.split('-')[1].trim();
        }
    }
}]);
