define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('MainCtrl', function ($scope, navigation, sharoodDB) {

        function tryAutoLogin(){
            sharoodDB.loadCurrentUser().then(function(user){
                console.info(user);
                sharoodDB.currentUser = user;
                navigation.navigate('/home');
            });
        }

        tryAutoLogin();

        $scope.user = {
            email: null,
            password: null
        };

        $scope.login = function(){
            if (!$scope.loginForm.$valid) {
                return;
            }

            sharoodDB.login($scope.user).then(function(user){
                console.info(user);
                sharoodDB.currentUser = user;
                navigation.navigate('/home');
            }).catch(function (error) {
                AlertHelper.alert('#login-account-alert');
            });
        };

        $scope.navigate = navigation.navigate;

        $scope.loginConfig = {
            id: 'login-account-alert',
            icon: false,
            title: 'Bad credentials',
            subtitle: 'The user or the password doesn\'t exists',
            ok: {
                id: 'btn-ok',
                text: 'Ok',
                cssClass: 'btn-info',
                callback: function() {}
            }
        };
    });

});