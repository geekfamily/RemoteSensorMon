'use strict';

angular.module('remotesensormon', [
        'ngCookies',
        'remotesensormon.controllers',
        'remotesensormon.services',
        'remotesensormon.directives']).
    config(function($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'controllers/home.html', controller: 'ArduinoSensorCtrl'});
        $routeProvider.otherwise({redirectTo: '/home'});
    });