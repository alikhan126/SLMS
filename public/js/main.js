/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */


/**
 * Configure the Routes
 */
var app = angular.module('AmericanLyceum',
 ['ngRoute',"angular-table",'angularValidator',
  'ui.bootstrap.modal','angular-click-outside']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider

    .when("/",{templateUrl : "partials/pages/login.html", controller : "LoginCtrl"})
      .when("/logout", {
            resolve: {
                logout: ['logoutService', function (logoutService) {
                    logoutService();
                }]
            },
      })
    .when("/forgot-password",{templateUrl : "partials/pages/forgot-password.html", controller : "ForgotPasswordCtrl"})


    .when("/home",{templateUrl : "partials/pages/home.html",controller : "HomeCtrl"})
    .when("/school-branches",{templateUrl : "partials/pages/school-branches.html",controller : "SchoolBranchesCtrl"})
      .when("/school-branches/create",{templateUrl : "partials/pages/school-branches-create.html"})
    .when("/users", {templateUrl: "partials/pages/users.html", controller: "UsersCtrl"})
      .when("/users/create", {templateUrl: "partials/pages/user-new.html", controller: "UsersCreateCtrl"})
      .when("/users/create/:id", {templateUrl: "partials/pages/user-new.html", controller: "UsersCreateCtrl"})      
    .when("/profiles", {templateUrl: "partials/pages/profiles.html", controller: "ProfilesCtrl"})
      .when("/profiles/permissions/:profile", {templateUrl: "partials/pages/permissions.html", controller: "PermissionsCtrl"})


     .otherwise({
        redirectTo: '/pages/404'
      });



  }]).

  controller('HomeCtrl',['$scope','$http','$window',function($scope,$http, $window){

    pageEnd();
  }]).

  controller('SchoolBranchesCtrl',['$scope','$http','$window',function($scope,$http, $window){
    $scope.list = [];
    $scope.branch  = {};
    $scope.rowIndex  = null;

    $scope.open = function(){
      $scope.showModal = true;
      $scope.rowIndex  = null;
      $scope.branch = {};
    }

    $scope.edit = function(){
      if($scope.rowIndex!= null){
        console.log('edit');
        $scope.branch = $scope.list[$scope.rowIndex];
        $scope.showModal = true;
      }
    }

    $scope.remove = function(){
      if($scope.rowIndex!= null){
        var id  = $scope.list[$scope.rowIndex]._id;
        $http({method : "DELETE" , url : '/branches/'+id}).success(function(data){
          $scope.list = $scope.list.filter(branch => branch._id != id);
          $scope.rowIndex = null;
        }).error(function(){
        });
      }
    }

    $scope.submit = function(){
       if($scope.rowIndex==null){
         //save
         $http({method : "POST" , url : '/branches' , data : $scope.branch}).success(function(data){
           $scope.list.push(data);
           $scope.showModal = false;
         }).error(function(){
         });
       }else{
         //update
         $http({method : "PUT" , url : '/branches/'+$scope.list[$scope.rowIndex]._id , data : $scope.branch}).success(function(data){
           $scope.list[$scope.rowIndex]= $scope.branch;
           $scope.showModal = false;
         }).error(function(){
         });
       }

    }

    $scope.reload = function(){
      $http({method : "GET" , url : '/branches' , data : $scope.branch}).success(function(data){
        $scope.list = data;
      }).error(function(){
      });
    }

    $scope.reload();

    $scope.rowSelect = function($index){
      $scope.rowIndex = $index;
    }

    pageEnd();
  }]).


  //Login Controller
  controller('LoginCtrl',['$scope','$http','$window',function($scope,$http, $window){
      $scope.user = {};
      $scope.login = function(){
        $http({method : 'POST', url : "/login", data  : $scope.user})
        .success(function(data){
           $window.location="#/home"
        }).error(function(error){
           $scope.error = true;
        });
      }
  }]).
  controller('ForgotPasswordCtrl',['$scope',function($scope){

  }]).
  controller('ProfilesCtrl',['$scope',"$filter","$http",function($scope,$filter,$http){

    $scope.list= [];
    $scope.profile = {};
    $scope.rowIndex  = false;



    $scope.rowSelect = function($index){
      $scope.rowIndex = $index;
    }
    $scope.clickOutside = function(){
      console.log("clickOutside");
      $scope.rowIndex = null;
    }

    $scope.submit  = function(){
       if($scope.rowIndex!=null){
         //edit
         var id  = $scope.list[$scope.rowIndex]._id;
         $http({method : "PUT" , url : '/profiles/'+id, data : $scope.profile }).success(function(data){
           $scope.list[$scope.rowIndex] = data;
           $scope.rowIndex = null;
         }).error(function(){
         });
       }else{
         //save
         $http({method : "POST" , url : '/profiles' , data : $scope.profile}).success(function(data){
           $scope.list.push(data);
           $scope.showModal = false;
         }).error(function(){
         });
       }
       $scope.showModal = false;
    }

    $scope.open = function(){
      $scope.profile = {};
      $scope.showModal = true;
      $scope.rowIndex= null;
    }


    $scope.edit  = function(){
       if($scope.rowIndex!=null){
         $scope.profile = $scope.list[$scope.rowIndex];
         $scope.showModal = true;
       }
    }

    $scope.remove  = function(){
      if($scope.rowIndex!=null){
        var id  = $scope.list[$scope.rowIndex]._id;
        $http({method : "DELETE" , url : '/profiles/'+id}).success(function(data){
          $scope.list = $scope.list.filter(profile => profile._id != id);
          $scope.rowIndex = null;
        }).error(function(){
        });
      }
    }

    $scope.reload = function(){
      $http({method : "GET" , url : '/profiles' , data : $scope.branch}).success(function(data){
        $scope.list = data;
      }).error(function(){
      });
    }

    $scope.reload();



    pageEnd();

  }]).
  factory('logoutService', function ($location,$http) {
      return function () {
        $http({method : "GET", url : "/logout"}).success(function(){
           $location.path('/');
        });
      }
  })
  .directive("fileread", [function () {
      return {
          scope: {
              fileread: "="
          },
          link: function (scope, element, attributes) {
              element.bind("change", function (changeEvent) {
                  return _.map(changeEvent.target.files, function(file){
                    scope.fileread = [];
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread.push(loadEvent.target.result);
                        });
                    }
                    reader.readAsDataURL(file);
                  });
              });
          }
      }
  }])
  .run(['$http','$rootScope','$location', function($http,$rootScope,$location) {
    console.log("Configuring...");
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        console.log($location.path());
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/']) === -1;
        console.log("is restricted page ? "+restrictedPage);
        if(restrictedPage)
          $http({ url : "/checkLogin"}).success(function(data){
            if(!data.login){
              $location.path('/');
            }
          });
    });
  }]);




var pageEnd = function(){
  setTimeout(function(){
        $("#progressBar").css({
          "opacity":0,
          "width":"100%"
        });
    },500);
}
var getDate = function(){
  return new Date().toLocaleString().replace(/\//g,"-");
}
