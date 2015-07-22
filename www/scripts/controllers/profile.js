define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('Profile', function ($scope, sharoodDB, navigation, cameraHelper) {

        console.info("Profile controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }

        $scope.elements = {
            accountDetails: document.querySelector('.account-details'),
            accountEdition: document.querySelector('.account-edition'),
            editBtn: document.querySelector('.account-edit-btn'),
            accountEditionForm: document.querySelector('form#account-form'),
            deleteAccountBtn: document.querySelector('.delete-account')
        };

        $scope.cookies = sharoodDB.currentUser.cookies;
        $scope.name = sharoodDB.currentUser.first_name;
        $scope.phone = sharoodDB.currentUser.phone;
        $scope.email = sharoodDB.currentUser.email;

        /*$scope.cookies = 21;
        $scope.name = 'Axel';
        $scope.phone = '638006787';
        $scope.email = 'mancas.91@gmail.com';*/

        $scope.isEditModeEnable = false;
        $scope.toggleEditMode = function() {
            if ($scope.isEditModeEnable) {
                $scope.isEditModeEnable = false;
                $scope.elements.editBtn.textContent = 'Edit';
            } else {
                $scope.isEditModeEnable = true;
                $scope.elements.editBtn.textContent = 'Cancel';
            }
            $scope.elements.accountDetails.classList.toggle('hidden', $scope.isEditModeEnable);
            $scope.elements.accountEdition.classList.toggle('hidden', !$scope.isEditModeEnable);
        };

        $scope.saveProfile = function() {
            sharoodDB.currentUser.first_name = inputValue('first_name');
            sharoodDB.currentUser.phone = inputValue('phone');
            sharoodDB.currentUser.email = inputValue('email');

            cameraHelper.resizeImage($scope.imageMealURI).then(function(data) {
                sharoodDB.uploadFile(data).then(function(result) {
                    console.info(result.toJSON());
                    sharoodDB.currentUser.picture = result.toJSON().uid;
                    console.info(mealData.picture);
                    // If everything went well
                    sharoodDB.updateProfile().then(function(result){
                        console.info(result);
                    });
                }).catch($scope.onerror);
            }).catch($scope.onerror);
        };

        function inputValue(name) {
            return document.getElementsByName(name)[0].value;
        }

        $scope.navigate = navigation.navigate;

        $scope.deleteAccount = function() {
            AlertHelper.alert('#delete-account-alert');
        };

        $scope.deleteAccountConfig = {
            id: 'delete-account-alert',
            icon: true,
            title: 'Are you sure?',
            subtitle: 'You will not be able to undo this operation!',
            cancel: {
                id: 'delete-btn-cancel',
                text: 'Cancel',
                callback: function() {
                    console.info('Don\'t delete account');
                }
            },
            ok: {
                id: 'delete-btn-ok',
                text: 'Yes, delete it',
                cssClass: 'btn-danger',
                callback: function() {
                    console.info('Delete account');
                }
            }
        };

        $scope.logout = function(){
            AlertHelper.alert('#logout-alert');
        };

        $scope.logoutConfig = {
            id: 'logout-alert',
            icon: true,
            title: 'Are you sure?',
            subtitle: 'You are going to close your session!',
            cancel: {
                id: 'logout-btn-cancel',
                text: 'Cancel',
                callback: function() { }
            },
            ok: {
                id: 'logout-btn-ok',
                text: 'Yes, logout',
                cssClass: 'btn-danger',
                callback: function() {
                    sharoodDB.logout().then(function(result){
                        if(result){
                            console.info(result);
                        }
                        sharoodDB.currentUser = null;
                        console.info('User loged out');
                        navigation.navigate('/');
                    });
                }
            }
        };

        $scope.changePhoto = function(){
            console.info("Getting Picture");
            cameraHelper.getPicture().then(function(imgURI){
                document.getElementById('profilePhoto').style.backgroundImage = 'url(\'' + imgURI + '\')';
                $scope.imageMealURI = imgURI;
            });
        }
    });

});
