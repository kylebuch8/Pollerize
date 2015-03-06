(function () {
    'use strict';

    /*global angular*/
    angular.module('user', [
        'ngRoute',
        'ngAnimate'
    ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/:id', {
                    templateUrl: 'components/user/user.html',
                    controller: 'UserController'
                });
        }])

        .controller('UserController', [
            '$scope',
            '$routeParams',
            '$firebaseObject',
            'FIREBASE_URL',
            function ($scope, $routeParams, $firebaseObject, FIREBASE_URL) {
                var ref = new Firebase(FIREBASE_URL + '/sessions/' + $routeParams.id),
                    syncObject = $firebaseObject(ref),
                    answerIndex;

                syncObject.$bindTo($scope, "data");

                $scope.update = function (index) {
                    if (typeof answerIndex !== 'undefined' && answerIndex !== index) {
                        $scope.data.questions[$scope.data.current].answers[answerIndex].responses -= 1;
                        $scope.data.questions[$scope.data.current].answers[index].responses += 1;

                        answerIndex = index;
                        return;
                    }

                    $scope.data.questions[$scope.data.current].answers[index].responses += 1;
                    answerIndex = index;
                };
            }
        ]);
}());
