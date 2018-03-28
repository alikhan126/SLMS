
/**
 * Configure the Routes
 */
var app = angular.module('AmericanLyceum',
 ['ngRoute',"angular-table",'validation', 'validation.rule',
  'ui.bootstrap.modal','angular-click-outside','toaster']).
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

  //Login Controller
  controller('LoginCtrl',['$scope','$http','$window','auth',function($scope,$http, $window,auth){
      $scope.user = {};
      $scope.login = function(){
        $http({method : 'POST', url : "/login", data  : $scope.user})
        .success(function(data){
           auth.setUser(data);
           $window.location="#/home"
        }).error(function(error){
           $scope.error = true;
        });
      }
  }]).
  controller('ForgotPasswordCtrl',['$scope',function($scope){

  }]).
  
  factory('logoutService', function ($location,$http) {
      return function () {
        $http({method : "GET", url : "/logout"}).success(function(){
           $location.path('/');
        });
      }
  })
  .directive("ngFileSelect", function(fileReader, $timeout) {
    return {
      scope: {
        ngModel: '='
      },
      link: function($scope, el) {
        function getFile(file) {
          fileReader.readAsDataUrl(file, $scope)
            .then(function(result) {
              $timeout(function() {
                $scope.ngModel = result;
              });
            });
        }

        el.bind("change", function(e) {
          var file = (e.srcElement || e.target).files[0];
          getFile(file);
        });
      }
    };
  })

  .factory("fileReader", function($q, $log) {
      var onLoad = function(reader, deferred, scope) {
        return function() {
          scope.$apply(function() {
            deferred.resolve(reader.result);
          });
        };
      };

      var onError = function(reader, deferred, scope) {
        return function() {
          scope.$apply(function() {
            deferred.reject(reader.result);
          });
        };
      };

      var onProgress = function(reader, scope) {
        return function(event) {
          scope.$broadcast("fileProgress", {
            total: event.total,
            loaded: event.loaded
          });
        };
      };

      var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
      };

      var readAsDataURL = function(file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
      };

      return {
        readAsDataUrl: readAsDataURL
      };
    })
  .factory("auth", function($window, $rootScope) {
      return {
        setUser: function(val) {
          $window.localStorage && $window.localStorage.setItem('user', JSON.stringify(val));
          return this;
        },
        getUser: function() {
          return $window.localStorage && JSON.parse($window.localStorage.getItem('user'));
        }
      };
    })
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
