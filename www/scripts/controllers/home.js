'use strict';

angular.module('sharoodApp')
  .controller('Home', function ($scope, sharoodDB) {
  	console.info("Home controller");

  	$scope.username = sharoodDB.currentUser.username;

  });