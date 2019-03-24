angular.module('AmericanLyceum')
.controller('SchoolBranchesCtrl',function(auth,$scope,$rootScope,$http, $window,toaster,$injector,$filter){
   
    $rootScope.user = auth.getUser();

    $scope.list = [];
    $scope.branch  = {};
    $scope.rowIndex  = null;
    $scope.query = "";
    $scope.filteredList = [];
    
   


    $scope.config = {
      itemsPerPage: 6,
    }

    var $validationProvider = $injector.get('$validation');

    $scope.open = function(){
      $scope.showModal = true;
      $scope.rowIndex  = null;
      $scope.branch = {};
    }

    $scope.search = function(){
      $scope.filteredList = $filter("filter")($scope.list, $scope.query);
    }

    $scope.edit = function(_id,form){
      $scope.rowIndex = _id;
      $scope.branch = $.extend({}, $scope.list.filter(branch => branch._id == _id)[0]) ;
      $scope.$watch("branch", function() {
        console.log("**** $watch profile ****");
        if(!$.isEmptyObject($scope.profile))
          $validationProvider.validate(form);
       });
      $scope.showModal = true;
    }

    $scope.remove = function(_id){
      $http({method : "DELETE" , url : '/branches/'+ _id}).success(function(data){
        $scope.list = $scope.list.filter(branch => branch._id != _id);
        $scope.rowIndex = null;
      }).error(function(){
      });
    }

    $scope.submit = function(){

       if($scope.rowIndex==null){
         //save
         $http({method : "POST" , url : '/branches' , data : $scope.branch}).success(function(data){
           $scope.list.push(data);
           $scope.showModal = false;
           toaster.pop("success","Success", "School branch is added.");
           $scope.search();
         }).error(function(){
           toaster.pop("error","Error", "School branch not added")
         });
       }else{
         //update
         $http({method : "PUT" , url : '/branches/'+$scope.rowIndex, data : $scope.branch}).success(function(data){
           $scope.list.forEach(function(item, i) { if (item._id  == data._id ) $scope.list[i] = $scope.branch; });
           $scope.filteredList = $scope.list;
           $scope.showModal = false;
           toaster.pop("success","Success", "School branch information updated.")
         }).error(function(){
           toaster.pop("error","Error", "School branch update faild")
         });
       }

    }

    $scope.reload = function(){
      $http({method : "GET" , url : '/branches' , data : $scope.branch}).success(function(data){
        $scope.list = data;
        $scope.filteredList = $scope.list;
        toaster.pop("info","Branches", "Branches information is loaded.")
      }).error(function(){
         toaster.pop("error","Error", "Error while loading branches data.");
      });
    }

    $scope.reload();

    pageEnd();
  })