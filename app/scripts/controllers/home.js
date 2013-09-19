'use strict';

angular.module('remotesensormon.controllers')
    .controller('ArduinoSensorCtrl', function ($scope, socket){

        $scope.motionStatus = "No motion detected";
        $scope.on = false;
        $scope.ledStatus = false;

        $scope.start = function(){
            socket.emit('send:ledevent', {
                led: 'on'
            });
        }

        $scope.stop = function(){
            socket.emit('send:ledevent', {
                led: 'off'
            });
        }

        socket.on('send:ledon', function (data) {
            console.log("led on");
            $scope.colorBulb = {color: 'orange'};
            $scope.ledStatus = true;
        });

        socket.on('send:ledoff', function (data) {
            console.log("led off");
            $scope.colorBulb = {color: 'grey'};
            $scope.ledStatus = false;
        });

        socket.on('send:time', function (data) {
            $scope.time = data.time;
        });

        socket.on('send:webmotionstart', function(data){
            console.log("motion on");
            $scope.on = true;
            $scope.colorMotion = {color: 'green'};
            $scope.motionStatus = "Motion detected";
        });

        socket.on('send:webmotionend', function(data){
            console.log("motion off");
            $scope.on = false;
            $scope.colorMotion = {color: 'grey'};
            $scope.motionStatus = "No motion detected";
        });

        $scope.colorBulb = {color: 'grey'};
        $scope.colorMotion = {color: 'grey'};

        $scope.$on("$destroy", function(){
            console.log("destroy")
        });

    });
