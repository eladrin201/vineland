'use strict';

// Declare app level module which depends on cookies, resource, sanitize and route.
angular.module('micro', [
	'ngCookies',
  	'ngResource',
  	'ngSanitize',
  	'ngRoute'
]).config(function($routeProvider) { //basic routing, please extend
  $routeProvider.when('/', {
  	redirectTo: '/comics'
  }).when('/pages/:page',{
  	templateUrl: 'views/pages.html', controller: 'pages'
  }).when('/comics/:arc/:chapter/:page', {
    templateUrl: 'views/comics.html', controller: 'comics'
  }).when('/comics', {
    templateUrl: 'views/comics.html', controller: 'comics'
  }).when('/archive', {
		templateUrl: 'views/archive.html', controller: 'comics'
	}).otherwise({
  	redirectTo: '/'
  });

});
