angular.module('AmericanLyceum')
.controller('HomeCtrl',function(auth,$scope,$rootScope,$http, $window){
    $rootScope.user = auth.getUser();
    pageEnd();
});