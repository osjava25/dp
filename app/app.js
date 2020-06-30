'use strict';

var app = angular.module('sisatApp', ['ngRoute']);

app.config(function ($routeProvider) {

    var app_base = window.location.pathname;
    app_base = app_base.length > 1 ? app_base : '';

    $routeProvider.when("/registroInformacionSurveyToSisat", {
        controller: "registroInformacionSurveyToSisatController",
        templateUrl: app_base + "/app/views/registroInformacionSurveyToSisat.html"
    });

    $routeProvider.when("/dashboard", {
        controller: "dashboardController",
        templateUrl: app_base + "/app/views/dashboard.html"
    });

    $routeProvider.otherwise({ redirectTo: "/registroInformacionSurveyToSisat" });

});

//// Servicios IIS Express - desarrollo
var serviceBase = 'http://localhost:63673/';

//// Servicios IIS Local - desarrollo
//// var serviceBase = 'http://localhost/Defensoria.Sisat.ServiciosApi/';

app.constant('ngSisatSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngSisatApp'
});

var module = angular.module('sisatApp', [])
  .directive('onFinishRender', function ($timeout) {
    return {
     restrict: 'A',
     link: function (scope, element, attr) {
         if (scope.$last === true) {
             $timeout(function () {
             scope.$emit(attr.onFinishRender);
            });
         }
      }
    }
});
