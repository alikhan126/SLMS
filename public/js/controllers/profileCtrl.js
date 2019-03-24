angular.module('AmericanLyceum')
.controller('ProfilesCtrl',function(auth,$rootScope,$scope,$filter,$http,toaster,$injector){

  $rootScope.user = auth.getUser();

  var $validationProvider = $injector.get('$validation');


  $scope.list= [];
  $scope.profile = {};
  $scope.rowIndex  = false;
  $scope.filterList = [];


  $scope.rowSelect = function($index){
    $scope.rowIndex = $index;
  }
  $scope.clickOutside = function(){
    console.log("clickOutside");
    $scope.rowIndex = null;
  }

  $scope.search = function(){
    $scope.filterList = $filter("filter")($scope.list, $scope.query);
  }



  $scope.submit  = function(){
     if($scope.rowIndex!=null){
       //edit
       var id  = $scope.list[$scope.rowIndex]._id;
       $http({method : "PUT" , url : '/profiles/'+id, data : $scope.profile }).success(function(data){
         $scope.list[$scope.rowIndex] = data;
         $scope.rowIndex = null;
         toaster.pop('success', "Success", "Profile information updated.");
       }).error(function(){
         toaster.pop('error', "Error", "Profile updation failed.");
       });
     }else{
       //save
       $http({method : "POST" , url : '/profiles' , data : $scope.profile}).success(function(data){
         $scope.list.push(data);
         $scope.showModal = false;
         toaster.pop('success', "Success", "Profile added successfully.");
       }).error(function(){
         toaster.pop('error', "Error", "Error in adding profile");
       });
     }
     $scope.showModal = false;
  }

  $scope.open = function(){
    $scope.profile = {};
    $scope.showModal = true;
    $scope.rowIndex= null;
  }



  $scope.edit  = function(form){
     if($scope.rowIndex!=null){
       $scope.profile = $scope.list[$scope.rowIndex];
       $scope.$watch("profile", function() {
        console.log("**** $watch profile ****");
        if(!$.isEmptyObject($scope.profile))
          $validationProvider.validate(form);
       });
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
      $scope.filterList = $scope.list;
      toaster.pop("info","","Profiles loaded");
    }).error(function(){
      toaster.pop("info","","Profiles loading error");
    });
  }

  $scope.reload();



  setTimeout(function(){
      $("#progressBar").css({
        "opacity":0,
        "width":"100%"
      });
  },500);

});
