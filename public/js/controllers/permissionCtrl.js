angular.module('AmericanLyceum')
.controller('PermissionsCtrl',function($rootScope,$scope, $routeParams,$http,toaster){

  $rootScope.user = auth.getUser();

  $scope.profile = "";
  $scope.actions = [];
  $scope.types   = [];

  $scope.permissions = {}

  $scope.whatResources = {};



  $http({method : "GET", url: "/actions"}).success(function(data){
     $scope.actions = data.actions;
     $scope.types  = data.types;
  }).error(function(){
  });

  $http({method : "GET", url: "/profiles/"+$routeParams.profile}).success(function(data){
     $scope.profile = data.name;
     $http({method : "GET", url: "/permissions/granted/"+data.name})
     .success(function(data){
        $scope.whatResources  = data;
        $scope.actions.forEach(function(action){
            $scope.types.forEach(function(type){
              if($scope.whatResources.hasOwnProperty(action) &&
                $scope.whatResources[action].includes(type)){
                  if(  $scope.permissions[action]==undefined)
                      $scope.permissions[action] = {}
                  $scope.permissions[action][type] = true;
                }
            });
        });
        console.log(data);
     }).error(function(){
     });
  }).error(function(){
  });

  $scope.check = false;
  $scope.checkAll = function(){
    $scope.check = ($scope.check?false:true);
    $scope.actions.forEach(function(action){
        $scope.types.forEach(function(type){
          if(  $scope.permissions[action]==undefined)
                $scope.permissions[action] = {}

            $scope.permissions[action][type] = $scope.check;
        });
    });
  }



  $scope.submit = function(){
    console.log($scope.permissions);
    $http({method:"POST",url:"/permissions/"+$routeParams.profile,data:$scope.permissions})
    .success(function(data){
      console.log(data);
      toaster.pop('success', "Success", data.message);
    }).error(function(data){
      console.log(data);
      toaster.pop('error', "Error", data.message);
    });
  }

  setTimeout(function(){
      $("#progressBar").css({
        "opacity":0,
        "width":"100%"
      });
  },500);
});
