'use strict';





// Declare app level module which depends on filters, and services
var app = angular.module( 'myApp', ['myApp.filters', 'myApp.directives'] ).config(function ($httpProvider) {
    //$httpProvider.defaults.headers.common = {};
    //$httpProvider.defaults.headers.put = {};
    //$httpProvider.defaults.headers.patch = {};
    //$httpProvider.defaults.headers.get = {};
    //$httpProvider.defaults.headers.post = {};



});

app.userConfigs = {};
app.userConfigs.apiPath = "http://localhost/CardTest/api/";