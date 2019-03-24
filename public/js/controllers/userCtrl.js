angular.module('AmericanLyceum')
.controller('UsersCtrl',function(auth,$scope, $routeParams,$rootScope,$http,fileReader,$filter){

  $rootScope.user = auth.getUser();

  $scope.list= [];
  $scope.filterList = [];

  $scope.config = {
    itemsPerPage: 6,
  }

 

  $http({method : "GET", url:"/users"})
  .success(function(data){
    $scope.list = data;
    $scope.filterList = $scope.list;
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

  $scope.search = function(){
    $scope.filterList = $filter("filter")($scope.list, $scope.query);
  }



  setTimeout(function(){
      $("#progressBar").css({
        "opacity":0,
        "width":"100%"
      });
  },500);
})
/* User create controller */
.controller('UsersCreateCtrl', function($scope, $routeParams,$http,$location,$injector, toaster){
  $scope.user = {};
  $scope.branches = {};
  $scope.profiles = {};

  var $validationProvider = $injector.get('$validation');

  //$scope.form.checkValid = $validationProvider.checkValid;


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
      data.dateOfBirth = new Date(data.dateOfBirth);
      $scope.user = data;
    }).error(function(data){
    });
  }

  $scope.submit = function(){
    if($routeParams.id == null ){
      console.log("save mode");
      $http({method : "POST", url:"/users",data : $scope.user})
      .success(function(data){
        $location.path('/users/create/'+data._id);
        toaster.pop('success', "Success", "User created successfully.");
      }).error(function(data){
        toaster.pop('error', "Error", "Failed to created user.");
      })
    }else{
      console.log("edit mode");
      $http({method : "PUT", url:"/users/"+$routeParams.id,data : $scope.user})
      .success(function(data){
        $location.path('/users/create/'+data._id);
         toaster.pop('success', "Success", "User information updated.");
      }).error(function(data){
         toaster.pop('error', "Error", "Update failed");
      })
    }
  }

  
  setTimeout(function(){
      $("#progressBar").css({
        "opacity":0,
        "width":"100%"
      });
  },500);
});
