'use strict';

app.service('sisatService', ['$http', 'ngSisatSettings', function ($http, ngSisatSettings) {

    var serviceBase = ngSisatSettings.apiServiceBaseUri;

    this.getSubs = function (url) {
        url = serviceBase + url;
        return $http.get(url).then(function (response) {
            return response.data;
        });
    };

    this.getSubscriber = function (url) {
        url = serviceBase + url;
        return $http({
            async: true,
            method: 'get',
            url: url
        }).then(function (response) {
            return response.data;
        });
    };

    this.saveSubscriber = function (sub, url) {
        url = serviceBase + url;
        return $http({
            method: 'post',
            data: sub,
            url: url
        });
    };

    this.deleteSubscriber = function (subID, url) {
        url = serviceBase + url;
        return $http({
            method: 'delete',
            data: subID,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.open = function (url) {
        url = serviceBase + url;
        window.open(url);
    };
}]);