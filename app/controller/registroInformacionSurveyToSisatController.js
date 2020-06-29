'use strict';

app.controller('registroInformacionSurveyToSisatController', ['$scope', 'sisatService', '$location', 'utilsService', function ($scope, sisatService, $location, utilsService) {
    $scope.retornarPrueba = function () {
        var url = 'api/RegistroInformacion/Test';
        var servCall = sisatService.getSubscriber(url);
        var registrosInformacion = new Array();
        var objRegistrosInformacion = "";
        var tempFecha_reporte = "";
        var tempFecha_hecho = "";
        servCall.then(function (datos) {
            var objJson = JSON.parse(datos);
            for (var x = 0; x < objJson.features.length; x++) {

                tempFecha_reporte = new Date(objJson.features[x].attributes.fecha_reporte);
                tempFecha_reporte = tempFecha_reporte.getMonth() + '/' + tempFecha_reporte.getDate() + '/' + tempFecha_reporte.getFullYear() 
                tempFecha_hecho = new Date(objJson.features[x].attributes.fecha_hecho );
                tempFecha_hecho = tempFecha_hecho.getMonth() + '/' + tempFecha_hecho.getDate() + '/' + tempFecha_hecho.getFullYear() 

                objRegistrosInformacion =
                {
                    "Seleccionar": "<input type='checkbox' name='seleccionar' value='Migrar'>Migrar",
                    "objectid": objJson.features[x].attributes.objectid,
                    "usuario": objJson.features[x].attributes.usuario,
                    //"fecha_reporte": objJson.features[x].attributes.fecha_reporte,
                    "fecha_reporte": tempFecha_reporte,
                    //"fecha_hecho": objJson.features[x].attributes.fecha_hecho,
                    "fecha_hecho": tempFecha_hecho,
                    "dpto": objJson.features[x].attributes.dpto,
                    "mpio": objJson.features[x].attributes.mpio,
                    "zon": objJson.features[x].attributes.zon,
                    "vereda": objJson.features[x].attributes.vereda,
                    "zrc": objJson.features[x].attributes.zrc,
                    "resg": objJson.features[x].attributes.resg,
                    "fz_pb": objJson.features[x].attributes.fz_pb,
                    "no_est": objJson.features[x].attributes.no_est,
                    "crm_org": objJson.features[x].attributes.crm_org,
                    "sex": objJson.features[x].attributes.sex
                }
                registrosInformacion.push(objRegistrosInformacion);
            }
            $('#tblDatos').dataTable({
                "language": { "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json" },
                "order": [[1, "asc"], [2, "asc"]],
                "scrollX": true,
                data: registrosInformacion,
                columns: [
                    { "data": "Seleccionar", "title": "Seleccionar" },  
                    { "data": "objectid", "title": "ID" },  
                    { "data": "usuario", "title": "USUARIO"  },
                    { "data": "fecha_reporte", "title": "FECHA REPORTE" },
                    { "data": "fecha_hecho", "title": "FECHA HECHO" },
                    { "data": "dpto", "title": "DEPARTAMENTO"  },
                    { "data": "mpio", "title": "MUNICIPIO" },
                    { "data": "zon", "title": "ZONA" },
                    { "data": "vereda", "title": "VEREDA"  },
                    { "data": "zrc", "title": "ZRC"},
                    { "data": "resg", "title": "RESGUARDO" },
                    { "data": "fz_pb", "title": "FZ" },
                    { "data": "no_est", "title": "NO EST" },
                    { "data": "crm_org", "title": "CRM ORG"},
                    { "data": "sex", "title": "SEXO" },
                ],
            });
        });
    }
}]);

