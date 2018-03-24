angular.module('AmericanLyceum')
.controller('UsersCtrl',['$scope','$routeParams','$http',function($scope, $routeParams,$http){

  $scope.list= [];

  $scope.config = {
    itemsPerPage: 6,
  }

  $http({method : "GET", url:"/users"})
  .success(function(data){
    $scope.list = data;
    $scope.list.forEach(function(item){
       item.name= item.firstName + " " + item.lastName;
       $http({method : "GET", url:"/profiles/"+item.profile})
       .success(function(profile){
         item.profileName = profile.name;
       }).error(function(data){
       });
       $http({method : "GET", url:"/branches/"+item.branch})
       .success(function(branch){
         item.branchName = branch.name;
       }).error(function(data){
       });
    });
  }).error(function(data){
  });



  setTimeout(function(){
      $("#progressBar").css({
        "opacity":0,
        "width":"100%"
      });
  },500);
}])
/* User create controller */
.controller('UsersCreateCtrl',['$scope','$routeParams','$http','$location',
  function($scope, $routeParams,$http,$location){
  $scope.user = {};
  $scope.branches = {};
  $scope.profiles = {};

  $http({method : "GET", url:"/branches"})
  .success(function(data){
    $scope.branches = data;
  }).error(function(data){
  });

  $http({method : "GET", url:"/profiles"})
  .success(function(data){
    $scope.profiles = data;
  }).error(function(data){
  });

  if($routeParams.id != null ){
    console.log("fetching user..",$routeParams.id);
    $http({method : "GET", url:"/users/"+$routeParams.id})
    .success(function(data){
      $scope.user = data;
    }).error(function(data){
    });
  }

  $scope.submit = function(){
    if($routeParams.id == null ){
      console.log("save mode");
      $http({method : "POST", url:"/users",data : $scope.user})
      .success(function(data){
        $location.path('/users/create/'+data._id)
      }).error(function(data){
      })
    }else{
      console.log("edit mode");
      $http({method : "PUT", url:"/users/"+$routeParams.id,data : $scope.user})
      .success(function(data){
        $location.path('/users/create/'+data._id)
      }).error(function(data){
      })
    }
  }

  setTimeout(function(){
      $("#progressBar").css({
        "opacity":0,
        "width":"100%"
      });
  },500);
}]);
